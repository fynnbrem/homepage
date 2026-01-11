"use client"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { Vector2 } from "math.gl"
import {
    getStaticConfiguration,
    useConfiguration,
    WorldConfigurationStatic,
} from "@/app/providers/ConfigurationProvider"
import { Box } from "@mui/material"
import { moveBalls } from "@/app/lib/physics/ball-movement/movement"
import {
    Ball,
    cloneBalls,
    updateBallPath,
    VoidBall,
} from "@/app/lib/physics/ball-movement/model"
import ArenaContent from "@/app/arena/ArenaContent"

/**Freezes the entire simulation.*/
const freeze = false
/**Logs the measured tick interval to the console.*/
const logTickInterval = false

const tps = 60
const interval = Math.round(1000 / tps)

const baseDim = new Vector2(600, 700)

const mouseBall: VoidBall = {
    pos: new Vector2(0, 0),
    mass: 1500,
}

export const globalBalls: Ball[] = [
    {
        id: "abb9b19c-7946-4d60-a12d-cd5d38323f5c",
        pos: new Vector2(100, 100),
        vel: new Vector2(10, 0),
        mass: 100,
        radius: 25,
        elasticity: 1,
        color: "#e37e21",
        path: [],
    },
    {
        id: "32e51e1b-b922-4059-a37c-7ceb1ccef856",
        pos: new Vector2(225, 100),
        vel: new Vector2(5, 5),
        mass: 200,
        radius: 15,
        elasticity: 0.8,
        color: "#eda503",
        path: [],
    },
    {
        id: "fb13f223-081d-4ada-9f51-2c4302d08df6",
        pos: new Vector2(150, 150),
        vel: new Vector2(0, -2),
        mass: 50,
        radius: 10,
        elasticity: 0.2,
        color: "#b34500",
        path: [],
    },
]
export default function Arena() {
    const mousePosRef = useRef(new Vector2(0, 0))
    const mouseBallActive = useRef(false)
    const [mousePos, setMousePos] = useState(new Vector2(0, 0))

    const arenaDimRef = useRef(baseDim)

    const lastTickTime = useRef(0)

    const tickCount = useRef(0)

    const [balls, setBalls] = useState(cloneBalls(globalBalls))
    const config = useConfiguration()
    const configRef = useRef(config)

    configRef.current = config

    const arenaRef: RefObject<HTMLDivElement> = useRef(null!)

    /**Updates the current mouse position to the ref and state.
     * Also forces `mouseBallActive` to `true`.*/
    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>): void {
        const rect = e.currentTarget.getBoundingClientRect()
        mousePosRef.current.x = e.clientX - rect.left
        mousePosRef.current.y = e.clientY - rect.top
        setMousePos(mousePosRef.current.clone())
        // Handle activation of the mouse ball here so it also works independently form the pointer-enter-event.
        // (Handles the case where the cursor is already within the frame when it mounts).
        mouseBallActive.current = true
    }

    useEffect(() => {
        function getConfig() {
            return getStaticConfiguration(configRef.current)
        }

        function updateMouseBall(config: WorldConfigurationStatic) {
            mouseBall.pos.x = mousePosRef.current.x
            mouseBall.pos.y = mousePosRef.current.y
            mouseBall.mass = config.pointerGravity
        }

        function doTick(): void {
            const config = getConfig()
            if (!freeze) {
                updateBallPath(globalBalls, config.trailLength)
                updateMouseBall(config)
                moveBalls(
                    globalBalls,
                    config,
                    arenaDimRef.current,
                    mouseBallActive.current ? mouseBall : undefined,
                )
            }
            setBalls(cloneBalls(globalBalls))

            tickCount.current += 1
            // Update the TPS every 32 Ticks (2 ** 5)
            if (tickCount.current % 32 == 0) {
                const currentTime = Date.now()
                const tickInterval = currentTime - lastTickTime.current
                lastTickTime.current = currentTime
                if (logTickInterval)
                    console.log(Math.round(32000 / tickInterval))
            }
        }

        const intervalTimer = setInterval(doTick, interval)

        return () => clearInterval(intervalTimer)
    }, [])

    return (
        <Box
            sx={{
                width: arenaDimRef.current.x,
                height: arenaDimRef.current.y,
                background: "#2A2A2A",
                touchAction: "none",
                overflow: "hidden",
                position: "relative",
                cursor: "none",
                borderRadius: 1,
                boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.8)",
            }}
            ref={arenaRef}
            onPointerMove={handlePointerMove}
            // The activation of the mouse ball is handled on every move event,
            // only leaving needs to be handled explicitly.
            onPointerLeave={() => (mouseBallActive.current = false)}
            onPointerCancel={() => (mouseBallActive.current = false)}
        >
            <ArenaContent
                balls={balls}
                isMouseActive={mouseBallActive.current}
                mousePos={mousePos}
            />
        </Box>
    )
}
