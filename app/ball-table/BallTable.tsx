import { Button, Stack, Tooltip } from "@mui/material"
import { Add } from "@mui/icons-material"
import React from "react"
import { v4 } from "uuid"
import BallTableContent from "@/app/ball-table/BallTableContent"
import { Updater, useImmer } from "use-immer"
import { getRandomItem } from "@/app/lib/math"
import { BallConfig, configFromBall, getNewBall } from "@/app/ball-table/model";
import { globalBalls } from "@/app/arena/Arena";

function createData(
    color: string,
    mass: number,
    radius: number,
    elasticity: number,
): BallConfig {
    return { id: v4(), color, mass, radius, elasticity }
}

const baseRows = [
    createData("#b52b2b", 250, 5, 0.9),
    createData("#149327", 50, 15, 0.8),
    createData("#8c1878", 150, 25, 0.1),
    createData("#2340bf", 500, 30, 0.7),
    createData("#73ecdc", 100, 10, 0),
]

const randomParams = {
    radius: [5, 10, 15, 20, 25, 35, 45],
    mass: [25, 50, 100, 250, 500, 1000],
    elasticity: [0, 0.1, 0.2, 0.8, 0.9, 1],
    color: [
        "#912500",
        "#cd4315",
        "#b34500",
        "#ed6503",
        "#a55200",
        "#c6641a",
        "#fb8e45",
        "#dc7e2e",
        "#c18b06",
        "#eda503",
        "#ffc341",
        "#e1c100",
        "#cdb419",
        "#ffdc00",
    ],
}

function getRandomBall(): BallConfig {
    return {
        id: v4(),
        color: getRandomItem(randomParams.color),
        mass: getRandomItem(randomParams.mass),
        radius: getRandomItem(randomParams.radius),
        elasticity: getRandomItem(randomParams.elasticity),
    }
}

export default function BallTable() {
    const [balls, setBalls] = useImmer(globalBalls.map(configFromBall))

    function addRandomBall() {
        const config = getRandomBall()
        setBalls((draft) => {
            draft.push(config)
        })
        globalBalls.push(getNewBall(config))
    }

    return (
        <Stack
            width={"100%"}
            height={"100%"}
            overflow={"hidden"}
        >
            <BallTableContent
                balls={balls}
                onBallsChange={setBalls}
            />
            <Tooltip title={"Create New Ball"}>
                <Button
                    fullWidth
                    variant={"contained"}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 24,
                        borderBottomLeftRadius: 24,
                    }}
                    onClick={addRandomBall}
                >
                    <Add />
                </Button>
            </Tooltip>
        </Stack>
    )
}
