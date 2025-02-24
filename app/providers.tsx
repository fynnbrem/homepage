"use client"

import React from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/app/lib/theme"

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
