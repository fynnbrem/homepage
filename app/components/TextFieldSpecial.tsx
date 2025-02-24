import React, { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { palette } from "@/app/lib/theme";
import { truncateToMaxDecimalPlaces } from "@/app/lib/string";
import { floorTo } from "@/app/lib/math";

/**A small text field to fit in with the <NumberConfigure>.*/
export function SmallTextField(props: {
    value: number
    onChange: (v: number) => void
    endAdornment?: string
    inputWidth: string
    precision?: number
}) {
    return (
        <PositiveNumberField
            color={"primary"}
            size={"small"}
            variant={"filled"}
            slotProps={
                props.endAdornment ?
                    {
                        input: {
                            endAdornment: props.endAdornment,
                        },
                    }
                :   undefined
            }
            sx={{
                // Define the font size here as well so font-based units work properly.
                fontSize: "small",
                "& .MuiFilledInput-root": {
                    backgroundColor: palette.secondary.main,
                    "&:hover": {
                        background: palette.secondary.dark,
                    },
                    "&.Mui-focused": {
                        background: palette.secondary.main,
                    },
                },
                "& .MuiInputBase-input": {
                    fontSize: "small",
                    padding: 0.5,
                    width: props.inputWidth,
                },
            }}
            value={props.value}
            onChange={props.onChange}
            precision={props.precision}
        />
    )
}

/**A <TextField> that only allows numbers.
 * - The numbers must be positive.
 * - The numbers must have a maximum `precision`.
 *
 * This component differs from an input with type "number" in two ways:
 * - The input may be empty. In this case, `onChange` will not be called.
 * - While focussed, arbitrary numbers may be input (That are positive and within the precision).
 *  On blur, the number's format will the normalized.*/
export function PositiveNumberField({
    value,
    onChange,
    precision = 0,
    ...rest
}: {
    precision?: number
    value: number
    onChange: (v: number) => void
} & Omit<TextFieldProps, "value" | "onChange">) {
    const [rawValue, setRawValue] = useState(value.toString())
    const [hasFocus, setHasFocus] = useState(false)
    // While unfocused, display the prop value.
    const inputValue = hasFocus ? rawValue : value.toString()

    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value

        if (value.trim() === "") {
            // If the input is empty, do not set the number-value.
            setRawValue(value)
        } else {
            const parsedValue = Number(value)
            if (!isNaN(parsedValue) && parsedValue >= 0) {
                // Round the values so they match the precision.
                // We actually floor here, as to keep the string-value untouched
                // and the number-value en-pair with the string-value.
                setRawValue(truncateToMaxDecimalPlaces(value, precision))
                onChange(floorTo(parsedValue, precision))
            }
        }
    }

    function handleBlur() {
        setHasFocus(false)
    }

    function handleFocus() {
        // When gaining focus, set the raw value to the current value as it will not be updated while out-of-focus.
        setRawValue(value.toString())
        setHasFocus(true)
    }

    return (
        <TextField
            value={inputValue}
            onChange={handleValueChange}
            {...rest}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
    )
}
