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
import { Box, IconButton, Stack, TextField } from "@mui/material"
import { Brush, DeleteOutlined } from "@mui/icons-material"
import { BallSize, WallBounce, Weight } from "@/app/assets/Icons"

const iconSize = 32

export type Ball = {
    id: string
    color: string
    mass: number
    radius: number
    elasticity: number
}

function BallThumbnail({ ball }: { ball: Ball }) {
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

export default function BallTableContent({
    balls,
    onBallsChange,
}: {
    balls: Ball[]
    onBallsChange: Updater<Ball[]>
}) {
    const activeColorChange = useRef("#ffffff")

    function updateBallMass(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.mass = value
        })
    }

    function updateBallRadius(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.radius = value
        })
    }

    function updateBallElasticity(id: string, value: number) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.elasticity = value
        })
    }

    function updateBallColor(id: string, value: string) {
        onBallsChange((draft) => {
            const item = findById(draft, id)
            if (item) item.color = value
        })
    }

    function deleteBall(id: string) {
        onBallsChange((draft) => draft.filter((b) => b.id !== id))
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                overflowY: "auto",
                overflowX: "auto",
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
                        <TableRow
                            key={ball.id}
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
                                    <BallThumbnail ball={ball} />
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    value={ball.color}
                                    type={"color"}
                                    onChange={(e) =>
                                        (activeColorChange.current =
                                            e.target.value)
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
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        "& .MuiOutlinedInput-root": {
                                            width: "100%",
                                            height: "100%",
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    background: ball.color,
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
                                    value={ball.mass}
                                    onChange={(v) => updateBallMass(ball.id, v)}
                                    inputWidth={"40px"}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <SmallTextField
                                    value={ball.radius}
                                    onChange={(v) =>
                                        updateBallRadius(ball.id, v)
                                    }
                                    inputWidth={"40px"}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <SmallTextField
                                    value={ball.elasticity}
                                    onChange={(v) =>
                                        updateBallElasticity(ball.id, v)
                                    }
                                    inputWidth={"40px"}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => deleteBall(ball.id)}>
                                    <DeleteOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
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
        <TableCell align="center">
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
