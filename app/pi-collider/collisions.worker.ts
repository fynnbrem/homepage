import {
    BlockConfig,
    CollisionRecord,
    simulateCollisions,
} from "@/app/pi-collider/collisions"
import { expose } from "comlink"

export type CollisionWorkerParams = {
    blockConfig: BlockConfig
    squashInterval: number
    transformLevel: number
}

export type CollisionApi = {
    calculate: (p: CollisionWorkerParams) => Promise<CollisionRecord[]>
}

// We use this function in `pi-collider/page` in the collision worker.
// noinspection JSUnusedGlobalSymbols
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
