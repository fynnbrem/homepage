import React from "react"
import { alpha, Box, Paper } from "@mui/material"
import { theme, zIndex } from "@/app/lib/theme"
import { GrowCounter, GrowCounterHandle } from "@/app/pi-collider/GrowCounter"

/**
 * A floating box with a counter that grows with the growth rate of its number.
 * It has a no layout height, but will visually overflow downwards as the counter grows.
 *
 * @param props.ref
 *  The handle to control the counter.
 *  `.increment` will increment the counter and grow it.
 *  `.update` will set the value without growth.
 */
export function CounterBox(props: {
    ref: React.RefObject<GrowCounterHandle>
    isFinal: boolean
}) {
    return (
        <Box
            sx={{
                position: "relative",
                height: 0,
                display: "flex",
                justifyContent: "center",
                overflow: "visible",
                width: "100%",
                zIndex: zIndex.counter,
                bottom: 128,
            }}
        >
            <Paper
                sx={{
                    background:
                        props.isFinal ? undefined : (
                            alpha(theme.palette.background.default, 0.6)
                        ),
                    borderRadius: 4,
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    overflow: "visible",
                    flexDirection: "column",
                    width: "fit-content",
                    height: "fit-content",
                    transition: theme.transitions.create(
                        ["box-shadow", "background-color"],
                        {
                            duration: theme.transitions.duration.standard,
                            easing: theme.transitions.easing.easeInOut,
                        },
                    ),
                }}
                elevation={props.isFinal ? 12 : 4}
            >
                {/*The text boxes are slimmed down to better visually connect.
                    The counter does this via reduced line height, the text box via the margin.*/}
                <GrowCounter
                    ref={props.ref}
                    baseFontSize={props.isFinal ? 72 : 48}
                />
                <Box sx={{ fontSize: "larger", marginBottom: -1 }}>
                    collisions
                </Box>
            </Paper>
        </Box>
    )
}
