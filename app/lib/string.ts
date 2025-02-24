/**Format the `value` to have at maximum `n` decimal places.
 * Leaves the rest of the value unmodified.*/
export function truncateToMaxDecimalPlaces(value: string, n: number): string {
    const [integerPart, decimalPart] = value.split(".")
    if (n === 0) {
        return integerPart
    }
    if (!decimalPart) {
        return value
    }
    const truncatedDecimal: string = decimalPart.slice(0, n)
    return `${integerPart}${truncatedDecimal ? "." + truncatedDecimal : ""}`
}
