"use client"
import dynamic from "next/dynamic"

const Background = dynamic(() => import("@/app/assets/Background"), {
    ssr: false,
})

/**A wrapper that dynamically imports the background so it can be used in server side components.*/
export default function DynamicBackground({ color }: { color: string }) {
    return <Background color={color} />
}
