import { BlockConfig, simulateCollisions } from "@/app/pi-collider/collisions"

export type CollisionWorkerParams = {
    blockConfig: BlockConfig
    squashInterval: number
    transformLevel: number
}

self.onmessage = (event: MessageEvent<CollisionWorkerParams>) => {
    const result = simulateCollisions(
        event.data.blockConfig,
        event.data.squashInterval,
        event.data.transformLevel,
    )
    self.postMessage(result)
}
