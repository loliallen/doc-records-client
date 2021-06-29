import React, { useMemo } from 'react'
import {InputLabel,FormControl, MenuItem, Checkbox, FormHelperText } from "@material-ui/core"
import {StyledSelect} from "../assets/Styled/Select"
import { ISelect } from '../interfaces'

interface ClientGroupSelectProps extends ISelect{
    value: string[]
}

export const ClientGroupSelect = ({
    value,
    onChange,
    error,
    helperText
}:ClientGroupSelectProps) => {


    const clientGroups = useMemo<string[]>(() => ["VIP", "Проблемные", "ОМС", "ДМС"], [])
    return (
        <FormControl
            fullWidth
        >
            <InputLabel htmlFor="patient__form__client_group_select">Группа клиентов</InputLabel>
            <StyledSelect
                id="patient__form__client_group_select"
                name="client-group"
                multiple={true}
                value={value}
                onChange={onChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
                error={error}
           >
                {clientGroups.map((c, i) =>
                    <MenuItem key={i} value={c}>
                        <Checkbox checked={value.indexOf(c) > -1}/>
                        {c}
                    </MenuItem>
                )}
            </StyledSelect>

            { error && <FormHelperText error={true}>{helperText}</FormHelperText>}
        </FormControl>
    )
}
