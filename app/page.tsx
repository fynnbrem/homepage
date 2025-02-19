"use client"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { Vector2 } from "math.gl"

type VoidBall = {
    pos: Vector2
    mass: number
}
type Ball = VoidBall & {
    vel: Vector2
    radius: number
    elasticity: number
    color: string
}

const arenaHeight = 500
const arenaWidth = 500
const arenaElasticity = 0.9

const gravity = 0
const doCollide = true

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
    },
    {
        pos: new Vector2(225, 100),
        vel: new Vector2(5, 5),
        mass: 200,
        radius: 15,
        elasticity: 0.8,
        color: "#eda503",
    },
    {
        pos: new Vector2(150, 150),
        vel: new Vector2(0, -2),
        mass: 50,
        radius: 10,
        elasticity: 0,
        color: "#b34500",
    },
]

const mouseBall: VoidBall = {
    pos: new Vector2(0, 0),
    mass: 1500,
}

export default function Home() {
    const mousePos = useRef({ x: 0, y: 0 })

    /*We use a dummy state to update the component on every tick.
     * We do this because we have no reason to utilize React's optimizations as every object changes on every tick.*/
    const [, forceRerender] = useState(true)

    const canvasRef: RefObject<HTMLDivElement> = useRef(null!)
    const mouseBallActive = useRef(false)

    function updateMouseBall() {
        mouseBall.pos.x = mousePos.current.x
        mouseBall.pos.y = mousePos.current.y
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>): void {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
        // Handle activation of the mouse ball here so it also works independently form the pointer-enter-event.
        // (Handles the case where the cursor is already within the frame when it mounts).
        mouseBallActive.current = true
    }

    useEffect(() => {
        const intervalTimer = setInterval(() => {
            updateMouseBall()
            moveBalls(
                globalBalls,
                mouseBallActive.current ? mouseBall : undefined,
            )

            forceRerender((v) => !v)
        }, interval)

        return () => clearInterval(intervalTimer)
    }, [])

    return (
        <div
            style={{
                width: arenaWidth,
                height: arenaHeight,
                background: "#2A2A2A",
                touchAction: "none",
            }}
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            // The activation of the mouse ball handles on every move event,
            // only leaving needs to be handled explicitly.
            onPointerLeave={() => (mouseBallActive.current = false)}
            onPointerCancel={() => (mouseBallActive.current = false)}
        >
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

function moveBalls(balls: Ball[], mouseBall?: VoidBall): void {
    // Apply global gravity.
    balls.forEach(applyGlobalGravity)
    // Apply gravity between the balls.
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) {
            // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
            applyBallGravity(balls[i], balls[j])
        }
    }
    // Apply mouse ball gravity.
    if (mouseBall) {
        balls.forEach((b) => applyVoidBallGravity(b, mouseBall))
    }
    if (doCollide) {
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
    balls.forEach((b) => moveInBox(b, [0, arenaWidth, 0, arenaHeight]))
}

/** Moves the ball within the `box` so that it does not go above its boundaries.
 *  The movement is generated from the ball's `.vel`.
 * @param ball
 *  The ball to move.
 * @param box
 *  The box in which the ball is constrained.
 *  Must be the following coordinates: `[leftX, rightX, topY, bottomY]`
 *  */
function moveInBox(ball: Ball, box: [number, number, number, number]): void {
    const [left, right, top, bottom] = box

    const vel = ball.vel
    const pos = ball.pos
    const radius = ball.radius
    const restitution = combineRestitutionCoefficients(
        ball.elasticity,
        arenaElasticity,
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
function applyBallGravity(ball1: Ball, ball2: Ball): void {
    const force = getForce(ball1, ball2)
    const acc1 = force.clone().scale(1 / ball1.mass)
    ball1.vel.add(acc1)

    const acc2 = force.scale(1 / ball2.mass).negate()
    ball2.vel.add(acc2)
}

/** Modifies the velocity of the `ball` in accordance to the force generated between it and the `voidBall`.*/
function applyVoidBallGravity(ball: Ball, voidBall: VoidBall): void {
    const force = getForce(ball, voidBall)
    const acc1 = force.scale(1 / ball.mass)
    ball.vel.add(acc1)
}

/**Modifies the velocity of the ball in accordance with the global gravity.*/
function applyGlobalGravity(ball: Ball) {
    ball.vel.y = ball.vel.y + gravity / ball.mass
}

/** Return the gravitational force between the two balls, determined by their distance and mass.
 *  The vector points from `ball1` to `ball2`.*/
function getForce(ball1: VoidBall, ball2: VoidBall): Vector2 {
    let distance = ball1.pos.distance(ball2.pos)
    let forceScale: number

    if (distance !== 0) {
        distance = Math.max(10, distance)
        // Clamp the distance to a minimum of 5 to prevent excessive acceleration
        // (Happens when colliding with the mouse at it has no radius).
        forceScale = (ball1.mass * ball2.mass) / distance ** 3
        // ↑ Square scaling by the nature and an extra division by the distance to normalize the vector delta.
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
