"use client"

import React, { useEffect, useImperativeHandle, useMemo, useRef } from "react"
import { randomFloat, randomInt } from "@/app/lib/math"

type Particle = {
    direction: [number, number]
    speed: number
    length: number
}

type Burst = {
    origin: [number, number]
    particles: Particle[]
    createdAt: number
}

type BurstConfig = {
    speedRange: [number, number]
    countRange: [number, number]
    lengthRange: [number, number]
    lineWidth: number
    duration: number
}

function createBurst(
    config: BurstConfig,
    now: number,
    origin: [number, number],
): Burst {
    const particles: Particle[] = []
    const count = randomInt(config.countRange[0], config.countRange[1] + 1)
    for (let i = 0; i < count; i++) {
        particles.push(createParticle(config))
    }
    return {
        origin: origin,
        createdAt: now,
        particles: particles,
    }
}

function createParticle(config: BurstConfig): Particle {
    const angle = randomFloat(0, Math.PI * 2)
    return {
        direction: [Math.cos(angle), Math.sin(angle)],
        speed: randomFloat(config.speedRange[0], config.speedRange[1]),
        length: randomFloat(config.lengthRange[0], config.lengthRange[1]),
    }
}

function stepAndDraw(
    ctx: CanvasRenderingContext2D,
    bursts: Burst[],
    now: number,
    config: BurstConfig,
) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.lineCap = "round"
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = config.lineWidth

    for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i]
        const age = now - burst.createdAt

        if (age > config.duration) {
            bursts.splice(i, 1)
            continue
        }

        const ageSeconds = age / 1000
        const ageNorm = age / config.duration
        for (const particle of burst.particles) {
            const head = [
                burst.origin[0] +
                    particle.speed * particle.direction[0] * ageSeconds,
                burst.origin[1] +
                    particle.speed * particle.direction[1] * ageSeconds,
            ]
            const tail = [
                head[0] - particle.direction[0] * particle.length,
                head[1] - particle.direction[1] * particle.length,
            ]

            ctx.globalAlpha = 1 - ageNorm

            ctx.beginPath()
            ctx.moveTo(tail[0], tail[1])
            ctx.lineTo(head[0], head[1])
            ctx.stroke()
        }
    }
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): { dpr: number } {
    const dpr: number = Math.max(1, window.devicePixelRatio || 1)
    const rect: DOMRect = canvas.getBoundingClientRect()

    const width: number = Math.floor(rect.width * dpr)
    const height: number = Math.floor(rect.height * dpr)

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
    }

    return { dpr }
}

const config: BurstConfig = {
    countRange: [4, 8],
    speedRange: [100, 150],
    lengthRange: [6, 12],
    lineWidth: 1.2,
    duration: 500,
}

export default function BurstCanvas(props: {
    style?: React.CSSProperties
    ref: React.Ref<(x: number, y: number) => void>
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const bursts: Burst[] = useMemo(() => [], [])

    useEffect(function onMount() {
        if (!canvasRef.current) return
        const canvas: HTMLCanvasElement = canvasRef.current

        const ctxOrNull: CanvasRenderingContext2D | null =
            canvas.getContext("2d")
        if (!ctxOrNull) return
        const ctx = ctxOrNull

        function animate(now: number): void {
            const { dpr } = resizeCanvasToDisplaySize(canvas)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            stepAndDraw(ctx, bursts, now, config)
            requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [])

    useImperativeHandle(
        props.ref,
        () =>
            function createBursHandle(x: number, y: number) {
                bursts.push(createBurst(config, performance.now(), [x, y]))
            },
        [bursts],
    )

    return (
        <canvas
            ref={canvasRef}
            style={props.style}
        />
    )
}
