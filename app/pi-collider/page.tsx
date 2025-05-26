"use client"
import {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react"
import { getCollisionVelocityDelta } from "@/app/lib/physics/collision"
import { Box, Typography } from "@mui/material"
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

const timeScale = 10
const distanceScale = 10

export default function PiCollider() {
    const blockMover = useRef<BlockMover>(null!)
    const [collisions, setCollisions] = useState<CollisionRecord[]>([])

    useEffect(() => {
        const colls = simulateCollisions()
        setCollisions(colls)
        console.log(colls.slice(0, 20))

        function increment(index: number) {
            blockMover.current(colls[index].minorPos, colls[index].majorPos)

            if (index + 1 < colls.length) {
                setTimeout(
                    () => {
                        increment(index + 1)
                    },
                    colls[index + 1].deltaTime * timeScale,
                )
            }
        }

        increment(0)
    }, [])

    return (
        <Box>
            <Typography variant={"h4"}>{collisions.length}</Typography>
            <Charts collisions={collisions} />
            <Blocks
                blockMover={blockMover}
                minorLength={100}
                majorLength={200}
            />
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
        mass: 100,
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
                }}
            />
            <Box
                ref={majorBlockRef}
                sx={{
                    width: props.majorLength,
                    height: props.majorLength,
                    position: "absolute",
                    bottom: 0,
                    transform: `translateX(${props.minorLength}px)`,
                    background: orange[600],
                }}
            />
        </Box>
    )
}
