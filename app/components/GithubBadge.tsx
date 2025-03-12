import { Fab } from "@mui/material";
import { zIndex } from "@/app/lib/theme";
import { Github } from "@/app/assets/Icons";
import { useState } from "react";
import ExternalLink from "@/app/components/ExternalLink";

/**Displays a badge with the GitHub icon, referring to the `link`.
 * The badge will be placed at the bottom right of the viewport.*/
export default function GithubBadge({ link }: { link: string }) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <ExternalLink
            href={link}
        >
            <Fab
                color={"primary"}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 16,
                    zIndex: zIndex.badge,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: "flex",
                    alignItems: "center",
                }}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <Github
                    size={38}
                    animate={isHovered}
                />
            </Fab>
        </ExternalLink>
    )
}
