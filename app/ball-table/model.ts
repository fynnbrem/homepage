import { Ball } from "@/app/lib/ball-movement/model"
import { Vector2 } from "math.gl";

export type BallConfig = {
    id: string
    color: string
    mass: number
    radius: number
    elasticity: number
}

export function configFromBall(ball: Ball): BallConfig {
    return {
        id: ball.id,
        color: ball.color,
        mass: ball.mass,
        radius: ball.radius,
        elasticity: ball.elasticity,
    }
}

function applyConfig(config: BallConfig, ball: Ball): void {
    ball.color = config.color
    ball.mass = config.mass
    ball.radius = config.radius
    ball.elasticity = config.elasticity
}

export function getNewBall(config: BallConfig): Ball {
    return {
        pos: new Vector2(200, 200),
        vel: new Vector2(0, 0),
        path: [],
        ...config,
    }
}

