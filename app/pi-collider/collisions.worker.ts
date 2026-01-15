import {
    BlockConfig,
    CollisionRecord,
    simulateCollisions,
} from "@/app/pi-collider/collisions"

export type CollisionWorkerParams = {
    blockConfig: BlockConfig
    squashInterval: number
    transformLevel: number
}

export type CollisionApi = {
    calculate: (p: CollisionWorkerParams) => Promise<CollisionRecord[]>
}

import { expose } from "comlink"

const api = {
    calculate(params: CollisionWorkerParams): CollisionRecord[] {
        return simulateCollisions(
            params.blockConfig,
            params.squashInterval,
            params.transformLevel,
        )
    },
}

expose(api)
