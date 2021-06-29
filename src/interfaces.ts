import { ChangeEvent } from "react";

export interface ISelect {
    value: any
    onChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>):void
    error?: boolean
    helperText?: string
}