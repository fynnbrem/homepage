import {
    alpha,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material"
import NumberConfigure from "@/app/components/config/NumberConfigure"
import NumbersIcon from "@mui/icons-material/Numbers"
import { ExpandMore, PlayArrow, Update } from "@mui/icons-material"
import { theme, zIndex } from "@/app/lib/theme"
import React from "react"
import ExternalLink from "@/app/components/other/ExternalLink"
import ExpandablePaper from "@/app/components/other/ExpandablePaper"
type Props = {
    digitState: [number, (v: number) => void]
    slowdownState: [number, (v: number) => void]
    isGenerating: boolean
    onStart: () => void
}

const videoLink = "https://youtu.be/6dTyOl1fmDo?si=Ed73V15s3YyJvCSH"
const elevation = 4

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
export function Config(props: Props) {
    return (
        <Stack
            direction="row"
            justifyContent={"space-between"}
            position={"relative"}
        >
            <Paper
                sx={{
                    background: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 8,
                    padding: 1,
                    height: "100%",
                    width: "fit-content",
                    margin: 4,
                    marginBottom: 2,
                }}
                elevation={elevation}
            >
                <ConfigContent {...props} />
            </Paper>
            <ExpandablePaper
                header={
                    <Typography
                        variant={"h4"}
                        fontWeight={"bold"}
                    >
                        About
                    </Typography>
                }
                sx={{
                    background: alpha(theme.palette.background.default, 0.84),
                    borderRadius: 8,
                    padding: 2,
                    width: 600,
                    height: "fit-content",
                    margin: 4,
                    marginBottom: 2,
                    right: 0,
                    position: "absolute",
                    zIndex: zIndex.counter - 1,
                }}
                elevation={elevation}
                iconSize={32}
            >
                While the explanation behind this quite complicated, it is
                proven that when you have two blocks of which the mass ratio can
                be expressed by{" "}
                <code>
                    100<sup>n</sup>
                </code>
                , you get the first <code>n</code> digits of <code>π</code>. For
                this to work, we start with the large block moving onto the
                small block and have the small block standing still.
                <br />
                <br />
                We stop only once no more collisions are possible (When the
                large block escapes with a higher velocity than the small block
                can catch up with).
                <br />
                This system assumes lossless energy transfer between the blocks
                and no friction. The slowdown at the end is just so they stop at
                all.
                <br />
                <br />
                For a more detailed breakdown, watch{" "}
                <ExternalLink href={videoLink}>
                    3Blue1Brown's Video
                </ExternalLink>{" "}
                on it.
            </ExpandablePaper>
        </Stack>
    )
}

function ConfigContent(props: Props) {
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
                    disabled={props.isGenerating}
                    size={"large"}
                    onClick={props.onStart}
                    sx={{
                        width: 96,
                        height: 96,
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "action.disabledBackground",
                            color: "action.disabled",
                        },
                        margin: 2,
                    }}
                    color={"secondary"}
                >
                    {props.isGenerating && (
                        <CircularProgress sx={{ position: "absolute" }} />
                    )}
                    <PlayArrow fontSize={"large"} />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}
