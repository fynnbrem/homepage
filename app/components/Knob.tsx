import { Box, Button } from "@mui/material";
import React, { useRef } from "react";
import { Vector2 } from "math.gl";
import { NavigationRounded } from "@mui/icons-material";
import { palette } from "@/app/lib/theme";
import { useEventListener } from "usehooks-ts";
import { getRotatedVector } from "@/app/lib/math";

/**Calculates the clockwise angle [rad] that the `vector` has to the positive y-axis.*/
function getClockWiseAngle(vector: Vector2): number {
    return -vector.verticalAngle() + Math.PI
}

export default function Knob({
    value,
    onChange,
}: {
    value: number
    onChange: (v: number) => void
}) {
    const dim = new Vector2(50, 50)

    const distance = 18
    const center = dim.clone().scale(1 / 2)

    const pos = getRotatedVector(value, distance).add(center)

    const isTracking = useRef(false)
    const trackingElem = useRef<HTMLButtonElement>(null!)

    function handleMove(x: number, y: number) {
        const boundingRect = trackingElem.current.getBoundingClientRect()
        // Get position relative to the element.
        const pos = new Vector2(x - boundingRect.left, y - boundingRect.top)
        // Check if the position is at the center, as we cannot calculate an angle from that.
        if (pos.equals(center)) return
        // Get position relative to center.
        pos.subtract(center)
            // Scale the vector to the distance.
            .normalize()
            .scale(distance)
        onChange(getClockWiseAngle(pos))
    }

    useEventListener("pointerup", () => {
        isTracking.current = false
    })
    useEventListener("pointermove", handleMouseMove)

    function handleMouseMove(e: MouseEvent) {
        if (isTracking.current) {
            handleMove(e.clientX, e.clientY)
        }
    }

    function handlePointerDown(e: React.MouseEvent<HTMLButtonElement>) {
        isTracking.current = true
        handleMove(e.clientX, e.clientY)
    }

    const shadowFilter = "drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))"

    return (
        <Box sx={{ position: "relative", marginX: 0, marginY: 0 }}>
            <Button
                centerRipple
                color={"secondary"}
                variant={"contained"}
                sx={{
                    borderRadius: "50%",
                    width: dim.x,
                    height: dim.y,
                    minWidth: 0,
                    touchAction: "none",
                }}
                onPointerDown={handlePointerDown}
                ref={trackingElem}
            />
            <Box sx={{ pointerEvents: "none" }}>
                <NavigationRounded
                    sx={{
                        fontSize: 30,
                        position: "absolute",
                        left: pos.x,
                        top: pos.y,
                        transform: `rotate(${value}rad)`,
                        translate: "-50% -50%",
                        color: palette.primary.dark,
                        filter: shadowFilter,
                    }}
                />
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        position: "absolute",
                        left: center.x,
                        top: center.y,
                        translate: "-50% -50%",
                        background: palette.primary.dark,
                        filter: shadowFilter,
                    }}
                />
            </Box>
        </Box>
    )
}
