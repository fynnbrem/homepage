import { Vector2 } from "math.gl"

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

/**Creates a vector with the `length`
 * that has a clockwise `angle` [rad] to the positive y-axis.*/
export function getRotatedVector(angle: number, length: number) {
    return new Vector2(Math.sin(angle) * length, -Math.cos(angle) * length)
}

/**Returns a random integer in the range `[start;stop)`.*/
export function randomInt(start: number = 0, stop: number = 1): number {
    return Math.floor(Math.random() * (stop - start)) + start
}

/**Returns a random float in the range `[start;stop)`.*/
export function randomFloat(start: number, stop: number): number {
    return Math.random() * (stop - start) + start
}

/**Returns a random item from the `items`.*/
export function getRandomItem<T>(items: T[]): T {
    return items[randomInt(0, items.length)]
}

/**Clamp the `value` between `min` and `max`.*/
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}