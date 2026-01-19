import type { Metadata } from "next"
import "./globals.css"
import Head from "next/head"
import Providers from "@/app/providers/Providers"
import { grey } from "@mui/material/colors"
import DynamicBackground from "@/app/assets/DynamicBackground"
import React, { Suspense } from "react"
import AboutMe from "@/app/about-me/AboutMe"
import GithubBadge from "@/app/components/other/GithubBadge"
import NavBar from "@/app/NavBar"
import { Link } from "@mui/material"
import { zIndex } from "@/app/lib/theme"
import NextLink from "next/link"

export const metadata: Metadata = {
    title: "Fynn's Quest",
    description: "Things that Fynn has done and will do.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            data-theme={"dark"}
        >
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                {/*↑ https://mui.com/material-ui/getting-started/usage/*/}
            </Head>
            <body>
                <Providers>
                    <NavBar />
                    {children}
                    <Suspense>
                        <AboutMe />
                    </Suspense>
                    <GithubBadge
                        link={"https://github.com/fynnbrem/homepage"}
                    />
                    <LegalNoticeLink />
                </Providers>
                <DynamicBackground color={grey[800]} />
            </body>
        </html>
    )
}

function LegalNoticeLink() {
    return (
        <Link
            href={"legal-notice"}
            sx={{
                position: "absolute",
                zIndex: zIndex.badge,
                bottom: 0,
                left: 4,
                fontSize: "small",
            }}
            color={"secondary"}
            component={NextLink}
        >
            Legal Notice
        </Link>
    )
}
