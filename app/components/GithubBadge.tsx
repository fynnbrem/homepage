import { Fab } from "@mui/material";
import { GitHub } from "@mui/icons-material";

/**Displays a badge with the GitHub icon, referring to the `link`.
 * The badge will be placed at the bottom right of the viewport.*/
export default function GithubBadge({ link }: { link: string }) {
    return (
        <a
            href={link}
            target={"_blank"}
            rel={"noopener"}
        >
            <Fab
                color={"primary"}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 16,
                    zIndex: 999,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <GitHub fontSize={"large"} />
            </Fab>
        </a>
    )
}
