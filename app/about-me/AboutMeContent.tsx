import Image from "next/image"
import { Box, Link, Typography } from "@mui/material"
import { theme } from "@/app/lib/theme"
import ExternalLink from "@/app/components/ExternalLink"

export default function AboutMeContent() {
    return (
        <Box>
            <style>
                {`
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        `}
            </style>
            <Image
                src={"/myself.jpg"}
                alt={"A picture of the owner of this website."}
                width={256}
                height={256}
                style={{
                    borderRadius: "50%",
                    boxShadow: theme.shadows[5],
                    margin: theme.spacing(2),
                    display: "inline-block",
                    float: "left",
                }}
            />
            <Text />
        </Box>
    )
}

function Text() {
    return (
        <>
            <Typography variant={"h2"}>Hi, I&apos;m Fynn!</Typography>
            <Typography
                variant={"h4"}
                sx={{ mb: 1 }}
            >
                Say hello to my website!
            </Typography>
            <Typography variant={"h5"}>
                I am a computer science student enrolled at{" "}
                <ExternalLink href={"https://cs.uni-paderborn.de/"}>
                    University Paderborn
                </ExternalLink>
                .
                <br />I spent 3 years as student assistant at{" "}
                <ExternalLink href={"https://www.dspace.com/"}>
                    dSPACE
                </ExternalLink>{" "}
                where I applied computer linguistics to improve the quality of
                user documentation, helped in developing an LLM-based chatbot to
                make the documentation more accessible and had my first contact
                with proper user design.
                <br />
                <br />
                Besides computer science I also practice some applied physics
                and showmanship at the{" "}
                <ExternalLink href={"https://www.event-physik.de/"}>
                    Event Physik Paderborn
                </ExternalLink>
                , and I coach a{" "}
                <ExternalLink
                    href={
                        "https://www.tvjahn-bad-lippspringe.de/turnen/parkour/"
                    }
                >
                    parkour sports course
                </ExternalLink>
                .
                <br />
                <br />
                My strongest programming languages are Python and React (This
                website is written in React of course!).
                <br />
                <br />
                Also check out my{" "}
                <ExternalLink href={"https://github.com/fynnbrem"}>
                    GitHub
                </ExternalLink>{" "}
                or contact me under{" "}
                <Link href={"mailto:fynn.bremser@gmx.de"}>
                    fynn.bremser@gmx.de
                </Link>
                .
            </Typography>
        </>
    )
}
