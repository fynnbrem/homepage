import { Directional, WorldConfigurationStatic } from "@/app/providers/ConfigurationProvider";
import { getRotatedVector } from "@/app/lib/math";
import { Vector2 } from "math.gl";
import { Ball, VoidBall } from "@/app/lib/ball-movement/model";

/**Moves the balls by applying all active forces to it (global gravity, inter-ball gravity, collision)
 * and moving them by their resulting velocity.
 *
 * @param balls
 *  The balls to be moved.
 * @param config
 *  The configuration for the various forces.
 * @param arenaDim
 *  The dimensions of the arena.
 * @param mouseBall
 *  The mouse (pointer) ball. If undefined, no force will be applied from it.*/
export function moveBalls(
    balls: Ball[],
    config: WorldConfigurationStatic,
    arenaDim: Vector2,
    mouseBall?: VoidBall,
): void {
    // Apply global gravity.
    balls.forEach((b) => applyGlobalGravity(b, config.worldGravity))
    // Apply gravity between the balls.
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < i; j++) {
            // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
            applyBallGravity(balls[i], balls[j], config.gravityScaling)
        }
    }
    // Apply mouse ball gravity.
    if (mouseBall) {
        balls.forEach((b) =>
            applyVoidBallGravity(b, mouseBall, config.gravityScaling),
        )
    }
    if (config.collision) {
        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < i; j++) {
                const overlap = getBallOverlap(balls[i], balls[j])
                // Limit the iterations to `i - 1` as to only include unique and unequal pairs.
                if (overlap > 0) {
                    collideBalls(balls[i], balls[j], overlap)
                }
            }
        }
    }
    // Apply the generated forces to the velocity and move the balls.
    balls.forEach((b) =>
        moveInBox(b, [0, arenaDim.x, 0, arenaDim.y], config.wallElasticity),
    )
}

/** Moves the ball within the `box` so that it does not go above its boundaries.
 *  The movement is generated from the ball's `.vel`.
 * @param ball
 *  The ball to move.
 * @param box
 *  The box in which the ball is constrained.
 *  Must be the following coordinates: `[leftX, rightX, topY, bottomY]`
 * @param elasticity
 *  The wall elasticity.
 *  */
function moveInBox(
    ball: Ball,
    box: [number, number, number, number],
    elasticity: number,
): void {
    const [left, right, top, bottom] = box

    const vel = ball.vel
    const pos = ball.pos
    const radius = ball.radius
    const restitution = combineRestitutionCoefficients(
        ball.elasticity,
        elasticity,
    )

    const targetPos = pos.clone().add(vel)

    if (targetPos.x - radius < left) {
        // Clamp left.
        ball.pos.x = left + radius
        ball.vel.x = -ball.vel.x * restitution
    } else if (targetPos.x + radius > right) {
        // Clamp right.
        ball.pos.x = right - radius
        ball.vel.x = -ball.vel.x * restitution
    } else {
        ball.pos.x = targetPos.x
    }
    if (targetPos.y - radius < top) {
        // Clamp top.
        ball.pos.y = top + radius
        ball.vel.y = -ball.vel.y * restitution
    } else if (targetPos.y + radius > bottom) {
        // Clamp bottom.
        ball.pos.y = bottom - radius
        ball.vel.y = -ball.vel.y * restitution
    } else {
        ball.pos.y = targetPos.y
    }
}

/** Modifies the velocity of both balls in accordance to the force generated between them.*/
function applyBallGravity(ball1: Ball, ball2: Ball, distanceExp: number): void {
    const force = getForce(ball1, ball2, distanceExp)
    const acc1 = force.clone().scale(1 / ball1.mass)
    ball1.vel.add(acc1)

    const acc2 = force.scale(1 / ball2.mass).negate()
    ball2.vel.add(acc2)
}

