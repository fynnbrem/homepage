import React, { useImperativeHandle, useState } from "react"
import { useInterval } from "usehooks-ts"
import { Box, Typography } from "@mui/material"

const flowDecay = 0.9
const noiseFloor = 0.05

export type GrowCounterHandle = {
    increment: (x: number) => void
    update: (x: number) => void
}

export function GrowCounter(props: {
    ref: React.Ref<GrowCounterHandle>
    baseFontSize: number
}) {
    const [flowRate, setFlowRate] = useState(0)
    const [value, setValue] = useState(0)

    /**Update the counter value to `x`. Does not update the flow rate.*/
    function update(x: number) {
        setValue(x)
    }

    /**Increment the counter value by `x`.*/
    function increment(x: number) {
        setValue((v) => v + x)
        // We only need growth for increments, nothing special happens for decrements.
        setFlowRate((v) => v + Math.max(x, 0))
    }

    useImperativeHandle(
        props.ref,
        () => ({
            increment: increment,
            update: update,
        }),
        [],
    )

    function dropFlowRate() {
        const newFlowRate = flowRate * flowDecay
        setFlowRate(Math.max(newFlowRate > noiseFloor ? newFlowRate : 0))
    }

    useInterval(() => dropFlowRate(), 50)

    // Scale the font according to the flow rate.
    // As we expect exponential magnitudes of growth, we ease it logarithmically
    // and also take it to the power of 0.8 to compensate extremely high numbers.
    const fontScale = (1 + Math.log2(flowRate * 8 + 2) / 8) ** 0.8

    return (
        <Box
            sx={{
                fontSize: props.baseFontSize * fontScale,
                lineHeight: 0.9,
                transition: "font-size 100ms ease-out",
            }}
        >
            {value}
        </Box>
    )
}
