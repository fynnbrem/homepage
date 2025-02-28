import { alpha, Box, Paper, Stack } from "@mui/material"
import Arena from "@/app/arena/Arena"
import { WorldConfigure } from "@/app/arena/components/WorldConfigure"
import React from "react"
import { theme } from "@/app/lib/theme"

const elevation = 4
/**The box for the arena.
 * Contains visual elements, the arena and its configuration components.*/
export default function ArenaBox() {
    return (
        <Stack alignItems={"center"}>
            <Paper
                sx={{
                    m: 10,
                    p: 2,
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 2,
                }}
                elevation={10}
            >
                <Stack
                    direction={"row"}
                    spacing={5}
                >
                    <Arena />
                    <Box sx={{ paddingY: 4 }}>
                        <Paper
                            sx={{
                                background: alpha(
                                    theme.palette.background.default,
                                    0.6,
                                ),
                                borderRadius: 8,
                                padding: 1,
                                height: "100%",
                            }}
                            elevation={elevation}
                        >
                            <WorldConfigure />
                        </Paper>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    )
}
