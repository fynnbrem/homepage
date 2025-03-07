import { Ball } from "@/app/lib/ball-movement/model";
import { Vector2 } from "math.gl";
import { v4 } from "uuid";
import { getRandomItem } from "@/app/lib/math";

/**A reduced representation of a `Ball`.
 * This only contains the values that can be configured,
 * and is used in parallel to the actual `Ball`.
 *
 * We use it in parallel so we can both have proper React states with the
 * `BallConfig` and still keep the simulation mutable with its `Ball`s.*/
export type BallConfig = {
    id: string
    color: string
    mass: number
    radius: number
    elasticity: number
}

/**Reduces a `Ball` to only the values supported by a `BallConfig`.*/
export function configFromBall(ball: Ball): BallConfig {
    return {
        id: ball.id,
        color: ball.color,
        mass: ball.mass,
        radius: ball.radius,
        elasticity: ball.elasticity,
    }
}

/**Creates a `Ball` by copying over all applicable values from the `BallConfig`.*/
export function getNewBall(config: BallConfig): Ball {
    return {
        pos: new Vector2(200, 200),
        vel: new Vector2(0, 0),
        path: [],
        ...config,
    }
}

/**Pre-defined parameter values to create a new random ball.*/
const randomParams = {
    radius: [5, 10, 15, 20, 25, 35, 45],
    mass: [25, 50, 100, 250, 500, 1000],
    elasticity: [0, 0.1, 0.2, 0.8, 0.9, 1],
    color: [
        // Reds
        "#912500",
        "#912500",
        "#ac1500",
        // Oranges
        "#b34500",
        "#cd4315",
        "#ed6503",
        "#dc7e2e",
        // Yellows
        "#e37e21",
        "#faa300",
        "#eda503",
        "#ffc341",
    ],
}

/**Generates a randomized `BallConfig`.
 * Possible values are listed in `randomParams`.*/
export function getRandomBall(): BallConfig {
    return {
        id: v4(),
        color: getRandomItem(randomParams.color),
        mass: getRandomItem(randomParams.mass),
        radius: getRandomItem(randomParams.radius),
        elasticity: getRandomItem(randomParams.elasticity),
    }
}
