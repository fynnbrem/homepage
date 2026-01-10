"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { alpha, Box, Paper, Typography } from "@mui/material"
import BurstCanvas from "@/app/pi-collider/BurstCanvas"
import { randomInt } from "@/app/lib/math"
import { BlockConfig, simulateCollisions } from "@/app/pi-collider/collisions"
import { BlockMover, Blocks } from "@/app/pi-collider/Blocks"
import { GrowCounter } from "@/app/pi-collider/GrowCounter"
import { theme } from "@/app/lib/theme"

const timeScale = 100
const distanceScale = 30

const massRatio = 10000000000
const minorLength = 80
const sizeRatio = (1 + Math.log(massRatio) / Math.log(100)) ** 0.8
// ↑ The visual size ratio between the blocks.
// We assume mass ratios growing according to `100^n` due to how it affects the generated digits.
// So we normalize the size to this scale and add an exponent of `0.8` to smooth out extreme numbers.
const majorLength = minorLength * sizeRatio

const blockConfig: BlockConfig = {
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
}

const sparkBurstLimit = 12
// ↑ The limit of spark burst animations that can trigger in a single frame.
// 12 seems to be a number that makes the animation not too dense while still
// making high collision densities satisfying to watch.

const flyOutTime = 60 * 1000
// ↑ The time [ms] that the blocks will fly out after their final collision.
// Sufficient to push them far beyond the viewport.

const sparkYRange = [
    majorLength - minorLength * 0.9,
    majorLength - minorLength * 0.1,
]
// ↑ The coordinate range that sparks can spawn on the y-axis.
// This is the shared area between the minor and major block, minus 10% padding
// as they look weird when spawning on the corners.

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

/**
 * A floating box with a counter that grows with the growth rate of its number.
 * It has a fixed height, but will visually overflow downwards as the counter grows.
 * It also floats on z-index 999 to render above the content it counts for.
 *
 * @param props.ref
 *  A handle to increment the counter.
 */
function CounterBox(props: { ref: React.RefObject<(x: number) => void> }) {
    return (
        <Box
            sx={{
                position: "relative",
                height: 10,
                display: "flex",
                justifyContent: "center",
                overflow: "visible",
                padding: 8,
                width: "100%",
                zIndex: 999,
            }}
        >
            <Paper
                sx={{
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 4,
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    overflow: "visible",
                    flexDirection: "column",
                    width: "fit-content",
                    height: "fit-content",
                }}
                elevation={4}
            >
                {/*The text boxes are slimmed down to better visually connect.
                    The counter does this via reduced line height, the text box via the margin.*/}
                <GrowCounter ref={props.ref} />
                <Box sx={{ fontSize: "larger", marginBottom: -1 }}>
                    collisions
                </Box>
            </Paper>
        </Box>
    )
}

export default function PiCollider() {
    const blockMover = useRef<BlockMover>(null!)
    const makeSparkRef = useRef<(x: number, y: number) => void>(null!)
    const counterRef = useRef<(x: number) => void>(null!)

    // The index the collision animation currently is at.
    // We start at `1` as this is sets the upcoming collision, not the latest.
    const collAnimationIndex = useRef(1)
    const padding = 80

    /**Create a spark burst for the blocks.
     * The final position is inferred entirely from the position of the minor blocks position `minorPos`.*/
    const makeSpark = useCallback((minorPos: number) => {
        // Determine the actual position of the spark.
        // Depending on whether this is a wall collision (the minor block is at position `0`)
        // or block collision, it must be shifted to appear at the corresponding side.
        let sparkPos: number
        if (minorPos == 0) {
            sparkPos = padding
        } else {
            sparkPos = minorPos * distanceScale + padding + minorLength
        }

        makeSparkRef.current(
            sparkPos,
            randomInt(sparkYRange[0], sparkYRange[1]) + padding,
        )
    }, [])

    const rafId = useRef<number | null>(null)
    useEffect(() => {
        const colls = simulateCollisions(blockConfig)

        let startTime = performance.now()

        /**Animate the blocks flying in. Transitions to `animateCollisions` when done.*/
        function animateFlyIn(timestamp: number) {
            const elapsedTime = timestamp - startTime

            const minorPos = blockConfig.minor.pos
            const majorPos =
                blockConfig.major.pos +
                (elapsedTime * blockConfig.major.vel) / timeScale

            blockMover.current(minorPos, Math.max(majorPos, minorPos))

            if (majorPos <= minorPos) {
                // Once the major block touches the minor block, transition to the collision animation.
                // Also invoke the first collision.
                makeSpark(minorPos)
                counterRef.current(1)
                startTime = timestamp
                rafId.current = requestAnimationFrame(animateCollision)
            } else {
                rafId.current = requestAnimationFrame(animateFlyIn)
            }
        }

        /**Animate the blocks flying out. Assumes the last animation finished on the final position.*/
        function animateFlyOut(timestamp: number) {
            const finalColl = colls[colls.length - 1]
            const elapsedTime =
                timestamp - startTime - finalColl.time * timeScale

            const minorPos =
                (finalColl.minorVel * elapsedTime) / timeScale +
                finalColl.minorPos
            const majorPos =
                (finalColl.majorVel * elapsedTime) / timeScale +
                finalColl.majorPos

            blockMover.current(minorPos, majorPos)
            if (elapsedTime < flyOutTime) {
                rafId.current = requestAnimationFrame(animateFlyOut)
            }
        }

        /**Animate the blocks colliding. Transitions to `animateFlyOut` when done.*/
        function animateCollision(timestamp: number) {
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

            // Now we play the spark animations based on the collisions that happened in this frame.
            // They are capped at `sparkBurstLimit` per frame.

            const passedColls = index - initialIndex
            for (let i = 0; i < Math.min(passedColls, sparkBurstLimit); i++) {
                // We take the position of the last collision as position of the sparks,
                // this is usually accurate enough as when stacking happens, the collisions are also very close by.
                makeSpark(colls[lastIndex].minorPos)
            }

            // Update the collision count.
            // That count is exactly at `index` and not `index + 1` because the index points at the collision that
            // will happen next in the future.
            counterRef.current(passedColls)

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

            if (
                index == colls.length - 1 &&
                elapsedTime > colls[index].time * timeScale
            ) {
                // Once we are at the last index and the time has reached the point of that last collision,
                // we must invoke that last collision here.
                makeSpark(colls[index].minorPos)
                counterRef.current(1)
                // Transition to fly-out.
                rafId.current = requestAnimationFrame(animateFlyOut)
            } else {
                rafId.current = requestAnimationFrame(animateCollision)
            }
        }

        rafId.current = requestAnimationFrame(animateFlyIn)

        return () => {
            rafId.current && cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <>
            <CounterBox ref={counterRef} />
            <Box sx={{ position: "relative" }}>
                {/*Make the burst canvas overlay the boxes.*/}
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
                    distanceScale={distanceScale}
                />
            </Box>
        </>
    )
}
