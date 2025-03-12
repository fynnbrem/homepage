import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Head from "next/head"
import Providers from "@/app/providers/Providers"
import { grey } from "@mui/material/colors"
import DynamicBackground from "@/app/assets/DynamicBackground"
import React from "react"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>{children}</Providers>
                <DynamicBackground color={grey[800]} />
            </body>
        </html>
    )
}
