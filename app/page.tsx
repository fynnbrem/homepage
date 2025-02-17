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
const arenaElasticity = 0.8

const gravity = 5

const tps = 60
const interval = Math.round(1000 / tps)

const balls: Ball[] = [
    {
        pos: new Vector2(100, 50),
        vel: new Vector2(0, 0),
        mass: 100,
        radius: 25,
        elasticity: 0.95,
        color: "#0000FF",
    },
    {
        pos: new Vector2(50, 50),
        vel: new Vector2(0, 0),
        mass: 200,
        radius: 15,
        elasticity: 0.9,
        color: "#00CCFF",
    },
    {
        pos: new Vector2(150, 50),
        vel: new Vector2(0, 0),
        mass: 50,
        radius: 10,
        elasticity: 0,
        color: "#0066CC",
    },
]

const mouseBall: VoidBall = {
    pos: new Vector2(0, 0),
    mass: 500,
}

/**Creates a minimal position object for the `ball`.*/
function createBallPosition(ball: Ball): { x: number; y: number } {
    return { x: ball.pos.x, y: ball.pos.y }
}

export default function Home() {
    const mousePos = useRef({ x: 0, y: 0 })

    const [ballPos, setBallPos] = useState(balls.map(createBallPosition))

    const canvasRef: RefObject<HTMLDivElement> = useRef(null!)
    const mouseBallActive = useRef(false)

    function updateBalls() {
        setBallPos(balls.map(createBallPosition))
    }

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
            moveBalls(balls, mouseBallActive.current ? mouseBall : undefined)
            updateBalls()
        }, interval)

        return () => clearInterval(intervalTimer)
    }, [])

    return (
        <div
            style={{
                width: arenaWidth,
                height: arenaHeight,
                background: "#171717",
                touchAction: "none",
            }}
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            // The activation of the mouse ball handles on every move event,
            // only leaving needs to be handled explicitly.
            onPointerLeave={() => (mouseBallActive.current = false)}
            onPointerCancel={() => (mouseBallActive.current = false)}
        >
            {ballPos.map((b, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: b.x - balls[i].radius,
                            top: b.y - balls[i].radius,
                            width: balls[i].radius * 2,
                            height: balls[i].radius * 2,
                            background: balls[i].color,
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

    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) {
            // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
            if (getBallOverlap(balls[i], balls[j]) > 0) {
                collideBalls(balls[i], balls[j])
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
    const conversion = ball.elasticity * arenaElasticity

    const targetPos = pos.clone().add(vel)

    if (targetPos.x - radius < left) {
        // Clamp left.
        ball.pos.x = left + radius
        ball.vel.x = -ball.vel.x * conversion
    } else if (targetPos.x + radius > right) {
        // Clamp right.
        ball.pos.x = right - radius
        ball.vel.x = -ball.vel.x * conversion
    } else {
        ball.pos.x = targetPos.x
    }
    if (targetPos.y - radius < top) {
        // Clamp top.
        ball.pos.y = top + radius
        ball.vel.y = -ball.vel.y * conversion
    } else if (targetPos.y + radius > bottom) {
        // Clamp bottom.
        ball.pos.y = bottom - radius
        ball.vel.y = -ball.vel.y * conversion
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

function collideBalls(ball1: Ball, ball2: Ball) {
    const collisionNorm = ball2.pos.clone().subtract(ball1.pos).normalize()
    const relativeVel = ball2.vel.clone().subtract(ball1.vel)
    const collisionVel = collisionNorm.clone().dot(relativeVel)

    // If the velocity is negative,
    // the balls are moving away from one another so we can skip the collision.
    if (collisionVel > 0) return

    // Calculate the total collision impulse.
    // Note that this is not strictly the physical impulse as we do not scale it with the mass-product of both balls.
    // This is so we don't have to divide them out again later down the line.
    const impulse = (2 * collisionVel) / (ball1.mass + ball2.mass)

    // Apply the impulse.
    // Note that due to the special definition of the impulse,
    // we do not divide-out the balls mass but rather multiply-in the other balls mass.
    const conversion = ball1.elasticity * ball2.elasticity
    ball1.vel.add(
        collisionNorm.clone().scale(impulse * ball2.mass * conversion),
    )
    ball2.vel.subtract(
        collisionNorm.clone().scale(impulse * ball1.mass * conversion),
    )

    const overlap = getBallOverlap(ball1, ball2)
    const separation = overlap / (ball1.mass + ball2.mass)
    ball1.pos.subtract(collisionNorm.clone().scale(ball2.mass * separation ))
    ball2.pos.add(collisionNorm.clone().scale(ball1.mass * separation ))

}

/**Returns the overlap of the balls.
 * This is a positive value if they overlap and negative otherwise.**/
function getBallOverlap(ball1: Ball, ball2: Ball): number {
    const totalDistance = ball1.pos.distance(ball2.pos)
    return ball1.radius + ball2.radius - totalDistance
}
