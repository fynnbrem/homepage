import { Paper, Typography } from "@mui/material"

/**All content required by the EU for the legal notice.*/
export default function LegalNotice() {
    return (
        <Paper
            sx={{
                padding: 4,
                borderRadius: 6,
                width: "fit-content",
                margin: 4,
            }}
            elevation={2}
        >
            <Typography
                variant={"h4"}
                sx={{ paddingBottom: 1 }}
            >
                Legal Notice
            </Typography>
            Fynn Bremser
            <br />
            fynn.bremser@gmx.de
            <br />
            Kurt-Schumacher-Straße 2
            <br />
            33102 Paderborn Germany
        </Paper>
    )
}
