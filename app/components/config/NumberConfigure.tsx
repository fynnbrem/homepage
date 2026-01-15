import React, { useState } from "react"
import {
    alpha,
    Box,
    IconButton,
    Slider as MuiSlider,
    Stack,
    Switch,
    Tooltip,
} from "@mui/material"
import Knob from "@/app/components/config/Knob"
import { palette } from "@/app/lib/theme"
import { radToDegree, roundTo } from "@/app/lib/math"
import { InfoOutlined } from "@mui/icons-material"
import { SmallTextField } from "@/app/components/config/TextFieldSpecial"

/**The slider. Requires the transformed values.*/
function Slider(props: {
    value: number
    onChange: (_: Event, value: number | number[]) => void
    min: number
    max: number
}) {
    return (
        <Box
            sx={{ paddingLeft: 2, paddingRight: 2 }}
            flexGrow={1}
        >
            <MuiSlider
                color={"secondary"}
                min={props.min}
                max={props.max}
                // The step must be small enough to fit all use-cases.
                // The actual (possibly larger) step is defined by the rounding functions of the controlling component.
                step={0.01}
                value={props.value}
                onChange={props.onChange}
            />
        </Box>
    )
}

/**The text field to display the value of the slider.*/
function GenericNumberField(props: {
    value: number
    onChange: (v: number) => void
    precision: number
}) {
    return (
        <SmallTextField
            value={props.value}
            onChange={props.onChange}
            inputWidth={"6.3ch"}
            precision={props.precision}
        />
    )
}

/**The text field to display the angle of the dial. Unit: degrees.*/
function AngleNumberField(props: {
    value: number
    onChange: (v: number) => void
}) {
    return (
        <SmallTextField
            value={props.value}
            onChange={props.onChange}
            endAdornment={"°"}
            inputWidth={"3.3ch"}
        />
    )
}

/**A small info button that shows a tooltip when pressed.
 * Is sized so it can be inlined with the title.*/
function InfoButton({ text }: { text: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Tooltip
            title={text}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            // Modify the vertical offset upwards so the tooltip appears more as part of the main component.
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [0, -16],
                            },
                        },
                    ],
                },
            }}
            disableHoverListener
            disableTouchListener
        >
            <IconButton
                sx={{
                    // Add as much padding as possible while still staying within the height of the title.
                    padding: "2px",
                    marginLeft: 0.5,
                    // Make the hover effect more opaque to be notice-able on the light background.
                    "&:hover": {
                        background: alpha(palette.secondary.main, 0.2),
                    },
                }}
                color="secondary"
                onClick={() => setIsOpen(!isOpen)}
            >
                <InfoOutlined fontSize={"small"} />
            </IconButton>
        </Tooltip>
    )
}

/**A transformation formula between the slider value and the actual value.
 * The first callable transforms from slider value to actual value, the second callable the other way around.
 *
 * This squares the slider value.*/
const squareTransform = [(v: number) => v ** 2, (v: number) => Math.sqrt(v)]

/**The transformation formula between the slider value and the actual value.
 * The first callable transforms from slider value to actual value, the second callable the other way around.
 *
 * This keeps the unmodified value (Only exist for parity).*/
const linearTransform = [(v: number) => v, (v: number) => v]

// Define the props for each variant.
type BaseProps = {
    title: string
    icon: React.ReactNode
    tooltip: React.ReactNode
}

type SliderBaseProps = BaseProps & {
    min: number
    max: number
    squared?: boolean
    precision: number
    onSliderChange: (v: number) => void
    sliderValue: number
}

type SliderProps = SliderBaseProps & {
    variant: "slider"
}

type SliderDialProps = SliderBaseProps & {
    variant: "slider-dial"
    onDialChange: (v: number) => void
    dialValue: number
}

type SwitchProps = BaseProps & {
    variant: "switch"
    onSwitchChange: (v: boolean) => void
    switchValue: boolean
}

type Props = SliderProps | SliderDialProps | SwitchProps

