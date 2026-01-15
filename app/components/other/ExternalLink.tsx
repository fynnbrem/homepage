import { Link } from "@mui/material"
import { LinkProps } from "@mui/material/Link/Link"

/**An external link. Builds on the Material UI `<Link>`.
 * The link will be opened in a new tab and has `rel="noopener"`. */
export default function ExternalLink(props: Omit<LinkProps, "target" | "rel">) {
    return (
        <Link
            {...props}
            target={"_blank"}
            rel={"noopener"}
        >
            {props.children}
        </Link>
    )
}
