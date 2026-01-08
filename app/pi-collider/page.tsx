"use client"
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react"
import { getCollisionVelocityDelta } from "@/app/lib/physics/collision"
import { Box, Typography, useTheme } from "@mui/material"
import { blue, orange, red } from "@mui/material/colors"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import BurstCanvas from "@/app/pi-collider/BurstCanvas"
import { useInterval } from "usehooks-ts"
import { randomInt } from "@/app/lib/math"
import { theme } from "@/app/lib/theme"

const timeScale = 50
const distanceScale = 10

const sparkBurstLimit = 12
// ↑ The limit of spark burst animations that can trigger in a single frame.
// 12 seems to be a number that makes the animation not too dense while still
// making high collision densities satisfying to watch.

const massRatio = 1000000
const minorLength = 100
const sizeRatio = (1 + Math.log(massRatio) / Math.log(100)) ** 0.8
// ↑ The visual size ratio between the blocks.
// We assume mass ratios growing according to `100^n` due to how it affects the generated digits.
// So we normalize the size to this scale and add an exponent of `0.8` to smooth out extreme numbers.
const majorLength = 100 * sizeRatio

function getPosition(
    startPos: number,
    endPos: number,
    startTime: number,
    endTime: number,
    currentTime: number,
): number {
    const relTime = (currentTime - startTime) / (endTime - startTime)
    return startPos + (endPos - startPos) * relTime
}

