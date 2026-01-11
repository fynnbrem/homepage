import { Ref, useImperativeHandle, useRef } from "react"
import { Box } from "@mui/material"
import { orange } from "@mui/material/colors"

export type BlockMover = (minor: number, major: number) => void

export function Blocks(props: {
    blockMover: Ref<BlockMover>
    minorLength: number
    majorLength: number
    minorMass: number
    majorMass: number
    padding: number
    distanceScale: number
}) {
    const minorBlockRef = useRef<HTMLDivElement>(null!)
    const majorBlockRef = useRef<HTMLDivElement>(null!)

    function setBlockPosition(minorPos: number, majorPos: number) {
        minorBlockRef.current.style.transform = `translateX(${minorPos * props.distanceScale}px)`
        majorBlockRef.current.style.transform = `translateX(${majorPos * props.distanceScale + props.minorLength}px)`
    }

    useImperativeHandle(props.blockMover, () => setBlockPosition)

    return (
        <Box
            sx={{
                position: "relative",
                height: Math.max(props.minorLength, props.majorLength),
                margin: `${props.padding}px`,
                fontFamily: '"Cambria Math", "Cambria", serif',
                fontVariantNumeric: "lining-nums tabular-nums",
                fontSize: 32,
                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Box
                ref={minorBlockRef}
                sx={{
                    width: props.minorLength,
                    height: props.minorLength,
                    position: "absolute",
                    bottom: 0,
                    transform: `translateX(0px)`,
                    background: orange[900],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.minorMass} kg
            </Box>
            <Box
                ref={majorBlockRef}
                sx={{
                    width: props.majorLength,
                    height: props.majorLength,
                    position: "absolute",
                    bottom: 0,
                    transform: `translateX(${props.minorLength}px)`,
                    background: orange[600],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.majorMass} kg
            </Box>
        </Box>
    )
}
