"use client"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { Vector2 } from "math.gl"

type Ball = {
    pos: Vector2
    vel: Vector2 | null
    mass: number
    radius: number
    elasticity: number
}

const arenaHeight = 500
const arenaWidth = 500
const arenaElasticity = 0.8

const gravity = 5

const tps = 60
const interval = Math.round(1000 / tps)

const mainBall: Ball = {
    pos: new Vector2(100, 50),
    vel: new Vector2(0, 0),
    mass: 100,
    radius: 25,
    elasticity: 0.8,
}

const mouseBall: Ball = {
    pos: new Vector2(0, 0),
    vel: null,
    mass: 5000,
    radius: 0,
    elasticity: 1,
}

export default function Home() {
    const mousePos = useRef({ x: 0, y: 0 })

    const [ballPos, setBallPos] = useState({ x: 0, y: 0 })

    const canvasRef: RefObject<HTMLDivElement> = useRef(null!)
    const mouseBallActive = useRef(false)

    function updateBall() {
        setBallPos({ x: mainBall.pos.x, y: mainBall.pos.y })
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

            let balls: Ball[]
            if (mouseBallActive.current) {
                balls = [mouseBall, mainBall]
            } else {
                balls = [mainBall]
            }
            moveBalls(balls)
            updateBall()
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
            <div
                style={{
                    position: "absolute",
                    left: ballPos.x - mainBall.radius,
                    top: ballPos.y - mainBall.radius,
                    width: mainBall.radius * 2,
                    height: mainBall.radius * 2,
                    background: "blue",
                    borderRadius: "50%",
                }}
            />
        </div>
    )
}

function moveBalls(balls: Ball[]): void {
    balls.forEach(applyGravity)
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) {
            // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
            applyForce(balls[i], balls[j])
        }
    }

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
    if (!ball.vel) {
        return
    }
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
function applyForce(ball1: Ball, ball2: Ball): void {
    const force = getForce(ball1, ball2)
    if (ball1.vel) {
        const acc1 = force.scale(1 / ball1.mass)
        ball1.vel.add(acc1)
    }
    if (ball2.vel) {
        const acc2 = force.scale(1 / ball2.mass).negate()
        ball2.vel.add(acc2)
    }
}

/**Modifies the velocity of the ball in accordance with the global gravity.*/
function applyGravity(ball: Ball) {
    if (ball.vel) {
        ball.vel.y = ball.vel.y + gravity / ball.mass
    }
}

/** Return the gravitational force between the two balls, determined by their distance and mass.
 *  The vector points from `ball1` to `ball2`.*/
function getForce(ball1: Ball, ball2: Ball): Vector2 {
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
