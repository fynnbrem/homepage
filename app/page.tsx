"use client"
import {RefObject, useEffect, useRef, useState} from "react";
import {useEventListener, useHover} from "usehooks-ts";
import {Vector2} from "math.gl";


type Ball = { // TODO: Update DocStrings to use the proper terminology.
    pos: Vector2,
    vel: Vector2 | null,
    mass: number,
    radius: number,
}

const arenaHeight = 200
const arenaWidth = 200

const gravity = 10

const tps = 5
const interval = Math.round(1000 / tps)

const mainBall: Ball = {
    pos: new Vector2(100, 50),
    vel: new Vector2(0, 0),
    mass: 20,
    radius: 25
}

const mouseBall: Ball = {
    pos: new Vector2(0, 0),
    vel: null,
    mass: 1000,
    radius: 0
}

export default function Home() {
    const mousePos = useRef({x: 0, y: 0})

    const [ballPos, setBallPos] = useState({x: 0, y: 0})

    const canvasRef: RefObject<HTMLDivElement> = useRef(null!)
    const mouseBallActive = useHover(canvasRef) // TODO: Use this to disable mouse-gravity when inactive.
    const mouseBallActiveRef = useRef(mouseBallActive)
    mouseBallActiveRef.current = mouseBallActive

    function updateBall() {
        setBallPos({x: mainBall.pos.x, y: mainBall.pos.y})
    }

    function updateMouseBall() {
        mouseBall.pos.x = mousePos.current.x
        mouseBall.pos.y = mousePos.current.y
    }

    useEffect(() => {
        const intervalTimer = setInterval(() => {
            updateMouseBall()

            let balls: Ball[]
            if (mouseBallActiveRef.current) {
                balls = [mouseBall, mainBall]
            } else {
                balls = [mainBall]
            }
            moveBalls(balls);
            updateBall()
        }, interval);

        return () => clearInterval(intervalTimer);
    }, []);


    useEventListener("mousemove", (e: MouseEvent) => {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
    })


    return (
        <div style={{width: arenaWidth, height: arenaHeight, background: "#171717"}} ref={canvasRef}>
            <div style={{
                position: "absolute",
                left: ballPos.x - mainBall.radius,
                top: ballPos.y - mainBall.radius,
                width: mainBall.radius * 2,
                height: mainBall.radius * 2,
                background: "blue",
                borderRadius: "50%"
            }}></div>
        </div>
    );
}

function moveBalls(balls: Ball[]): void {
    balls.forEach(
        applyGravity
    )
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) { // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
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

    let xMaxT = 1
    let yMaxT = 1

    const vel = ball.vel
    const pos = ball.pos
    const radius = ball.radius

    const targetPos = pos.clone().add(vel)
    console.log("From pos")
    console.log(pos)
    console.log("To pos")
    console.log(targetPos)
    let xFinal = targetPos.x
    let yFinal = targetPos.y

    if (targetPos.x - radius < left) {
        // Clamp left.
        xMaxT = Math.abs((targetPos.x - radius - left) / vel.x)
        xFinal = left + radius
        // TODO: Using the absolute value might cause the ball to accelerate even further out of bounds
        //  if it already is out of bounds at the beginning (e.g. when resizing the window).
    } else if (targetPos.x + radius > right) {
        // Clamp right.
        xMaxT = Math.abs((right - targetPos.x - radius) / vel.x)
        xFinal = right - radius
    }
    if (targetPos.y - radius < top) {
        // Clamp top.
        yMaxT = Math.abs((targetPos.y - radius - left) / vel.y)
        yFinal = top + radius
    } else if (targetPos.y + radius > bottom) {
        // Clamp bottom.
        console.log("clamp bottom")
        yMaxT = Math.abs((right - targetPos.y - radius) / vel.y)
        yFinal = bottom - radius
        console.log(yMaxT)
    }
    const maxT = Math.min(yMaxT, xMaxT)

    // TODO: Docs
    if (maxT !== 1) {
        if (xMaxT < yMaxT) {
            // x-blocked.
            ball.pos.y = pos.y + vel.y * maxT
            ball.pos.x = xFinal
            ball.vel.x = 0
        } else if (yMaxT < xMaxT) {
            // y-blocked.
            console.log("y-blocked")
            ball.pos.x = pos.x + vel.x * maxT
            ball.pos.y = yFinal
            ball.vel.y = 0
        } else if (yMaxT === xMaxT) {
            // Both blocked.
            ball.pos.add(ball.vel.scale(maxT))
            ball.vel.x = 0
            ball.vel.y = 0
        }
    } else {
        ball.pos = targetPos
    }
    console.log("Final pos")
    console.log(ball.pos)

}


/** Modifies the velocity of both MassPoints in accordance to the force generated between them.*/
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

/**Modifies the velocity of the MassPoint in accordance with the global gravity.*/
function applyGravity(ball: Ball) {
    if (ball.vel) {
        ball.vel.y = ball.vel.y + (gravity / ball.mass)
    }

}


/** Return the gravitational force between the two MassPoints, determined by their distance and mass.
 *  The vector points from `ball1` to `ball2`.*/
function getForce(ball1: Ball, ball2: Ball): Vector2 {
    const distance = ball1.pos.distance(ball2.pos);
    let forceScale: number
    if (distance !== 0) {
        forceScale = (ball1.mass * ball2.mass) / (distance ** 3)
    } else {
        forceScale = 0
    }
    // Square scaling by the nature and an extra division by the distance to normalize the vector delta.
    return ball2.pos.clone().subtract(ball1.pos).scale(forceScale)
}