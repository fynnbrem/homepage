"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Button } from "@mui/material"
import SparkCanvas from "@/app/pi-collider/BurstCanvas"
import { randomInt } from "@/app/lib/math"
import { BlockConfig, CollisionRecord } from "@/app/pi-collider/collisions"
import { BlockMover, Blocks } from "@/app/pi-collider/Blocks"
import {
    calculatePosition,
    interpolatePosition,
} from "@/app/lib/physics/movement"
import NumbersIcon from "@mui/icons-material/Numbers"
import NumberConfigure from "@/app/arena/world-configure/components/NumberConfigure"
import { PlayArrow } from "@mui/icons-material"
import { CounterBox } from "@/app/pi-collider/CounterBox"
import { GrowCounterHandle } from "@/app/pi-collider/GrowCounter"
import { zIndex } from "@/app/lib/theme"
import { CollisionWorkerParams } from "@/app/pi-collider/collisions.worker"

const timeScale = 100
const distanceScale = 30

/**The base interval under which collisions will be squashed into one (To save memory).
 * This value is real microseconds, its binding accommodates the `timeScale`.*/
const squashBaseInterval = 10

const sparkBurstLimit = 12
// ↑ The limit of spark burst animations that can trigger in a single frame.
// 12 seems to be a number that makes the animation not too dense while still
// making high collision densities satisfying to watch.

const flyOutTime = 1500
// ↑ The time [ms] that the blocks will fly out after their final collision.
// Sufficient to push them far beyond the viewport.
const padding = 80

type SimulationConfig = {
    blockConfig: BlockConfig
    /** The coordinate range that sparks can spawn on the y-axis.
     * This is the shared area between the minor and major block, minus 10% padding
     * as they look weird when spawning on the corners. */
    sparkYRange: [number, number]
    minorLength: number
    majorLength: number
    massRatio: number
}

/**Creates the `SimulationConfig` based on the parameters.
 * Contains all default values and infers the rest from the `massRatio`.*/
function getSimulationConfig(massRatio: number): SimulationConfig {
    const minorLength = 80
    /** The visual size ratio between the blocks.
     * We assume mass ratios growing according to `100^n` due to how it affects the generated digits.7
     * So we normalize the size to this scale and add an exponent of `0.8` to smooth out extreme numbers.*/
    const sizeRatio = (1 + Math.log(massRatio) / Math.log(100)) ** 0.8
    const majorLength = minorLength * sizeRatio

    return {
        blockConfig: {
            minor: {
                mass: 1,
                vel: 0,
                pos: 20,
            },
            major: {
                mass: massRatio,
                vel: -1,
                pos: 25,
            },
        },
        sparkYRange: [
            majorLength - minorLength * 0.9,
            majorLength - minorLength * 0.1,
        ],
        minorLength: minorLength,
        majorLength: majorLength,
        massRatio: massRatio,
    }
}

function CollisionBox(props: {
    ref: React.RefObject<HTMLDivElement>
    makeSpark: React.RefObject<(x: number, y: number) => void>
    simConfig: React.RefObject<SimulationConfig>
    blockMover: React.RefObject<BlockMover>
    simConfigState: SimulationConfig
}) {


    return (
        <Box sx={{ position: "relative" }} ref={props.ref}>
            {/*Make the burst canvas overlay the boxes.*/}
            <SparkCanvas
                ref={props.makeSpark}
                style={{
                    width: "100%",
                    height: props.simConfig.current.majorLength + 2 * padding,
                    position: "absolute",
                    zIndex: zIndex.counter - 1,
                    top: -padding,
                }}
            />
            <Blocks
                padding={padding}
                blockMover={props.blockMover}
                minorLength={props.simConfigState.minorLength}
                majorLength={props.simConfigState.majorLength}
                minorMass={1}
                majorMass={props.simConfigState.massRatio}
                distanceScale={distanceScale}
            />
        </Box>
    )
}

