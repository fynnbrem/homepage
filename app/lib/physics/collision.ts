/**Calculates the velocity change for two bodies after a collision.
 *
 * @param relVel
 *  The relative velocity between the bodies (`v2 - v1`).
 * @param mass1
 *  The mass of the first body.
 * @param mass2
 *  The mass of the second body
 * @param restitution
 *  The restitution coefficient between the bodies.*/
export function getCollisionVelocityDelta(
    relVel: number,
    mass1: number,
    mass2: number,
    restitution = 1,
) {
    // Calculate the total collision impulse.
    // Note that this is not strictly the physical impulse as we do not scale it with the mass-product of both balls.
    // This is so we don't have to divide them out again down the line.
    const impulse = ((1 + restitution) * relVel) / (mass1 + mass2)

    return [impulse * mass2, -impulse * mass1]
}
