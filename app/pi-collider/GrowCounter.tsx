import React, { useImperativeHandle, useState } from "react"
import { useInterval } from "usehooks-ts"
import { Box, Typography } from "@mui/material"

const flowDecay = 0.9
const noiseFloor = 0.05

export function GrowCounter(props: { ref: React.Ref<(x: number) => void> }) {
    const [flowRate, setFlowRate] = useState(0)
    const [value, setValue] = useState(0)

    /**Increment the counter value by `x`.*/
    function increment(x: number) {
        setValue((v) => v + x)
        // We only need growth for increments, nothing special happens for decrements.
        setFlowRate((v) => v + Math.max(x, 0))
    }

    useImperativeHandle(props.ref, () => increment, [])

    function dropFlowRate() {
        const newFlowRate = flowRate * flowDecay
        setFlowRate(Math.max(newFlowRate > noiseFloor ? newFlowRate : 0))
    }

    useInterval(() => dropFlowRate(), 50)

    const fontScale = 1 + Math.log(flowRate + 2) / 5

    return (
        <Box
            sx={{
                fontSize: 48 * fontScale,
                lineHeight: 0.9
            }}
        >
            {value}
        </Box>
    )
}