/**A variable number input with a title, icon, background and several input variants.
 * For the inputs, three variants exist:
 * - "slider"
 *      A slider.
 *  - "slider-dial"
 *      A slider and a round, 360°-dial.
 *  - "switch"
 *      A switch.
 *
 *  The slider and the dial also come with a text field to input numbers of arbitrary size.
 *  Most props must only be defined if the matching variant also supplies the respective element.
 *
 *  @param props.title
 *      The title text.
 *  @param props.icon
 *      The icon.
 *  @param props.variant
 *      The input variant. This also implies the other props needed.
 *  @param props.min
 *      The minimum value for the slider.
 *      This does not cap the value for the text field.
 *  @param props.max
 *      The maximum value for the slider.
 *      This does not cap the value for the text field.
 *  @param props.onSliderChange
 *      Callback for value changes on the slider.
 *  @param props.sliderValue
 *      The value for the slider.
 *  @param props.squared=false
 *      Flag to make the slider use square scaling,
 *      i.e. the slider's value will be squared before passing it to the change-callback.
 *  @param props.precision
 *      The precision (in decimal places) for the value.
 *      This affects both the step of the slider and the allowed value for the text field.
 *
 *  @param props.onDialChange
 *      Callback for value changes on the dial. Unit: Radians. Value Range: `[0;2PI)`.
 *  @param props.dialValue
 *      The value for the dial. Unit: radians.
 *
 *  @param props.onSwitchChange
 *      Callback for value changes on the switch.
 *  @param props.switchValue
 *      The value for the switch.
 *      */
export default function NumberConfigure(props: Props) {
    let slider: React.ReactNode
    let genericNumberField: React.ReactNode
    if (props.variant === "slider" || props.variant === "slider-dial") {
        const transform = props.squared ? squareTransform : linearTransform

        const handleSliderChange = (_: Event, value: number | number[]) => {
            if (typeof value === "number") {
                props.onSliderChange(
                    roundTo(transform[0](value), props.precision),
                )
            }
        }
        // ↑ We need an arrow function here as
        // otherwise TS will not properly detect the narrowed down variant of the `props`.

        const transSliderValue = transform[1](props.sliderValue)
        slider = (
            <Slider
                value={transSliderValue}
                onChange={handleSliderChange}
                min={transform[1](props.min)}
                max={transform[1](props.max)}
            />
        )

        genericNumberField = (
            <GenericNumberField
                value={props.sliderValue}
                onChange={props.onSliderChange}
                precision={props.precision}
            />
        )
    }
    let angleNumberField: React.ReactNode
    if (props.variant === "slider-dial") {
        const angleText = Math.round(radToDegree(props.dialValue))
        const onDialChange = props.onDialChange

        angleNumberField = (
            <AngleNumberField
                value={angleText}
                onChange={onDialChange}
            />
        )
    }
    return (
        <Box
            sx={{
                width: 350,
                margin: 1,
                background: palette.primary.main,
                // Define an all-around padding and make it larger to the right
                // to match the left side which appears lighter due to the icon.
                padding: 1,
                paddingRight: 3,
                borderRadius: 6,
                boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
        >
            <Stack
                direction={"row"}
                sx={{ alignItems: "center" }}
            >
                {props.icon}
                <Stack flexGrow={1}>
                    <Stack
                        marginLeft={1}
                        direction={"row"}
                    >
                        {props.title}
                        <InfoButton text={props.tooltip} />
                    </Stack>
                    {props.variant === "slider-dial" ?
                        slider
                    : props.variant === "slider" ?
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            {slider}
                            {genericNumberField}
                        </Stack>
                    :   <Switch
                            color={"secondary"}
                            checked={props.switchValue}
                            onChange={(_, v) => props.onSwitchChange(v)}
                        />
                    }
                </Stack>
                {props.variant === "slider-dial" && (
                    <>
                        <Box
                            sx={{ marginRight: 1 }}
                            flexGrow={0}
                        >
                            <Knob
                                value={props.dialValue}
                                onChange={props.onDialChange}
                            />
                        </Box>
                        <Stack
                            spacing={0.5}
                            flexGrow={0}
                        >
                            {angleNumberField}
                            {genericNumberField}
                        </Stack>
                    </>
                )}
            </Stack>
        </Box>
    )
}
