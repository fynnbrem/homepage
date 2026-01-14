import { alpha, IconButton, Paper, Stack, Tooltip } from "@mui/material"
import NumberConfigure from "@/app/arena/world-configure/components/NumberConfigure"
import NumbersIcon from "@mui/icons-material/Numbers"
import { PlayArrow, Update } from "@mui/icons-material"
import { theme } from "@/app/lib/theme"
import React from "react"
import { WorldConfigure } from "@/app/arena/world-configure/WorldConfigure"

/**
 * The configuration component for the simulation.
 *
 * Contains:
 *  - Digit Slider
 *      for the amount of digits of Pi to generate.
 *  - Dynamic Time Scale Slider
 *      for the dynamic slowdown.
 *  - Start Button
 *      to start the simulation with the current config.
 */
export function Config(props: {
    digitState: [number, (v: number) => void]
    slowdownState: [number, (v: number) => void]
    onStart: () => void
}) {
    return (
        <Paper
            sx={{
                background: alpha(theme.palette.background.default, 0.6),
                borderRadius: 8,
                padding: 1,
                height: "100%",
                width: "fit-content",
                marginTop: 4,
                marginLeft: 4,
                marginBottom: 2,
                            }}
            elevation={4}
        >
            <ConfigContent {...props}/>
        </Paper>
    )
}

function ConfigContent(props: {
    digitState: [number, (v: number) => void]
    slowdownState: [number, (v: number) => void]
    onStart: () => void
}) {
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
        >
            <Stack
                direction={"column"}
                sx={{
                    alignItems: "center",
                    width: "fit-content",
                }}
            >
                {/*Digit Slider*/}
                <NumberConfigure
                    title="Digits"
                    variant={"slider"}
                    min={1}
                    // We limit this at 8 as it's a nice number, and the next nice number (10) already takes extremely long to calculate.
                    max={8}
                    icon={<NumbersIcon sx={{ fontSize: 45 }} />}
                    tooltip={
                        <>
                            The number of digits of π to calculate. Each
                            additional digit increases the weight of the larger
                            block by a factor of 100 to give the desired result.
                            <br />
                            <br />
                            Be aware that every extra digit equals an increase
                            by the factor 10 to the collision count, resulting
                            in heavy computation load for high numbers.
                        </>
                    }
                    sliderValue={props.digitState[0]}
                    onSliderChange={props.digitState[1]}
                    precision={0}
                />
                {/*Dynamic Time Slowdown Slider*/}
                <NumberConfigure
                    title="Dynamic Slowdown"
                    variant={"slider"}
                    min={0}
                    max={3}
                    icon={<Update sx={{ fontSize: 45 }} />}
                    tooltip={
                        <>
                            Dynamically slow down time as the collisions per
                            second increase, so you can see in more detail what
                            is happening.
                            <br />
                            <br />
                            This does not affect the result, but you will see
                            the blocks moving faster or slower than they
                            actually would.
                        </>
                    }
                    sliderValue={props.slowdownState[0]}
                    onSliderChange={props.slowdownState[1]}
                    precision={0}
                />
            </Stack>
            {/*Start Button*/}
            <Tooltip
                title={"Restart the simulation with the current configuration."}
            >
                <IconButton
                    size={"large"}
                    onClick={props.onStart}
                    sx={{
                        width: 96,
                        height: 96,
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        margin: 2,
                    }}
                    color={"secondary"}
                >
                    <PlayArrow fontSize={"large"} />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}
