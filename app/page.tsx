"use client"
import Arena from "@/app/Arena"
import { Stack } from "@mui/material"
import { WorldConfigure } from "@/app/components/WorldConfigure"

export default function Home() {
    return (
        <Stack direction={"row"}>
            <Arena />
            <WorldConfigure />
        </Stack>
    )
}
