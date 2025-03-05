import { Button, Stack, Tooltip } from "@mui/material"
import { Add } from "@mui/icons-material"
import React from "react"
import BallTable from "@/app/ball-table/BallTable"
import { useImmer } from "use-immer"
import {
    configFromBall,
    getNewBall,
    getRandomBall,
} from "@/app/ball-table/model"
import { globalBalls } from "@/app/arena/Arena"


/**The frame for the ball table.
 * In addition to the `<BallTable>`, this also contains an "add" button to create new balls.
 * The "add" button will initially generate a random ball, which can be refined with the table inputs if needed.*/
export default function BallTableFrame() {
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
            <BallTable
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
