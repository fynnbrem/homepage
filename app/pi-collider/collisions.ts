import { getCollisionVelocityDelta } from "@/app/lib/physics/collision"

/**A snapshot of the block states at the point of a collision.
 *
 * @prop time
 *  The absolute time of this collision.
 * @prop deltaTime
 *  The time elapsed since the last collision.
 * @prop minorVel
 *  The velocity of the minor block after the collision.
 * @prop majorVel
 *  The velocity of the major block after the collision.
 * */
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

export type BlockConfig = { minor: Mass; major: Mass }

export function simulateCollisions(config: BlockConfig): CollisionRecord[] {
    const minorMass = structuredClone(config.minor)
    const majorMass = structuredClone(config.major)

    const collisions: CollisionRecord[] = []
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
        collisions.push({
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
        collisions.push({
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
