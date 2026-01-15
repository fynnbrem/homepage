import { Dispatch, SetStateAction } from "react"

export type State<S> = [S, Dispatch<SetStateAction<S>>]

/**A function that resolves after `ms` milliseconds. Does nothing by itself.*/
export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Resolves the `callback` only after a minimum duration of `ms` milliseconds.*/
export async function ResolveAfterDuration<Params, Result>(
    ms: number,
    callback: (p: Params) => Promise<Result>,
    params: Params,
): Promise<Result> {
    const [result] = await Promise.all([callback(params), delay(ms)])
    return result
}
