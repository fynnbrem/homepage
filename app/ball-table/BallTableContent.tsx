import * as React from "react"
import { useRef } from "react"
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

function CompleteTableRow(props: {
    ball: BallConfig
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => string
    onFocus: () => void
    onBlur: () => void
    onMassChange: (v: number) => void
    onRadiusChange: (v: number) => void
    onElasticityChange: (v: number) => void
    onDelete: () => void
}) {
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
                    onChange={props.onColorChange}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    sx={{
                        width: 30,
                        height: 30,
                        "& .MuiOutlinedInput-root": {
                            width: "100%",
                            height: "100%",
                            "& .MuiOutlinedInput-notchedOutline": {
                                background: props.ball.color,
                                // borderColor: palette.secondary.main
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
                    inputWidth={"40px"}
                />
            </TableCell>
            <TableCell align="center">
                <SmallTextField
                    value={props.ball.radius}
                    onChange={props.onRadiusChange}
                    inputWidth={"40px"}
                />
            </TableCell>
            <TableCell align="center">
                <SmallTextField
                    value={props.ball.elasticity}
                    onChange={props.onElasticityChange}
                    inputWidth={"40px"}
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

export default function BallTableContent({
    balls,
    onBallsChange,
}: {
    balls: BallConfig[]
    onBallsChange: Updater<BallConfig[]>
}) {
    const activeColorChange = useRef("#ffffff")

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
                        />
                        <TableHeaderCell
                            text={"Radius"}
                            icon={<BallSize size={iconSize} />}
                        />
                        <TableHeaderCell
                            text={"Elasticity"}
                            icon={<WallBounce size={iconSize} />}
                        />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {balls.map((ball) => (
                        <CompleteTableRow
                            key={ball.id}
                            ball={ball}
                            onColorChange={(e) =>
                                (activeColorChange.current = e.target.value)
                            }
                            onFocus={() => {
                                activeColorChange.current = ball.color
                            }}
                            onBlur={() =>
                                updateBallColor(
                                    ball.id,
                                    activeColorChange.current,
                                )
                            }
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

function TableHeaderCell({
    text,
    icon,
}: {
    text: string
    icon: React.ReactNode
}) {
    return (
        <TableCell
            align="center"
            sx={{ paddingX: 1 }}
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
    )
}
