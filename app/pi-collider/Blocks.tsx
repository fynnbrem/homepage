import { Ref, useImperativeHandle, useMemo, useRef } from "react"
import { alpha, Box, darken, lighten } from "@mui/material"
import { orange } from "@mui/material/colors"
import styles from "./Cube.module.css"
import { theme } from "@/app/lib/theme"

export type BlockMover = (minor: number, major: number) => void

export type BlockProps = {
    minorLength: number
    majorLength: number
    minorInitPos: number
    majorInitPos: number
    minorMass: number
    majorMass: number
}

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

/**
 * A single block. Has side faces to look 3D and contains its `mass` as text.
 */
function Block(props: {
    ref: React.RefObject<HTMLDivElement>
    length: number
    mass: number
    initialPos: number
    baseColor: string
    background: string
}) {
    return (
        <Box
            ref={props.ref}
            sx={{
                width: props.length,
                height: props.length,
                position: "absolute",
                bottom: 0,
                transform: `translateX(${props.initialPos}px)`,
                ["--front"]: props.baseColor,
                background: props.background,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            }}
            // Apply the escaping side faces.
            className={styles.cube}
        >
            {props.mass} kg
        </Box>
    )
}

export function Blocks(props: {
    blockMover: Ref<BlockMover>
    blockProps: BlockProps
    padding: number
    distanceScale: number
}) {
    const minorBlockRef = useRef<HTMLDivElement>(null!)
    const majorBlockRef = useRef<HTMLDivElement>(null!)
    const bp = props.blockProps

    function setBlockPosition(minorPos: number, majorPos: number) {
        minorBlockRef.current.style.transform = `translateX(${minorPos * props.distanceScale}px)`
        majorBlockRef.current.style.transform = `translateX(${majorPos * props.distanceScale + bp.minorLength}px)`
    }

    const colors = useMemo(() => {
        const base = [orange[900], orange[600]]
        return {
            minor: [base[0], materialGradient(base[0])],
            major: [base[1], materialGradient(base[1])],
        }
    }, [])

    useImperativeHandle(props.blockMover, () => setBlockPosition)

    return (
        <Box
            sx={{
                position: "relative",
                height: Math.max(bp.minorLength, bp.majorLength),
                // We use px as unit so the position and canvas calculations stay straightforward.
                margin: `${props.padding}px`,
                marginRight: 0,
                fontFamily: '"Cambria Math", "Cambria", serif',
                fontSize: 32,
                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Box
                sx={{
                    background: alpha(theme.palette.background.default, 0.6),
                    transform: "skewX(-55deg)",
                    transformOrigin: "left bottom",
                    width: "100%",
                    height: 18,
                    position: "absolute",
                    top: bp.majorLength - 18,
                    boxShadow: `0 16px 16px ${theme.palette.background.default}`,
                }}
            />
            <Box
                sx={{
                    background: alpha(theme.palette.background.default, 0.8),
                    transform: "skewY(-35deg)",
                    transformOrigin: "left bottom",
                    bottom: 0,
                    width: 26,
                    height: bp.minorLength * 1.5,
                    position: "absolute",
                    boxShadow: `-16px 0 16px ${theme.palette.background.default}`,
                }}
            />

            <Block
                ref={minorBlockRef}
                length={bp.minorLength}
                mass={bp.minorMass}
                initialPos={bp.minorInitPos * props.distanceScale}
                baseColor={colors.minor[0]}
                background={colors.minor[1]}
            />

            <Block
                ref={majorBlockRef}
                length={bp.majorLength}
                mass={bp.majorMass}
                initialPos={
                    bp.majorInitPos * props.distanceScale + bp.minorLength
                }
                baseColor={colors.major[0]}
                background={colors.major[1]}
            />
        </Box>
    )
}
