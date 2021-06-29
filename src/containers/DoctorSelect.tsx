import React, { useMemo } from 'react'
import { InputLabel, FormControl, MenuItem } from "@material-ui/core"
import {StyledSelect} from "../assets/Styled/Select"
import { ISelect } from '../interfaces'
import { FormHelperText } from '@material-ui/core'

interface DoctorSelectProps extends ISelect{
    value: string
}

export const DoctorSelect = ({
    value,
    onChange,
    error,
    helperText
}:DoctorSelectProps) => {
    const doctors = useMemo<string[]>(() => ["Петров", "Захаров", "Черниговская"], [])
    return (
        <FormControl
            fullWidth
        >
            <InputLabel htmlFor="patient__form__doctor_select">Лечащий врач</InputLabel>
            <StyledSelect
                id="patient__form__doctor_select"
                name="doctor-name"
                value={value}
                onChange={onChange}
                error={error}
            >
                {doctors.map((c:string, i) =>
                    <MenuItem key={i} value={i}>{c}</MenuItem>
                )}
            </StyledSelect>
            {error && <FormHelperText error={true}>{helperText}</FormHelperText>}
        </FormControl>
    )
}
