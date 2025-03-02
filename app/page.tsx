"use client"
import GithubBadge from "@/app/components/GithubBadge"

import React from "react"
import ArenaFrame from "@/app/arena/ArenaFrame"

export default function Home() {
    return (
        <>
            <ArenaFrame />
            <GithubBadge link={"https://github.com/fynnbrem/homepage"} />
        </>
    )
}
