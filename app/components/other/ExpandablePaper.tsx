import * as React from "react"
import { Box, ButtonBase, Collapse, Paper, Stack, SxProps } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

/**
 * A MUI Paper that can be clicked expand, showing the contained text.
 * Contains a permanently visible header and the expandable children.
 */
export default function ExpandablePaper(props: {
    header: React.ReactNode
    children: React.ReactNode
    elevation: number
    iconSize: number
    defaultExpanded?: boolean
    sx?: SxProps
}) {
    const [expanded, setExpanded] = React.useState<boolean>(
        !!props.defaultExpanded,
    )

    return (
        <Paper
            elevation={4}
            component={ButtonBase}
            onClick={() => setExpanded((v) => !v)}
            sx={{
                textAlign: "left",
                display: "block",
                overflow: "hidden",

                transition: "box-shadow 150ms ease",
                "&:hover": {
                    boxShadow: 6,
                },
                "&.Mui-focusVisible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                },
                ...props.sx,
            }}
        >
            {/*Header*/}
            <Box
                sx={{
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                >
                    {props.header}
                    <ExpandMore
                        sx={{
                            transition: "transform 200ms ease",
                            transform:
                                expanded ? "rotate(180deg)" : "rotate(0deg)",
                            color: "text.secondary",
                            fontSize: props.iconSize,
                        }}
                    />
                </Stack>
            </Box>

            {/*Content*/}
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <Box sx={{ px: 2, pb: 2, pt: 0.5 }}>{props.children}</Box>
            </Collapse>
        </Paper>
    )
}
