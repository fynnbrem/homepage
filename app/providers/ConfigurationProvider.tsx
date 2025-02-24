import React, { createContext, useContext, useState } from "react"
import { State } from "@/app/lib/lib"

export type Directional = {
    magnitude: number
    angle: number
}

type WorldConfiguration = {
    pointerGravity: State<number>
    trailLength: State<number>
    gravityScaling: State<number>
    wallElasticity: State<number>
    worldGravity: State<Directional>
    collision: State<boolean>
}

export type WorldConfigurationStatic = {
    pointerGravity: number
    trailLength: number
    gravityScaling: number
    wallElasticity: number
    worldGravity: Directional
    collision: boolean
}

const ConfigurationContext = createContext<WorldConfiguration>(null!)

export const useConfiguration = () => useContext(ConfigurationContext)

export function getStaticConfiguration(
    config: WorldConfiguration,
): WorldConfigurationStatic {
    const entries = Object.entries(config).map(([k, v]) => [k, v[0]])
    return Object.fromEntries(entries)
}

export default function ConfigurationProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const worldConfiguration: WorldConfiguration = {
        pointerGravity: useState(1500),
        trailLength: useState(30),
        gravityScaling: useState(1.7),
        wallElasticity: useState(0.9),
        worldGravity: useState({
            magnitude: 0,
            angle: Math.PI,
        }),
        collision: useState(true),
    }

    return (
        <ConfigurationContext.Provider value={worldConfiguration}>
            {children}
        </ConfigurationContext.Provider>
    )
}
