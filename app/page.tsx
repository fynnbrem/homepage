"use client"
import GithubBadge from "@/app/components/GithubBadge"

import React from "react"
import ArenaFrame from "@/app/arena/ArenaFrame"
import AboutMe from "@/app/about-me/AboutMe"

export default function Home() {
    return (
        <>
            <ArenaFrame />
            <AboutMe />
            <GithubBadge link={"https://github.com/fynnbrem/homepage"} />
        </>
    )
}