export default function PiCollider() {
    const blockMover = useRef<BlockMover>(null!)
    const [collisions, setCollisions] = useState<CollisionRecord[]>([])
    const [collisionCounter, setCollisionCounter] = useState(0)
    const makeSparkRef = useRef<(x: number, y: number) => void>(null!)

    const collAnimationIndex = useRef(0)
    const padding = 80

    const rafId = useRef<number | null>(null)
    useEffect(() => {
        const colls = simulateCollisions()
        setCollisions(colls)

        const startTime = performance.now()

        function increment(timestamp: number) {
            const elapsedTime = timestamp - startTime
            const initialIndex = collAnimationIndex.current

            // Find the index matching the current timestamp.
            // For multiple collisions per frame, this will increment it until we reach a matching time.
            // For multiple frames per collision, this will do nothing until the next collision.
            while (
                collAnimationIndex.current + 1 < colls.length &&
                colls[collAnimationIndex.current].time * timeScale < elapsedTime
            ) {
                collAnimationIndex.current += 1
            }
            const index = collAnimationIndex.current
            const lastIndex = index - 1

            const passedColls = index - initialIndex
            for (let i = 0; i < Math.min(passedColls, sparkBurstLimit); i++) {
                const collPos = colls[lastIndex].minorPos
                let sparkPos: number
                if (collPos == 0) {
                    sparkPos = collPos * distanceScale + padding
                } else {
                    sparkPos = collPos * distanceScale + padding + minorLength
                }
                makeSparkRef.current(
                    sparkPos,
                    randomInt(
                        majorLength - minorLength * 0.9,
                        majorLength - minorLength * 0.1,
                    ) + padding,
                )
            }

            setCollisionCounter(index + 1)

            const minorPos = getPosition(
                colls[lastIndex].minorPos,
                colls[index].minorPos,
                colls[lastIndex].time * timeScale,
                colls[index].time * timeScale,
                elapsedTime,
            )
            const majorPos = getPosition(
                colls[lastIndex].majorPos,
                colls[index].majorPos,
                colls[lastIndex].time * timeScale,
                colls[index].time * timeScale,
                elapsedTime,
            )

            blockMover.current(minorPos, majorPos)

            if (collAnimationIndex.current + 1 < colls.length) {
                rafId.current = requestAnimationFrame(increment)
            }
        }

        rafId.current = requestAnimationFrame(increment)

        return () => {
            rafId.current && cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <Box>
            <Typography variant={"h4"}>{collisionCounter}</Typography>
            <Box sx={{ position: "relative" }}>
                <BurstCanvas
                    ref={makeSparkRef}
                    style={{
                        width: "100%",
                        height: majorLength + 2 * padding,
                        position: "absolute",
                        zIndex: 999,
                        top: -padding,
                    }}
                />
                <Blocks
                    padding={padding}
                    blockMover={blockMover}
                    minorLength={minorLength}
                    majorLength={majorLength}
                    minorMass={1}
                    majorMass={massRatio}
                />
            </Box>
        </Box>
    )
}
type BlockMover = (minor: number, major: number) => void

type CollisionRecord = {
    time: number
    deltaTime: number
    minorVel: number
    majorVel: number
    minorPos: number
    majorPos: number
}

type Mass = {
    mass: number
    vel: number
    pos: number
}

function simulateCollisions(): CollisionRecord[] {
    const minorMass: Mass = {
        mass: 1,
        vel: 0,
        pos: 100,
    }
    const majorMass: Mass = {
        mass: massRatio,
        vel: -1,
        pos: 200,
    }

    const collisions: CollisionRecord[] = []
    majorMass.pos = minorMass.pos
    let totalTime = 0

    while (true) {
        // Check if the minor mass is fast enough to catch up with the major mass.
        if (majorMass.vel >= minorMass.vel) break
        const relVel = majorMass.vel - minorMass.vel
        const blockDt = -(majorMass.pos - minorMass.pos) / relVel

        minorMass.pos = minorMass.pos + blockDt * minorMass.vel
        majorMass.pos = minorMass.pos

        totalTime += blockDt
        collisions.push({
            time: totalTime,
            deltaTime: blockDt,
            minorVel: minorMass.vel,
            majorVel: majorMass.vel,
            minorPos: minorMass.pos,
            majorPos: majorMass.pos,
        })

        const [dMinorVel, dMajorVel] = getCollisionVelocityDelta(
            relVel,
            minorMass.mass,
            majorMass.mass,
        )
        minorMass.vel += dMinorVel
        majorMass.vel += dMajorVel

        // Check if the minor mass moves towards the wall.
        if (minorMass.vel >= 0) break

        const wallDt = -minorMass.pos / minorMass.vel
        minorMass.pos = 0
        majorMass.pos = majorMass.pos + wallDt * majorMass.vel

        totalTime += wallDt
        collisions.push({
            time: totalTime,
            deltaTime: wallDt,
            minorVel: minorMass.vel,
            majorVel: majorMass.vel,
            minorPos: minorMass.pos,
            majorPos: majorMass.pos,
        })

        minorMass.vel = -minorMass.vel
    }
    return collisions
}

function Charts(props: { collisions: CollisionRecord[] }) {
    const posData = props.collisions.map((c) => ({
        t: c.time,
        mn: c.minorPos,
        mj: c.majorPos,
    }))

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <LineChart data={posData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Line
                    type="linear"
                    dataKey="mn"
                    stroke={red[700]}
                    dot
                />
                <Line
                    type="linear"
                    dataKey="mj"
                    stroke={blue[700]}
                    dot
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

function Blocks(props: {
    blockMover: Ref<BlockMover>
    minorLength: number
    majorLength: number
    minorMass: number
    majorMass: number
    padding: number
}) {
    const minorBlockRef = useRef<HTMLDivElement>(null!)
    const majorBlockRef = useRef<HTMLDivElement>(null!)

    function setBlockPosition(minorPos: number, majorPos: number) {
        minorBlockRef.current.style.transform = `translateX(${minorPos * distanceScale}px)`
        majorBlockRef.current.style.transform = `translateX(${majorPos * distanceScale + props.minorLength}px)`
    }

    useImperativeHandle(props.blockMover, () => setBlockPosition)

    return (
        <Box
            sx={{
                position: "relative",
                height: Math.max(props.minorLength, props.majorLength),
                margin: `${props.padding}px`,
                fontFamily: "Cambria Math, Cambria, serif",
                fontSize: 32,
                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Box
                ref={minorBlockRef}
                sx={{
                    width: props.minorLength,
                    height: props.minorLength,
                    position: "absolute",
                    bottom: 0,
                    transform: `translateX(0px)`,
                    background: orange[900],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.minorMass} kg
            </Box>
            <Box
                ref={majorBlockRef}
                sx={{
                    width: props.majorLength,
                    height: props.majorLength,
                    position: "absolute",
                    bottom: 0,
                    transform: `translateX(${props.minorLength}px)`,
                    background: orange[600],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.majorMass} kg
            </Box>
        </Box>
    )
}
