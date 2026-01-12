import {
    BlockConfig,
    CollisionRecord,
    simulateCollisions,
} from "@/app/pi-collider/collisions"

export type CollisionWorkerParams = {
    blockConfig: BlockConfig
    squashInterval: number
}


self.onmessage = (event: MessageEvent<CollisionWorkerParams>) => {
    const result = simulateCollisions(event.data.blockConfig, event.data.squashInterval)
    self.postMessage(result)
}
