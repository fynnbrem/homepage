/**Converts degree to radians.*/
export function degreeToRad(degree: number): number {
    return (degree / 180) * Math.PI
}

/**Converts radians to degree.*/
export function radToDegree(rad: number): number {
    return (rad * 180) / Math.PI
}

/**Rounds the number to the `n`-th decimal.
 * Positive `n`-values round after the decimal point, negative values before. */
export function roundTo(num: number, n: number = 0): number {
    const factor = 10 ** n
    return Math.round(num * factor) / factor
}

/**Floors the number to the `n`-th decimal.
 * Positive `n`-values round after the decimal point, negative values before. */
export function floorTo(num: number, n: number = 0): number {
    const factor = 10 ** n
    return Math.floor(num * factor) / factor
}
