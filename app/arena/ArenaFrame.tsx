import { alpha, Box, Paper, Stack } from "@mui/material"
import { WorldConfigure } from "@/app/arena/components/WorldConfigure"
import React from "react"
import { spacing, theme } from "@/app/lib/theme"
import BallTable from "@/app/ball-table/BallTable"
import { Updater, useImmer } from "use-immer";
import { BallConfig, configFromBall } from "@/app/ball-table/model";
import Arena, { globalBalls } from "@/app/arena/Arena";

const elevation = 4

function WorldConfigurePaper() {
    return (
        <Box
            sx={{
                paddingY: 4,
            }}
        >
            <Paper
                sx={{
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 8,
                    padding: 1,
                    height: "100%",
                }}
                elevation={elevation}
            >
                <WorldConfigure />
            </Paper>
        </Box>
    )
}

function BallTablePaper() {
    return (
        <Box sx={{ paddingY: 4 }}>
            <Paper
                sx={{
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 8,
                    padding: 1,
                    height: "100%",
                }}
                elevation={elevation}
            >
                <BallTable />
            </Paper>
        </Box>
    )
}

const padding = 2
/**The frame for the arena.
 * Contains visual elements, the arena and its configuration components.*/
export default function ArenaFrame() {

    return (
        <Stack alignItems={"center"}>
            <Paper
                sx={{
                    m: 10,
                    p: padding,
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 2,
                    height: 700 + padding * spacing * 2,
                }}
                elevation={10}
            >
                <Stack
                    direction={"row"}
                    spacing={5}
                    height={"100%"}
                >
                    <WorldConfigurePaper />
                    <Arena />
                    <BallTablePaper/>
                </Stack>
            </Paper>
        </Stack>
    )
}
