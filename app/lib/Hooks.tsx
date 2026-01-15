import { useState } from "react"

/**A state that stores a number and allows only values within the range `[min;max]`.
 * Values outside that range will be dismissed entirely, resulting in no state change.*/
export function useNumberState(
    initialState: number,
    min?: number,
    max?: number,
): [number, (v: number) => void] {
    const [value, setValue_] = useState(initialState)

    function setValue(value: number) {
        if (
            (min === undefined || value >= min) &&
            (max === undefined || value <= max)
        ) {
            setValue_(value)
        }
    }

    return [value, setValue]
}
