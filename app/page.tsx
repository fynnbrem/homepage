"use client"
import Arena from "@/app/Arena"
import { Stack } from "@mui/material"
import { WorldConfigure } from "@/app/components/WorldConfigure"
import GithubBadge from "@/app/components/GithubBadge"

export default function Home() {
    return (
        <>
            <Stack direction={"row"}>
                <Arena />
                <WorldConfigure />
            </Stack>
            <GithubBadge link={"https://github.com/fynnbrem/homepage"} />
        </>
    )
}
