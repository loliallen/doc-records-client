import React from 'react'
import { InputLabel, FormControl, MenuItem, FormHelperText } from "@material-ui/core"
import { StyledSelect } from "../assets/Styled/Select"
import { ISelect } from '../interfaces'

interface SexSelectProps extends ISelect {
    value: string
}

export const SexSelect = ({
    value,
    onChange,
    error,
    helperText
}: SexSelectProps) => {
    return (

        <FormControl
            fullWidth
        >
            <InputLabel htmlFor="patient__form__sex_select">Пол</InputLabel>
            <StyledSelect
                id="patient__form__sex_select"
                name="sex"
                value={value}
                onChange={onChange}
                error={error}
            >
                <MenuItem value="male">М</MenuItem>
                <MenuItem value="female">Ж</MenuItem>
            </StyledSelect>
            {error && <FormHelperText error={true}>{helperText}</FormHelperText>}
        </FormControl>
    )
}
