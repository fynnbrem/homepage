"use client"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { Vector2 } from "math.gl"
import {
    Directional,
    getStaticConfiguration,
    useConfiguration,
    WorldConfigurationStatic,
} from "@/app/providers/ConfigurationProvider"
import { getRotatedVector } from "@/app/lib/math"

type VoidBall = {
    pos: Vector2
    mass: number
}
type Ball = VoidBall & {
    vel: Vector2
    radius: number
    elasticity: number
    color: string
    path: Vector2[]
}

const arenaDim = new Vector2(500, 700)

const tps = 60
const interval = Math.round(1000 / tps)

const globalBalls: Ball[] = [
    {
        pos: new Vector2(100, 100),
        vel: new Vector2(10, 0),
        mass: 100,
        radius: 25,
        elasticity: 1,
        color: "#e37e21",
        path: [],
    },
    {
        pos: new Vector2(225, 100),
        vel: new Vector2(5, 5),
        mass: 200,
        radius: 15,
        elasticity: 0.8,
        color: "#eda503",
        path: [],
    },
    {
        pos: new Vector2(150, 150),
        vel: new Vector2(0, -2),
        mass: 50,
        radius: 10,
        elasticity: 0,
        color: "#b34500",
        path: [],
    },
]

const mouseBall: VoidBall = {
    pos: new Vector2(0, 0),
    mass: 1500,
}

export default function Arena() {
    const mousePos = useRef(new Vector2(0, 0))

    const config = useConfiguration()
    const configRef = useRef(config)
    configRef.current = config

    /*We use a dummy state to update the component on every tick.
     * We do this because we have no reason to utilize React's optimizations as every object changes on every tick.*/
    const [, forceRerender] = useState(true)

    const arenaRef: RefObject<HTMLDivElement> = useRef(null!)

    const mouseBallActive = useRef(false)

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>): void {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
        // Handle activation of the mouse ball here so it also works independently form the pointer-enter-event.
        // (Handles the case where the cursor is already within the frame when it mounts).
        mouseBallActive.current = true
    }

    useEffect(() => {
        function getConfig() {
            return getStaticConfiguration(configRef.current)
        }

        function updateMouseBall(config: WorldConfigurationStatic) {
            mouseBall.pos.x = mousePos.current.x
            mouseBall.pos.y = mousePos.current.y
            mouseBall.mass = config.pointerGravity
        }

        function doTick(): void {
            const config = getConfig()
            updateBallPath(globalBalls, config.trailLength)
            updateMouseBall(config)
            moveBalls(
                globalBalls,
                config,
                mouseBallActive.current ? mouseBall : undefined,
            )
            forceRerender((v) => !v)
        }

        const intervalTimer = setInterval(doTick, interval)

        return () => clearInterval(intervalTimer)
    }, [])

    return (
        <div
            style={{
                width: arenaDim.x,
                height: arenaDim.y,
                background: "#2A2A2A",
                touchAction: "none",
                overflow: "hidden",
                position: "relative",
                cursor: "none",
            }}
            ref={arenaRef}
            onPointerMove={handlePointerMove}
            // The activation of the mouse ball is handled on every move event,
            // only leaving needs to be handled explicitly.
            onPointerLeave={() => (mouseBallActive.current = false)}
            onPointerCancel={() => (mouseBallActive.current = false)}
        >
            {/*Render the ball shadows.
            These are not part of the ball elements themselves for the following reasons:
                - Balls must not cast their shadow on other balls, but rather on the layer behind all balls.
                - The pointer light must be rendered between balls and shadows.*/}
            {globalBalls.map((b, i) => {
                const shadowOffset = getShadowOffset(
                    b.pos,
                    mousePos.current,
                    25,
                )
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: b.pos.x - b.radius + shadowOffset.x,
                            top: b.pos.y - b.radius + shadowOffset.y,
                            width: b.radius * 2,
                            height: b.radius * 2,
                            background: "rgba(0, 0, 0, 0.7)",
                            border: "none",
                            borderRadius: "50%",
                            filter: "blur(10px)",
                        }}
                    />
                )
            })}
            {/*Render the pointer light above the shadows.*/}
            {mouseBallActive.current && (
                <div
                    style={{
                        position: "absolute",
                        left: mousePos.current.x - 35,
                        top: mousePos.current.y - 35,
                        borderRadius: "50%",
                        width: 70,
                        height: 70,
                        background:
                            "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.25) 5%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0) 100%)",
                        boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                    }}
                />
            )}

            <svg
                width={"100%"}
                height={"100%"}
            >
                {globalBalls.map((b, i) => {
                    const path = b.path
                        .map((pos) => `${pos.x},${pos.y}`)
                        .join(" ")
                    return (
                        <polyline
                            key={i}
                            points={path}
                            fill={"none"}
                            stroke={b.color}
                            // Define the stroke width.
                            // We want one that scales sub-linearly with size,
                            // so big balls don't have a too large trail or small balls have a too small trail.
                            // The rounding is not strictly necessary but prevents hydration errors due to imprecision.
                            strokeWidth={Math.round(b.radius ** 0.7 * 1.2)}
                            strokeOpacity={0.3}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                        />
                    )
                })}
            </svg>

            {/*Render the balls above the light.*/}
            {globalBalls.map((b, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: b.pos.x - b.radius,
                            top: b.pos.y - b.radius,
                            width: b.radius * 2,
                            height: b.radius * 2,
                            background: b.color,
                            borderRadius: "50%",
                        }}
                    />
                )
            })}
        </div>
    )
}

