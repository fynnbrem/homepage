"use client"
import { Button, Stack } from "@mui/material"
import Link from "next/link"
import { zIndex } from "@/app/lib/theme"
import { BallCollision, PiCollider } from "@/app/assets/Icons"
import React from "react"
import { usePathname } from "next/navigation"

// We don't have a proper landing page, so we just dedicate the gravity balls to take this role.
const landingPage = "/gravity-balls"

type Page = {
    name: string
    icon: React.ReactNode
    link: string
}

const pages: Page[] = [
    {
        name: "Gravity Balls",
        icon: <BallCollision size={26} />,
        link: "/gravity-balls",
    },
    {
        name: "Pi Collider",
        icon: <PiCollider size={24} />,
        link: "/pi-collider",
    },
]

export default function NavBar() {
    let activePath = usePathname()
    if (activePath == "/") activePath = landingPage
    return (
        <Stack
            direction={"row"}
            justifyContent={"center"}
        >
            {pages.map((p) => (
                <NavButton
                    key={p.link}
                    icon={p.icon}
                    active={activePath === p.link}
                    link={p.link}
                >
                    {p.name}
                </NavButton>
            ))}
        </Stack>
    )
}

const margin = -1
const padding = 4
const borderRadius = 24
function NavButton(props: {
    active: boolean
    link: string
    children: React.ReactNode
    icon: React.ReactNode
}) {
    return (
        <Button
            component={Link}
            href={props.link}
            variant={"contained"}
            sx={{
                backgroundColor: props.active ? "primary.dark" : undefined,
                textTransform: "none",
                borderBottomRightRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                width: 180,
                marginLeft: margin,
                marginRight: margin,
                paddingLeft: padding,
                paddingRight: padding,
                position: "relative",
                zIndex: props.active ? zIndex.navBar - 1 : zIndex.navBar,
            }}
            startIcon={props.icon}
        >
            {props.children}
        </Button>
    )
}
