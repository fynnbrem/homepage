import { Ref, useImperativeHandle, useMemo, useRef } from "react"
import { Box, darken, lighten } from "@mui/material"
import { orange } from "@mui/material/colors"
import styles from "./Cube.module.css"

export type BlockMover = (minor: number, major: number) => void

/**
 * A slight gradient derived from the `base` color that has light shining from the top-left.
 */
const materialGradient = (base: string) =>
    `linear-gradient(
    135deg,
    ${lighten(base, 0.1)} 0%,
    ${base} 50%,
    ${darken(base, 0.15)} 100%
    )`

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

    const colors = [orange[900], orange[600]]
    const backgrounds = useMemo(
        () => [materialGradient(colors[0]), materialGradient(colors[1])],
        [],
    )

    useImperativeHandle(props.blockMover, () => setBlockPosition)

    return (
        <Box
            sx={{
                position: "relative",
                height: Math.max(props.minorLength, props.majorLength),
                // We use px as unit so the position and canvas calculations stay straightforward.
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
                    ["--front" as any]: colors[0],
                    background: backgrounds[0],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                }}
                className={styles.cube}
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
                    ["--front" as any]: colors[1],
                    background: backgrounds[1],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                }}
                className={styles.cube}
            >
                {props.majorMass} kg
            </Box>
        </Box>
    )
}