export default function PiCollider() {
    const [digits, setDigits_] = useState(4)
    /** Whether the last collision has passed, i.e. the simulation is in its final state.*/
    const [isFinal, setIsFinal] = useState(false)
    const blockMover = useRef<BlockMover>(null!)
    const makeSparkRef = useRef<(x: number, y: number) => void>(null!)
    const counterRef = useRef<GrowCounterHandle>(null!)
    const rafId = useRef<number | null>(null)
    const collisionBoxRef = useRef<HTMLDivElement>(null!)

    const collsRef = useRef<CollisionRecord[]>([])
    const startTimeRef = useRef(0)
    /** The index the collision animation currently is at.
     * We start at `1` as this is sets the upcoming collision, not the latest. */
    const collAnimationIndex = useRef(1)

    const simConfig = useRef(getSimulationConfig(100 ** (digits - 1)))
    const [simConfigState, setSimConfigState] = useState(simConfig.current)

    const workerRef = useRef<Worker | null>(null)
    const workerHandler = useRef<(_: CollisionRecord[]) => void | null>(null)

    /** Resets all properties related to the animation.
     *  - Resets the counter and final state.
     *  - Resets the animation index.
     *  - Cancel any running animation.*/
    const resetAnimation = useCallback(() => {
        collAnimationIndex.current = 1
        counterRef.current.update(0)
        setIsFinal(false)
        cancelAnimation()
    }, [])

    function runWorker(
        params: CollisionWorkerParams,
        callback: (_: CollisionRecord[]) => void,
    ) {
        workerHandler.current = callback
        workerRef.current?.postMessage(params)
    }

    function setDigits(v: number) {
        if (v >= 1) {
            setDigits_(v)
        }
    }

    /**Create a spark burst for the blocks.
     * The final position is inferred entirely from the position of the minor blocks position `minorPos`.*/
    const makeSpark = useCallback((minorPos: number) => {
        const config = simConfig.current
        // Determine the actual position of the spark.
        // Depending on whether this is a wall collision (the minor block is at position `0`)
        // or block collision, it must be shifted to appear at the corresponding side.
        let sparkPos: number
        if (minorPos == 0) {
            sparkPos = padding
        } else {
            sparkPos = minorPos * distanceScale + padding + config.minorLength
        }

        makeSparkRef.current(
            sparkPos,
            randomInt(config.sparkYRange[0], config.sparkYRange[1]) + padding,
        )
    }, [])

    /**
     * Invokes the visual effects of a collision (The spark animation and the counter increment).
     * This intended to be called only once per frame.
     */
    const showCollisions = useCallback(
        // Spawn the sparks (Capped at `sparkBurstLimit` per frame).
        (count: number, minorPos: number) => {
            for (let i = 0; i < Math.min(count, sparkBurstLimit); i++) {
                // We take the position of the last collision as position of the sparks,
                // this is usually accurate enough as when stacking happens, the collisions are also very close by.
                makeSpark(minorPos)
            }
            // Increment the counter.
            counterRef.current.increment(count)
        },
        [makeSpark],
    )

    /**Animate the blocks flying out. Assumes the last animation finished on the final position.
     * The blocks will gradually slow down until the come to a halt.*/
    const animateFlyOut = useCallback((timestamp: number) => {
        const colls = collsRef.current
        const finalColl = colls[colls.length - 1]
        const elapsedTime =
            timestamp - startTimeRef.current - finalColl.time * timeScale

        // Define the acceleration so that the blocks come to a standstill exactly at the `flyOutTime`.
        const minorAcc = -finalColl.minorVel / (flyOutTime / timeScale)
        const majorAcc = -finalColl.majorVel / (flyOutTime / timeScale)

        const minorPos = calculatePosition(
            finalColl.minorPos,
            finalColl.minorVel,
            minorAcc,
            elapsedTime / timeScale,
        )
        const majorPos = calculatePosition(
            finalColl.majorPos,
            finalColl.majorVel,
            majorAcc,
            elapsedTime / timeScale,
        )

        blockMover.current(minorPos, majorPos)
        if (elapsedTime < flyOutTime) {
            rafId.current = requestAnimationFrame(animateFlyOut)
        }
    }, [])

    /**Animate the blocks colliding. Transitions to `animateFlyOut` when done.*/
    const animateCollision = useCallback(
        (timestamp: number) => {
            const elapsedTime = timestamp - startTimeRef.current

            const colls = collsRef.current
            let passedColls = 0
            // Find the index matching the current timestamp.
            // For multiple collisions per frame, this will increment it until we reach a matching time.
            // For multiple frames per collision, this will do nothing until the next collision.
            while (
                collAnimationIndex.current + 1 < collsRef.current.length &&
                collsRef.current[collAnimationIndex.current].time * timeScale <
                    elapsedTime
            ) {
                passedColls +=
                    collsRef.current[collAnimationIndex.current].squashes
                collAnimationIndex.current += 1
            }
            const index = collAnimationIndex.current
            const lastIndex = index - 1

            // Show the passed collisions.
            // This must use `lastIndex` as the current `index`
            // points to the next collision in the future, not the passed one.
            showCollisions(passedColls, colls[lastIndex].minorPos)

            const minorPos = interpolatePosition(
                colls[lastIndex].minorPos,
                colls[index].minorPos,
                colls[lastIndex].time * timeScale,
                colls[index].time * timeScale,
                elapsedTime,
            )
            const majorPos = interpolatePosition(
                colls[lastIndex].majorPos,
                colls[index].majorPos,
                colls[lastIndex].time * timeScale,
                colls[index].time * timeScale,
                elapsedTime,
            )

            blockMover.current(minorPos, majorPos)

            console.log(collisionBoxRef.current.getBoundingClientRect())


            if (
                index == colls.length - 1 &&
                elapsedTime > colls[index].time * timeScale
            ) {
                // Once we are at the last index and the time has reached the point of that last collision,
                // we must invoke that last collision here.
                showCollisions(1, colls[index].minorPos)
                setIsFinal(true)
                // Transition to fly-out.
                rafId.current = requestAnimationFrame(animateFlyOut)
            } else {
                rafId.current = requestAnimationFrame(animateCollision)
            }
        },
        [showCollisions, animateFlyOut],
    )

    /**Animate the blocks flying in. Transitions to `animateCollisions` when done.*/
    const animateFlyIn = useCallback(
        (timestamp: number) => {
            const config = simConfig.current.blockConfig
            const elapsedTime = timestamp - startTimeRef.current

            const minorPos = config.minor.pos
            const majorPos =
                config.major.pos + (elapsedTime * config.major.vel) / timeScale

            blockMover.current(minorPos, Math.max(majorPos, minorPos))

            if (majorPos <= minorPos) {
                // Once the major block touches the minor block, transition to the collision animation.
                // Also invoke the first collision.
                showCollisions(1, minorPos)
                startTimeRef.current = timestamp
                rafId.current = requestAnimationFrame(animateCollision)
            } else {
                rafId.current = requestAnimationFrame(animateFlyIn)
            }
        },
        [showCollisions, animateCollision],
    )

    /** Null-safe canceling of the current RAF. */
    function cancelAnimation() {
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current)
        }
    }

    const startSimulation = useCallback(() => {
        resetAnimation()
        // Set up the simulation.
        const massRatioNew = 100 ** (digits - 1)
        simConfig.current = getSimulationConfig(massRatioNew)
        setSimConfigState(simConfig.current)

        function handle(result: CollisionRecord[]) {
            // Run the simulation.
            collsRef.current = result
            startTimeRef.current = performance.now()
            // Initialize the animation loop.
            rafId.current = requestAnimationFrame(animateFlyIn)
        }
        runWorker(
            {
                blockConfig: simConfig.current.blockConfig,
                squashInterval: squashBaseInterval / timeScale,
            },
            handle,
        )
    }, [digits, animateFlyIn, resetAnimation])

    // Set up the worker for the collision calculation.
    useEffect(() => {
        const worker = new Worker(
            new URL("./collisions.worker.ts", import.meta.url),
            { type: "module" },
        )
        worker.onmessage = (event: MessageEvent<CollisionRecord[]>) => {
            const handler = workerHandler.current
            if (handler) handler(event.data)
        }

        workerRef.current = worker

        return () => {
            worker.terminate()
            workerRef.current = null
        }
    }, [])

    // Generic on-mount effects.
    useEffect(() => {
        // Start the simulation as soon as the page loads.
        startSimulation()
        return () => {
            // Cancel any active animation, even when started outside the initial run.
            cancelAnimation()
        }
        // Do not add the `startSimulation` dep,
        // we only want this effect to launch on mount, not be the primary trigger for starting the simulation.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <CounterBox
                ref={counterRef}
                isFinal={isFinal}
            />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "fit-content",
                    }}
                >
                    <NumberConfigure
                        title="Digits"
                        variant={"slider"}
                        min={1}
                        // We limit this at 8 as it's a nice number, and the next nice number (10) already takes extremely long to calculate.
                        max={8}
                        icon={<NumbersIcon sx={{ fontSize: 45 }} />}
                        tooltip={
                            <>
                                The number of digits of π to calculate. Each
                                additional digit increases the weight of the
                                larger block by a factor of 100 to give the
                                desired result.
                                <br />
                                <br />
                                Be aware that every extra digit equals an
                                increase by the factor 10 to the collision
                                count, resulting in heavy computation load for
                                high numbers.
                            </>
                        }
                        sliderValue={digits}
                        onSliderChange={setDigits}
                        precision={0}
                    />
                    <Button
                        variant={"contained"}
                        startIcon={<PlayArrow />}
                        size={"large"}
                        onClick={startSimulation}
                    >
                        Start
                    </Button>
                </Box>
                <CollisionBox
                    ref={collisionBoxRef}
                    makeSpark={makeSparkRef}
                    simConfig={simConfig}
                    blockMover={blockMover}
                    simConfigState={simConfigState}
                />
            </Box>
        </>
    )
}