/** Modifies the velocity of the `ball` in accordance to the force generated between it and the `voidBall`.*/
function applyVoidBallGravity(
    ball: Ball,
    voidBall: VoidBall,
    distanceExp: number,
): void {
    const force = getForce(ball, voidBall, distanceExp)
    const acc1 = force.scale(1 / ball.mass)
    ball.vel.add(acc1)
}

/**Modifies the velocity of the ball in accordance with the global gravity.*/
function applyGlobalGravity(ball: Ball, gravity: Directional) {
    const force = getRotatedVector(gravity.angle, gravity.magnitude)

    ball.vel.add(force.scale(1 / ball.mass))
}

/** Return the gravitational force between the two balls, determined by their distance and mass.
 *  The vector points from `ball1` to `ball2`.*/
function getForce(
    ball1: VoidBall,
    ball2: VoidBall,
    distanceExp: number,
): Vector2 {
    let distance = ball1.pos.distance(ball2.pos)
    let forceScale: number

    if (distance !== 0) {
        distance = Math.max(10, distance)
        // Clamp the distance to a minimum of 5 to prevent excessive acceleration
        // (Happens when colliding with the mouse at it has no radius).
        forceScale = (ball1.mass * ball2.mass) / distance ** (1 + distanceExp)
        // `1 + exponent` because we also include the `1/distance` required to normalize the force vector in below.
    } else {
        forceScale = 0
    }
    return ball2.pos.clone().subtract(ball1.pos).scale(forceScale)
}

/**Simulates a collision between two overlapping balls.
 * The balls will have their velocity changed according to the collision and their positions changed to remove the overlap.
 *
 * @param ball1
 *  The first ball.
 * @param ball2
 *  The second ball.
 * @param overlap
 *  The overlap between the balls. This must be a positive number.*/
function collideBalls(ball1: Ball, ball2: Ball, overlap: number) {
    const collisionNorm = ball2.pos.clone().subtract(ball1.pos).normalize()
    const relativeVel = ball2.vel.clone().subtract(ball1.vel)
    const collisionVel = collisionNorm.clone().dot(relativeVel)

    // If the velocity is negative,
    // the balls are moving away from one another so we can skip the collision.
    if (collisionVel > 0) return

    // Calculate the total collision impulse.
    // Note that this is not strictly the physical impulse as we do not scale it with the mass-product of both balls.
    // This is so we don't have to divide them out again later down the line.
    const restitution = combineRestitutionCoefficients(
        ball1.elasticity,
        ball2.elasticity,
    )
    const impulse =
        ((1 + restitution) * collisionVel) / (ball1.mass + ball2.mass)
    // Apply the impulse.
    // Note that due to the special definition of the impulse,
    // we do not divide-out the balls mass but rather multiply-in the other balls mass.
    ball1.vel.add(collisionNorm.clone().scale(impulse * ball2.mass))
    ball2.vel.subtract(collisionNorm.clone().scale(impulse * ball1.mass))
    // Move the balls out of the overlap.
    // The balls will be moved anti-proportionally to their mass.
    const separation = overlap / (ball1.mass + ball2.mass)
    ball1.pos.subtract(collisionNorm.clone().scale(ball2.mass * separation))
    ball2.pos.add(collisionNorm.clone().scale(ball1.mass * separation))
}

/**Returns the overlap of the balls.
 * This is a positive value if they overlap and negative otherwise.**/
function getBallOverlap(ball1: Ball, ball2: Ball): number {
    const totalDistance = ball1.pos.distance(ball2.pos)
    return ball1.radius + ball2.radius - totalDistance
}

/**Returns the combined coefficient of restitution (COR) for a collision with the coefficients `cor1` and `cor2`.
 * The proper way to calculate is up to debate as the actual
 * value is a property for the interaction between two bodies, and not an intrinsic value of a single body.
 * We calculate the product of the coefficients to approximate it.*/
function combineRestitutionCoefficients(cor1: number, cor2: number): number {
    return cor1 * cor2
}
