import { Vector2 } from "math.gl"

export type VoidBall = {
    pos: Vector2
    mass: number
}
export type Ball = VoidBall & {
    vel: Vector2
    radius: number
    elasticity: number
    color: string
    path: Vector2[]
}

function cloneBall(b: Ball) {
    return {
        pos: b.pos.clone(),
        mass: b.mass,
        vel: b.vel.clone(),
        radius: b.radius,
        elasticity: b.elasticity,
        color: b.color,
        path: b.path.map((v) => v.clone()),
    }
}

export function cloneBalls(balls: Ball[]) {
    return balls.map((b) => cloneBall(b))
}

export function updateBallPath(balls: Ball[], maxHistory: number = 30) {
    balls.forEach((b) => {
        b.path.unshift(b.pos.clone())
        b.path = b.path.slice(0, maxHistory)
    })
}
