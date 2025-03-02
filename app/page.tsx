"use client"
import GithubBadge from "@/app/components/GithubBadge"

import { grey } from "@mui/material/colors"
import React from "react"
import ArenaFrame from "@/app/arena/ArenaFrame"
import dynamic from "next/dynamic"

const Background = dynamic(() => import("@/app/assets/Background"), {
    ssr: false,
})

export default function Home() {
    return (
        <>
            <Background color={grey[800]} />
            <ArenaFrame />
            <GithubBadge link={"https://github.com/fynnbrem/homepage"} />
        </>
    )
}
