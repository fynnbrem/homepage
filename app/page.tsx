"use client"
import GithubBadge from "@/app/components/GithubBadge"
import Background from "@/app/assets/Background"
import { grey } from "@mui/material/colors"
import React from "react"
import ArenaBox from "@/app/arena/ArenaBox"

export default function Home() {
    return (
        <>
            <Background color={grey[800]} />
            <ArenaBox />
            <GithubBadge link={"https://github.com/fynnbrem/homepage"} />
        </>
    )
}