/**Calculates a shadow offset that scales linearly with the distance of the object to the center.
 * @param pos
 *  The position of the object.
 * @param center
 *  The position of the center.
 * @param units
 *  How many units of distance should translate into 1 unit of offset.
 * */
function getShadowOffset(
    pos: Vector2,
    center: Vector2,
    units: number,
): Vector2 {
    const distance = pos.clone().subtract(center)
    return distance.scale(1 / units)
}

function updateBallPath(balls: Ball[], maxHistory: number = 30) {
    balls.forEach((b) => {
        b.path.unshift(b.pos.clone())
        b.path = b.path.slice(0, maxHistory)
    })
}

function moveBalls(
    balls: Ball[],
    config: WorldConfigurationStatic,
    mouseBall?: VoidBall,
): void {
    // Apply global gravity.
    balls.forEach((b) => applyGlobalGravity(b, config.worldGravity))
    // Apply gravity between the balls.
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) {
            // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
            applyBallGravity(balls[i], balls[j], config.gravityScaling)
        }
    }
    // Apply mouse ball gravity.
    if (mouseBall) {
        balls.forEach((b) => applyVoidBallGravity(b, mouseBall, config.gravityScaling))
    }
    if (config.collision) {
        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < i; j++) {
                const overlap = getBallOverlap(balls[i], balls[j])
                // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
                if (overlap > 0) {
                    collideBalls(balls[i], balls[j], overlap)
                }
            }
        }
    }
    // Apply the generated forces to the velocity and move the balls.
    balls.forEach((b) => moveInBox(b, [0, arenaDim.x, 0, arenaDim.y], config.wallElasticity))
}

/** Moves the ball within the `box` so that it does not go above its boundaries.
 *  The movement is generated from the ball's `.vel`.
 * @param ball
 *  The ball to move.
 * @param box
 *  The box in which the ball is constrained.
 *  Must be the following coordinates: `[leftX, rightX, topY, bottomY]`
 * @param elasticity
 *  The wall elasticity.
 *  */
function moveInBox(ball: Ball, box: [number, number, number, number], elasticity: number): void {
    const [left, right, top, bottom] = box

    const vel = ball.vel
    const pos = ball.pos
    const radius = ball.radius
    const restitution = combineRestitutionCoefficients(
        ball.elasticity,
        elasticity,
    )

    const targetPos = pos.clone().add(vel)

    if (targetPos.x - radius < left) {
        // Clamp left.
        ball.pos.x = left + radius
        ball.vel.x = -ball.vel.x * restitution
    } else if (targetPos.x + radius > right) {
        // Clamp right.
        ball.pos.x = right - radius
        ball.vel.x = -ball.vel.x * restitution
    } else {
        ball.pos.x = targetPos.x
    }
    if (targetPos.y - radius < top) {
        // Clamp top.
        ball.pos.y = top + radius
        ball.vel.y = -ball.vel.y * restitution
    } else if (targetPos.y + radius > bottom) {
        // Clamp bottom.
        ball.pos.y = bottom - radius
        ball.vel.y = -ball.vel.y * restitution
    } else {
        ball.pos.y = targetPos.y
    }
}

