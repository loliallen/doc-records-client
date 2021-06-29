import { debounce } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { StyledTextField } from '../../assets/Styled/TextField'
import { ISelect } from '../../interfaces'

const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
const token = "670922efbe45ef1a5bf4ba126371fc3601bf1d02";

interface FullnameFieldProps extends ISelect {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}


export const FullnameField = ({ value, setValue, ...props }: FullnameFieldProps) => {
    const [options, setOptions] = useState<any[]>([])
    const [option, setOption] = useState<any>(null)

    useEffect(() => {

        const getSuggestions = async (value: string) => {
            console.log(new Date().toLocaleTimeString(), value)
            var options: RequestInit = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({ query: value })
            }
            try {
                let response = await fetch(url, options)
                let data = await response.json()

                setOptions(data.suggestions || [])
            } catch (e) {
                setOptions([])
            }
        }
        const getSuggestionsDebounced = debounce(getSuggestions, 1000)

        if (option)
            getSuggestionsDebounced(option)
    }, [option])

    return (
        <div>
            <Autocomplete
                freeSolo
                options={options.map(o => o.value)}
                value={option}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        label="ФИО"
                        fullWidth
                        error={props.error}
                        helperText={props.helperText}
                    />
                )}
                onChange={(event, newValue) => {
                    setOption(newValue);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setOption(newInputValue);
                    setValue(newInputValue);
                }}
            />
        </div>
    )
}
