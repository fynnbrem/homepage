import { createTheme } from "@mui/material"
import { deepOrange, grey, orange } from "@mui/material/colors"

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: orange[800],
            dark: deepOrange[900],
        },
        secondary: {
            main: grey[200],
            light: "#ffffff",
            dark: grey[300],
        },
    },
})

export const zIndex = {
    badge: 5,
    aboutMe: 10,
}

export const spacing = parseFloat(theme.spacing(1))

export const palette = theme.palette
