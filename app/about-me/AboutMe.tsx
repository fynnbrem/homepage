import { Backdrop, Box, Button, Paper, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { zIndex } from "@/app/lib/theme"
import AboutMeContent from "@/app/about-me/AboutMeContent"
import { BananaFace } from "@/app/assets/Icons"

const animationDuration = 0.5

export default function AboutMe() {
    const [open, setOpen] = useState(false)
    const [contentVisible, setContentVisible] = useState(open)
    useEffect(() => {
        if (open) {
            setContentVisible(true)
        } else {
            setTimeout(() => setContentVisible(false), animationDuration * 1000)
        }
    }, [open])

    return (
        <>
            <Backdrop
                open={open}
                sx={{ zIndex: zIndex.aboutMe - 1 }}
                onClick={() => setOpen(false)}
            />
            <Stack
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                alignItems={"center"}
            >
                <Box
                    sx={{
                        position: "fixed",
                        top: open ? "10%" : "calc(100% - 42px)",
                        height: "80%",
                        transition: `top ${animationDuration}s ease`,
                        zIndex: zIndex.aboutMe,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        variant={"contained"}
                        sx={{
                            height: totalHeight,
                            clipPath: clipPath,
                            borderRadius: 0,
                            width: totalWidth,
                            alignItems: "start",
                            paddingTop: 1,
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            <span>About Me</span>
                            <Box
                                sx={{
                                    rotate: open ? "180deg" : "0",
                                    transition: `rotate ${animationDuration * 2}s ease`,
                                }}
                            >
                                <BananaFace size={32} />
                            </Box>
                        </Stack>
                    </Button>
                    <Paper
                        elevation={2}
                        sx={{
                            flexGrow: 1,
                            width: totalWidth,
                            position: "relative",
                            borderRadius: 6,
                            marginTop: -10,
                            // Do not use the default box shadow
                            // as we need one between the button at the top and this paper.
                            boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)",
                            padding: 4,
                            overflow: "auto",
                        }}
                    >
                        {contentVisible && <AboutMeContent />}
                    </Paper>
                </Box>
            </Stack>
        </>
    )
}

const topWidth = 200
const wingWidth = 500
const topHeight = 48
const botHeight = 96
const radius = 24
const totalHeight = topHeight + botHeight
const totalWidth = topWidth + 2 * wingWidth

const tPath =
    `M 0,${totalHeight}` +
    `L ${totalWidth},${totalHeight}` +
    `L ${totalWidth},${topHeight + radius}` +
    `A ${radius},${radius} 0 0 0 ${totalWidth - radius},${topHeight}` + // Right Wing Top Right
    `L ${wingWidth + topWidth + radius},${topHeight}` +
    `A ${radius},${radius} 0 0 1 ${wingWidth + topWidth},${topHeight - radius}` + // Right Wing Top Left
    `L ${wingWidth + topWidth},${radius}` +
    `A ${radius},${radius} 0 0 0 ${wingWidth + topWidth - radius},0` + // Topper Top Right
    `L ${wingWidth + radius},0` +
    `A ${radius},${radius} 0 0 0 ${wingWidth},${radius}` + // Topper Top Right
    `L ${wingWidth},${topHeight - radius}` +
    `A ${radius},${radius} 0 0 1 ${wingWidth - radius},${topHeight}` + // Left Wing Top Right
    `L ${radius},${topHeight}` +
    `A ${radius},${radius} 0 0 0 0,${topHeight + radius}` +
    `Z`
const clipPath = `path("${tPath}")`
