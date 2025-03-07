import React from "react";
import { Vector2 } from "math.gl";
import { Ball } from "@/app/lib/ball-movement/model";

/**The components contained within the arena.
 * These are:
 *  - The balls with their shadow and trail.
 *  - The mouse light (if the mouse is active).*/
export default function ArenaContent({
    balls,
    isMouseActive,
    mousePos,
}: {
    balls: Ball[]
    isMouseActive: boolean
    mousePos: Vector2
}) {
    return (
        <>
            {/*Render the ball shadows.
            These are not part of the ball elements themselves for the following reasons:
                - Balls must not cast their shadow on other balls, but rather on the layer behind all balls.
                - The pointer light must be rendered between balls and shadows.*/}
            <BallShadows
                balls={balls}
                lightPos={mousePos}
            />
            {/*Render the pointer light above the shadows.*/}
            {isMouseActive && <MouseLight mousePos={mousePos} />}

            {/*Render the paths right below the balls.*/}
            <BallTrails balls={balls} />

            {/*Render the balls above the light.*/}
            <Balls balls={balls} />
        </>
    )
}

/**The ball shadows. These mimic the ball shape and have an offset
 * that increases with the distance between the respective ball and the `lightPos`.*/
function BallShadows({
    balls,
    lightPos,
}: {
    balls: Ball[]
    lightPos: Vector2
}) {
    return (
        <>
            {balls.map((b, i) => {
                const shadowOffset = getShadowOffset(b.pos, lightPos, 25)
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
        </>
    )
}

/**A glowing circle to highlight the mouse position.*/
function MouseLight({ mousePos }: { mousePos: Vector2 }) {
    return (
        <div
            style={{
                position: "absolute",
                left: mousePos.x - 35,
                top: mousePos.y - 35,
                borderRadius: "50%",
                width: 70,
                height: 70,
                background:
                    "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.25) 5%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0) 100%)",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
            }}
        />
    )
}

/**The transparent trails of the balls, as defined by their `Ball.path`.
 * Every trail takes on the respective  ball's color and the width scales with the radius of the ball.*/
function BallTrails({ balls }: { balls: Ball[] }) {
    return (
        <svg
            width={"100%"}
            height={"100%"}
        >
            {balls.map((b, i) => {
                return (
                    <BallDotTrail
                        ball={b}
                        key={i}
                    />
                )
            })}
        </svg>
    )
}

const maxOpacity = 0.3
const shrinkRange = 0.2

function BallDotTrail({ ball }: { ball: Ball }) {
    return ball.path.map((p, j) => {
        const fadePerStep = maxOpacity / ball.path.length
        const shrinkPerStep = shrinkRange / ball.path.length
        const k = ball.path.length - j
        return (
            <circle
                key={j}
                cx={p.x}
                cy={p.y}
                r={Math.round(ball.radius ** (0.5 + k * shrinkPerStep) * 1.2)}
                opacity={k * fadePerStep}
                fill={ball.color}
            />
        )
    })
}

function BallLineTrail({ ball }: { ball: Ball }) {
    const path = ball.path.map((p) => `${p.x},${p.y}`).join(" ")
    return (
        <polyline
            points={path}
            fill={"none"}
            stroke={ball.color}
            // Define the stroke width.
            // We want one that scales sub-linearly with size,
            // so big balls don't have a too large trail or small balls have a too small trail.
            // The rounding is not strictly necessary but prevents hydration errors due to imprecision.
            strokeWidth={Math.round(ball.radius ** 0.7 * 1.2)}
            strokeOpacity={0.3}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
        />
    )
}

/**The balls. These are just plain circles, with appearance and position by the respective balls.*/
function Balls({ balls }: { balls: Ball[] }) {
    return (
        <>
            {balls.map((b, i) => {
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
        </>
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
