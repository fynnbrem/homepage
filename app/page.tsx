"use client"
import {useEffect, useState} from "react";
import {useEventListener} from "usehooks-ts";
import {Vector2} from "math.gl";


type Ball = { // TODO: Update DocStrings to use the proper terminology.
    pos: Vector2,
    vel: Vector2 | null,
    mass: number,
    radius: number | null,
}


const gravity = 10

const tps = 60
const interval = Math.round(1000 / 60)

const mainBall: Ball = {
    pos: new Vector2(0, 0),
    vel: new Vector2(0, 0),
    mass: 20,
    radius: 25
}

const mouseBall: Ball = {
    pos: new Vector2(0, 0),
    vel: new Vector2(0, 0),
    mass: 10,
    radius: null
}


export default function Home() {
    const [mousePos, setMousePos] = useState([0, 0])

    useEffect(() => {
        const intervalTimer = setInterval(() => {
            moveBalls([mainBall, mouseBall]);
        }, interval);

        return () => clearInterval(intervalTimer);
    }, []);

    const mouseMass = 10
    const radius = 25


    useEventListener("mousemove", (e: MouseEvent) => {
        setMousePos([e.clientX, e.clientY]);
    })

    let [x, y] = [mousePos[0] - radius, mousePos[1] - radius]
    x = Math.max(0, Math.min(x, window.innerWidth - radius * 2));
    y = Math.max(0, Math.min(y, window.innerHeight - radius * 2));

    return (
        <div style={{
            position: "absolute",
            left: x,
            top: y,
            width: radius * 2,
            height: radius * 2,
            background: "blue",
            borderRadius: "50%"
        }}></div>
    );
}

function moveBalls(balls: Ball[]): void {
    balls.forEach(
        applyGravity
    )
    for (let i = 0; i++; i < balls.length) {
        for (let j = 0; j++; j < i) { // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
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
    const forceScale = (ball1.mass * ball2.mass) / (distance ** 3)
    // Square scaling by the nature and an extra division by the distance to normalize the vector delta.
    return ball2.pos.clone().subtract(ball1.pos).scale(forceScale)
}
