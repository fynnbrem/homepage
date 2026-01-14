import { getCollisionVelocityDelta } from "@/app/lib/physics/collision"
import { block } from "sharp"

/**A snapshot of the block states at the point of a collision.
 *
 * @prop squashes
 *  The count of collisions squashed into this single record.
 *  This includes the collision this record belongs to (it is always at least `1`).
 * @prop time
 *  The absolute time of this collision.
 * @prop deltaTime
 *  The time elapsed since the last collision.
 * @prop minorVel
 *  The velocity of the minor block after the collision.
 * @prop majorVel
 *  The velocity of the major block after the collision.
 * */
export type CollisionRecord = {
    squashes: number
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

export type BlockConfig = { minor: Mass; major: Mass }

/**
 * Transforms the `value` so that large numbers get compressed more than small numbers.
 * Uses power-law scaling. The `level` increases the compression for large numbers.
 */
function transform(value: number, level: number): number {
    // We want it so the first level is x^0.66, as not to have too extreme squashing right away.
    return value ** (2 / (2 + level))
}

/**
 * Simulate the collisions between two blocks, according to the `config`.
 * The major block is assumed to be to right of the minor block.
 * @param config
 *  The starting config of the blocks.
 * @param squashInterval
 *  The time interval in which collisions will be squashed into a single entry to save memory.
 *  A higher interval results in less memory but lower time resolution.
 *  The count of collisions squashed is registered in the record.
 * @param transformLevel
 *  When larger than 0, compresses large numbers for the time-axis down
 *  to reduce the difference between the largest and smallest numbers.
 *  The compression is evaluated on the time between collisions.
 */
export function simulateCollisions(
    config: BlockConfig,
    squashInterval: number,
    transformLevel: number,
): CollisionRecord[] {
    // The time of the latest squash.
    // Start with a negative number so the first collisions does not get squashed.
    let lastSquash = -squashInterval * 2
    let storedSquashes = 0
    const collisions: CollisionRecord[] = []

    // The linear scaler for the value scaling. 0 is an initial value, the actual value will be derived at runtime.
    let scaler: number = 0

    /**
     * Scales the `value` according to the `transform` and linear `scaler`
     * The first non-zero value will determine the `scaler`.
     * It is determined so that this value would be the same after transforming and applying the scaler.
     */
    function scaleValue(value: number): number {
        if (scaler == 0 && value != 0) {
            // Set the scaler to the first usable value.
            scaler = value / transform(value, transformLevel)
            return value
        }
        // Transform the values.
        // Note: The `scaler` is initially zero, but will be set as soon as we encounter a scalable non-zero value.
        return transform(value, transformLevel) * scaler
    }

    function push(record: Omit<CollisionRecord, "squashes">) {
        if (record.time > lastSquash + squashInterval) {
            collisions.push({ ...record, squashes: 1 + storedSquashes })
            lastSquash = record.time
            storedSquashes = 0
        } else {
            storedSquashes += 1
        }
    }
    const minorMass = structuredClone(config.minor)
    const majorMass = structuredClone(config.major)

    // While the animation shows the blocks moving in,
    // for the calculation we start when they initially collide.
    majorMass.pos = minorMass.pos
    let totalTime = 0

    while (true) {
        // First: Block-to-block collision.

        // Check if the minor mass is fast enough to catch up with the major mass.
        if (majorMass.vel >= minorMass.vel) break
        const relVel = majorMass.vel - minorMass.vel
        let blockDt = -(majorMass.pos - minorMass.pos) / relVel

        minorMass.pos = minorMass.pos + blockDt * minorMass.vel
        majorMass.pos = minorMass.pos

        blockDt = scaleValue(blockDt)
        totalTime += blockDt

        const [dMinorVel, dMajorVel] = getCollisionVelocityDelta(
            relVel,
            minorMass.mass,
            majorMass.mass,
        )
        minorMass.vel += dMinorVel
        majorMass.vel += dMajorVel
        push({
            time: totalTime,
            deltaTime: blockDt,
            minorVel: minorMass.vel,
            majorVel: majorMass.vel,
            minorPos: minorMass.pos,
            majorPos: majorMass.pos,
        })

        // Second: Block-to-wall collision.

        // Check if the minor mass moves towards the wall.
        if (minorMass.vel >= 0) break

        let wallDt = -minorMass.pos / minorMass.vel
        minorMass.pos = 0
        majorMass.pos = majorMass.pos + wallDt * majorMass.vel

        wallDt = scaleValue(wallDt)
        totalTime += wallDt

        minorMass.vel = -minorMass.vel
        push({
            time: totalTime,
            deltaTime: wallDt,
            minorVel: minorMass.vel,
            majorVel: majorMass.vel,
            minorPos: minorMass.pos,
            majorPos: majorMass.pos,
        })
    }
    return collisions
}
