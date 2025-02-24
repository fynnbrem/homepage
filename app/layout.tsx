import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Head from "next/head"
import Providers from "@/app/providers"

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
        <html lang="en">
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
            </body>
        </html>
    )
}
