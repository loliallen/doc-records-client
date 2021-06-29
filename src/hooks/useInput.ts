import { ChangeEvent, useState } from "react"

export const useInput = <T>(initalValue: T | string) => {
    const [value, setValue] = useState(initalValue)

    const onChange = <T>(e: ChangeEvent<T & (HTMLInputElement | HTMLTextAreaElement)>) => setValue(e.target.value)

    return {
        bind: {
            value,
            onChange
        },
        value,
        setValue
    }
}