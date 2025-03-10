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

            {/*Render the paths right below the balls.*/}
            <BallTrails balls={balls} />

            {/*Render the balls above the light.*/}
            <Balls
                balls={balls}
                lightPos={mousePos}
            />
            {isMouseActive && <MouseLight mousePos={mousePos} />}
        </>
    )
}

/**The ball shadows. These mimic the ball shape and have an offset
 * that increases with the distance between the respective ball and the `lightPos`.
 *
 * The shadow does not imitate an actual light source and instead moves
 * linearly with the planar distance, giving a subtle shadow effect.*/
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
                const shadowOffset = getShadowOffset(b.pos, lightPos, 50)
                // const shadowOffset = new Vector2(0, 0)
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: b.pos.x - b.radius + shadowOffset.x,
                            top: b.pos.y - b.radius + shadowOffset.y,
                            width: b.radius * 2,
                            height: b.radius * 2,
                            background: "rgba(0, 0, 0, 0.4)",
                            border: "none",
                            borderRadius: "50%",
                            filter: "blur(5px)",
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

/**The trail for a ball.
 * The trail is a line of dots that gradually shrinks and fades out the further out the dot is.*/
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

/**Renders the visualizations of the balls using `<BallCircle>`.*/
function Balls({ balls, lightPos }: { balls: Ball[]; lightPos: Vector2 }) {
    return (
        <>
            {balls.map((b) => {
                return (
                    <BallCircle
                        key={b.id}
                        ball={b}
                        lightPos={lightPos}
                    />
                )
            })}
        </>
    )
}

/**The simulated height of the light (The z-position). This is used to create a realistic lighting effect.*/
const lightHeight = 200

/**The visualization of a `ball`.
 * It consists of a colored circle and a light effect to make it appear 3D.*/
function BallCircle({ ball, lightPos }: { ball: Ball; lightPos: Vector2 }) {
    // Calculate the position of the light reflection of the ball.
    // This imitates an actual light source shining from a constant height.
    const lightPosRelative = lightPos.clone().subtract(ball.pos)
    const lightDistance = Math.hypot(lightPos.x, lightPos.y, lightHeight)
    const reflectionPos = lightPosRelative.scale(ball.radius / lightDistance)

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    left: ball.pos.x - ball.radius,
                    top: ball.pos.y - ball.radius,
                    width: ball.radius * 2,
                    height: ball.radius * 2,
                    background: ball.color,
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: ball.pos.x - ball.radius,
                    top: ball.pos.y - ball.radius,
                    width: ball.radius * 2,
                    height: ball.radius * 2,
                    background: `radial-gradient(circle at ${reflectionPos.x + ball.radius}px ${reflectionPos.y + ball.radius}px, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0))`,
                    borderRadius: "50%",
                }}
            />
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
