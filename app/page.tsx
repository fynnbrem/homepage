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


const gravity = 10

const tps = 1
const interval = Math.round(1000 / tps)

const mainBall: Ball = {
    pos: new Vector2(0, 0),
    vel: new Vector2(0, 0),
    mass: 20,
    radius: 25
}

const mouseBall: Ball = {
    pos: new Vector2(0, 0),
    vel: null,
    mass: 10000,
    radius: 0
}

export default function Home() {
    console.log(mainBall)
    const mousePos = useRef({x: 0, y: 0})

    const [ballPos, setBallPos] = useState({x: 0, y: 0})

    const canvasRef: RefObject<HTMLDivElement> = useRef(null!)
    const mouseBallActive = useHover(canvasRef) // TODO: Use this to disable mouse-gravity when inactive.

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
            moveBalls([mainBall, mouseBall]);
            updateBall()
        }, interval);

        return () => clearInterval(intervalTimer);
    }, []);


    useEventListener("mousemove", (e: MouseEvent) => {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY
    })


    return (
        <div style={{width: "100vw", height: "100vh", background: "#171717"}} ref={canvasRef}>
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

    balls.forEach(applyVelocity)

}


/** Modifies the position of the MassPoint in accordance with its current velocity.*/
function applyVelocity(ball: Ball): void {
    if (ball.vel) {
        ball.pos.add(ball.vel)
    }

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