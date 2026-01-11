import React from "react"
import { alpha, Box, Paper } from "@mui/material"
import { theme } from "@/app/lib/theme"
import { GrowCounter, GrowCounterHandle } from "@/app/pi-collider/GrowCounter"

/**
 * A floating box with a counter that grows with the growth rate of its number.
 * It has a fixed height, but will visually overflow downwards as the counter grows.
 * It also floats on z-index 999 to render above the content it counts for.
 *
 * @param props.ref
 *  A handle to increment the counter.
 */
export function CounterBox(props: {
    ref: React.RefObject<GrowCounterHandle>
    isFinal: boolean
}) {
    return (
        <Box
            sx={{
                position: "relative",
                height: 10,
                display: "flex",
                justifyContent: "center",
                overflow: "visible",
                padding: 8,
                width: "100%",
                zIndex: 999
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
                            easing: theme.transitions.easing.easeInOut
                        }
                    )
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