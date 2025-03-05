import * as React from "react"
import { useRef, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { SmallTextField } from "@/app/arena/components/TextFieldSpecial"
import { Updater } from "use-immer"
import { Box, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import { Brush, DeleteOutlined } from "@mui/icons-material"
import { BallSize, WallBounce, Weight } from "@/app/assets/Icons"
import { BallConfig } from "@/app/ball-table/model"
import { globalBalls } from "@/app/arena/Arena"

const iconSize = 32

/**The thumbnail for the ball.
 * The thumbnail is linearly scaled down and shows a shadow.
 * The values are also clamped
 * as to always be visible and never exceed the boundaries of the table.*/
function BallThumbnail({ ball }: { ball: BallConfig }) {
    let diameter = ball.radius * 1.25
    diameter = Math.min(40, Math.max(5, diameter))
    return (
        <div
            style={{
                background: ball.color,
                height: diameter,
                width: diameter,
                borderRadius: "50%",
                boxShadow: "0 0 4px rgba(0, 0, 0, 1)",
            }}
        />
    )
}

/**Returns the object in `objects` that has `.id === id` */
function findById<T extends { id: string }>(
    objects: T[],
    id: string,
): T | undefined {
    return objects.find((v) => v.id === id)
}

/**Returns the index of the object in `objects` that has `.id === id`. */
function findIndexById<T extends { id: string }>(
    objects: T[],
    id: string,
): number | undefined {
    const index = objects.findIndex((v) => v.id === id)
    return index !== -1 ? index : undefined
}

/**A full table row to manage a ball.
 * Contents:
 *  - A preview of the ball.
 *  - An input to each change one of the metrics of the ball:
 *      - Color
 *      - Mass
 *      - Radius
 *      - Elasticity
 *  - A delete button.
 *
 *  All inputs besides the color input broadcast any changes.
 *  The color input only broadcasts the changes once the dialogue is dismissed
 *  (Live broadcast causes severe lag due to the rate of change). */
function FullTableRow(props: {
    ball: BallConfig
    onColorChange: (v: string) => void
    onMassChange: (v: number) => void
    onRadiusChange: (v: number) => void
    onElasticityChange: (v: number) => void
    onDelete: () => void
}) {
    // Stage change from the color input here until the dialogue gets dismissed.
    const activeColorChange = useRef(props.ball.color)
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell
                component="th"
                scope="row"
                sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    background: "#121212",
                }}
            >
                <Box
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    height={40}
                    width={40}
                >
                    <BallThumbnail ball={props.ball} />
                </Box>
            </TableCell>
            <TableCell align="center">
                <TextField
                    value={props.ball.color}
                    type={"color"}
                    onChange={(e) => {
                        activeColorChange.current = e.target.value
                    }}
                    onBlur={() =>
                        props.onColorChange(activeColorChange.current)
                    }
                    // Style the color input so it just displays the color in a rounded rectangle.
                    sx={{
                        width: 30,
                        height: 30,
                        "& .MuiOutlinedInput-root": {
                            width: "100%",
                            height: "100%",
                            "& .MuiOutlinedInput-notchedOutline": {
                                background: props.ball.color,
                            },
                        },
                        "& .MuiInputBase-input": {
                            padding: 0,
                            value: "red",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            boxSizing: "border-box",
                        },
                    }}
                />
            </TableCell>
            <TableCell align="center">
                <SmallTextField
                    value={props.ball.mass}
                    onChange={props.onMassChange}
                    inputWidth={"5.5ch"}
                />
            </TableCell>
            <TableCell align="center">
                <SmallTextField
                    value={props.ball.radius}
                    onChange={props.onRadiusChange}
                    inputWidth={"5.5ch"}
                />
            </TableCell>
            <TableCell align="center">
                <SmallTextField
                    value={props.ball.elasticity}
                    onChange={props.onElasticityChange}
                    inputWidth={"5.5ch"}
                />
            </TableCell>
            <TableCell
                align="center"
                sx={{ paddingX: 1 }}
            >
                <Tooltip title={"Delete Ball"}>
                    <IconButton onClick={props.onDelete}>
                        <DeleteOutlined />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

/**The table to display all active balls.
 * Contains a sticky header with tooltips, a sticky first column with a preview of the ball and inputs to configure the various metrics of the ball.
 * See `<FullTableRow>` for details on the rows.*/
export default function BallTable({
    balls,
    onBallsChange,
}: {
    balls: BallConfig[]
    onBallsChange: Updater<BallConfig[]>
}) {
    // All updaters update the internal state used for the inputs as well as the
    // global values used for the simulation.
    // This causes every updater to apply the changes to two different variables.
    function updateBallMass(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.mass = value
            const ball = findById(globalBalls, id)
            if (ball) ball.mass = value
        })
    }

    function updateBallRadius(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.radius = value
            const ball = findById(globalBalls, id)
            if (ball) ball.radius = value
        })
    }

    function updateBallElasticity(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.elasticity = value
            const ball = findById(globalBalls, id)
            if (ball) ball.elasticity = value
        })
    }

    function updateBallColor(id: string, value: string) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.color = value
            const ball = findById(globalBalls, id)
            if (ball) ball.color = value
        })
    }

    function deleteBall(id: string) {
        onBallsChange((draft) => draft.filter((b) => b.id !== id))
        const ball = findIndexById(globalBalls, id)
        if (ball !== undefined) globalBalls.splice(ball, 1)
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                overflowX: "auto",
                overflowY: "scroll",
                height: "100%",
            }}
        >
            <Table
                stickyHeader
                size={"medium"}
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                zIndex: 2 /*We need to lift the header of this column as the column content is also lifted.*/,
                            }}
                        />
                        <TableHeaderCell
                            text={"Color"}
                            icon={<Brush sx={{ fontSize: iconSize }} />}
                        />
                        <TableHeaderCell
                            text={"Mass"}
                            icon={<Weight size={iconSize} />}
                            tooltip={
                                "The mass of the ball. This affects the gravitational force it generates and its inertia towards other forces."
                            }
                        />
                        <TableHeaderCell
                            text={"Radius"}
                            icon={<BallSize size={iconSize} />}
                            tooltip={"The radius of the ball."}
                        />
                        <TableHeaderCell
                            text={"Elasticity"}
                            icon={<WallBounce size={iconSize} />}
                            tooltip={
                                "The amount of kinetic energy that gets preserved when balls collide with something."
                            }
                        />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {balls.map((ball) => (
                        <FullTableRow
                            key={ball.id}
                            ball={ball}
                            onColorChange={(v) => updateBallColor(ball.id, v)}
                            onMassChange={(v) => updateBallMass(ball.id, v)}
                            onRadiusChange={(v) => updateBallRadius(ball.id, v)}
                            onElasticityChange={(v) =>
                                updateBallElasticity(ball.id, v)
                            }
                            onDelete={() => deleteBall(ball.id)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

/**A header cell for the table.
 * Contains the `title`, the `icon` and an on-hover `tooltip`.*/
function TableHeaderCell({
    text,
    icon,
    tooltip,
}: {
    text: string
    icon: React.ReactNode
    tooltip?: React.ReactNode
}) {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    return (
        <Tooltip
            title={tooltip}
            open={isTooltipOpen}
        >
            <TableCell
                align="center"
                // We shorten the padding to keep the table slim.
                sx={{ paddingX: 1 }}
                // Support both on-hover and on-click tooltips for mobile and desktop.
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
            >
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    {icon}
                    {text}
                </Stack>
            </TableCell>
        </Tooltip>
    )
}
