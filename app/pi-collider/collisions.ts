import { getCollisionVelocityDelta } from "@/app/lib/physics/collision"

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
 * Simulate the collisions between two blocks, according to the `config`.
 * The major block is assumed to be to right of the minor block.
 * @param config
 *  The starting config of the blocks.
 * @param squashInterval
 *  The time interval in which collisions will be squashed into a single entry to save memory.
 *  A higher interval results in less memory but lower time resolution.
 *  The count of collisions squashed is registered in the record.
 */
export function simulateCollisions(
    config: BlockConfig,
    squashInterval: number,
): CollisionRecord[] {
    // The time of the latest squash.
    // Start with a negative number so the first collisions does not get squashed.
    let lastSquash = -squashInterval * 2
    let storedSquashes = 0
    const collisions: CollisionRecord[] = []

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
        const blockDt = -(majorMass.pos - minorMass.pos) / relVel

        minorMass.pos = minorMass.pos + blockDt * minorMass.vel
        majorMass.pos = minorMass.pos

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

        const wallDt = -minorMass.pos / minorMass.vel
        minorMass.pos = 0
        majorMass.pos = majorMass.pos + wallDt * majorMass.vel

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
    console.log("Size:", collisions.length)
    console.log(
        "Colls:",
        collisions.reduce((p, r) => p + r.squashes, 0),
    )
    return collisions
}