/** Modifies the velocity of both balls in accordance to the force generated between them.*/
function applyBallGravity(ball1: Ball, ball2: Ball, distanceExp: number): void {
    const force = getForce(ball1, ball2, distanceExp)
    const acc1 = force.clone().scale(1 / ball1.mass)
    ball1.vel.add(acc1)

    const acc2 = force.scale(1 / ball2.mass).negate()
    ball2.vel.add(acc2)
}

/** Modifies the velocity of the `ball` in accordance to the force generated between it and the `voidBall`.*/
function applyVoidBallGravity(ball: Ball, voidBall: VoidBall, distanceExp: number): void {
    const force = getForce(ball, voidBall, distanceExp)
    const acc1 = force.scale(1 / ball.mass)
    ball.vel.add(acc1)
}

/**Modifies the velocity of the ball in accordance with the global gravity.*/
function applyGlobalGravity(ball: Ball, gravity: Directional) {
    const force = getRotatedVector(gravity.angle, gravity.magnitude)

    ball.vel.add(force.scale(1 / ball.mass))
}

/** Return the gravitational force between the two balls, determined by their distance and mass.
 *  The vector points from `ball1` to `ball2`.*/
function getForce(ball1: VoidBall, ball2: VoidBall, distanceExp: number): Vector2 {
    let distance = ball1.pos.distance(ball2.pos)
    let forceScale: number

    if (distance !== 0) {
        distance = Math.max(10, distance)
        // Clamp the distance to a minimum of 5 to prevent excessive acceleration
        // (Happens when colliding with the mouse at it has no radius).
        forceScale = (ball1.mass * ball2.mass) / distance ** (1 + distanceExp)
        // `1 + exponent` because we also include the `1/distance` required to normalize the force vector in below.
    } else {
        forceScale = 0
    }
    return ball2.pos.clone().subtract(ball1.pos).scale(forceScale)
}

function collideBalls(ball1: Ball, ball2: Ball, overlap: number) {
    const collisionNorm = ball2.pos.clone().subtract(ball1.pos).normalize()
    const relativeVel = ball2.vel.clone().subtract(ball1.vel)
    const collisionVel = collisionNorm.clone().dot(relativeVel)

    // If the velocity is negative,
    // the balls are moving away from one another so we can skip the collision.
    if (collisionVel > 0) return

    // Calculate the total collision impulse.
    // Note that this is not strictly the physical impulse as we do not scale it with the mass-product of both balls.
    // This is so we don't have to divide them out again later down the line.
    const restitution = combineRestitutionCoefficients(
        ball1.elasticity,
        ball2.elasticity,
    )
    const impulse =
        ((1 + restitution) * collisionVel) / (ball1.mass + ball2.mass)
    // Apply the impulse.
    // Note that due to the special definition of the impulse,
    // we do not divide-out the balls mass but rather multiply-in the other balls mass.
    ball1.vel.add(collisionNorm.clone().scale(impulse * ball2.mass))
    ball2.vel.subtract(collisionNorm.clone().scale(impulse * ball1.mass))
    // Move the balls out of the overlap.
    // The balls will be moved anti-proportionally to their mass.
    const separation = overlap / (ball1.mass + ball2.mass)
    ball1.pos.subtract(collisionNorm.clone().scale(ball2.mass * separation))
    ball2.pos.add(collisionNorm.clone().scale(ball1.mass * separation))
}

/**Returns the overlap of the balls.
 * This is a positive value if they overlap and negative otherwise.**/
function getBallOverlap(ball1: Ball, ball2: Ball): number {
    const totalDistance = ball1.pos.distance(ball2.pos)
    return ball1.radius + ball2.radius - totalDistance
}

/**Returns the combined coefficient of restitution (COR) for a collision with the coefficients `cor1` and `cor2`.
 * The proper way to calculate is up to debate as the actual
 * value is a property for the interaction between two bodies, and not an intrinsic value of a single body.
 * We calculate the product of the coefficients to approximate it.*/
function combineRestitutionCoefficients(cor1: number, cor2: number): number {
    return cor1 * cor2
}
