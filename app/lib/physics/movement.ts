/**
 * Calculate the position of an accelerated object after a given time.
 */
export function calculatePosition(
    initialPos: number,
    velocity: number,
    acceleration: number,
    time: number,
) {
    return initialPos + (velocity * time + (1 / 2) * acceleration * time ** 2)
}

/**
 * Interpolate the position so that it moves linearly between the `starPos` and `endPos`
 *  in the timeframe defined between `startTime` and `endTime` and the time `currentTime`.
 */
export function interpolatePosition(
    startPos: number,
    endPos: number,
    startTime: number,
    endTime: number,
    currentTime: number,
): number {
    const relTime =  (currentTime - startTime) / (endTime - startTime)
    return startPos + (endPos - startPos) * relTime
}
