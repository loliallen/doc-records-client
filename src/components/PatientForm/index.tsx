import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Paper, InputLabel, Checkbox, Button, Typography } from "@material-ui/core"
import { StyledTextField } from '../../assets/Styled/TextField'
import { useInput } from '../../hooks/useInput'
import { SexSelect } from "../../containers/SexSelect"
import { ClientGroupSelect } from "../../containers/ClientGroupSelect"
import { DoctorSelect } from "../../containers/DoctorSelect"
import { Alert } from "../../containers/Alert"
import { FullnameField } from "../FullnameField"
import "./style.css"


interface IErrors {
    fullname: string
    birthday: string
    phone: string
    sex: string
    doctor: string
    clientGroup: string
}


export const PatientForm = () => {
    const fullname = useInput<string>("")
    const birthday = useInput<string>("1111-11-11")
    const phone = useInput<string>("7")
    const [sex, setSex] = useState<string>("")
    const [doctor, setDoctor] = useState<string>("")

    const [clientGroup, setClientGroup] = useState<string[]>([])
    const [sendSms, setSendSms] = useState<boolean>(false)
    const [alert, setAlert] = useState({
        open: false,
        text: ""
    })

    const [errors, setErrors] = useState<IErrors>(
        {
            fullname: "",
            birthday: "",
            phone: "",
            sex: "",
            doctor: "",
            clientGroup: ""
        }
    )

    const handleChangeGroup = (e: React.ChangeEvent<{ value: unknown }>) => setClientGroup(e.target.value as string[])
    const handleChangeSex = (e: React.ChangeEvent<{ value: unknown }>) => setSex(e.target.value as string)
    const handleChangeDoctor = (e: React.ChangeEvent<{ value: unknown }>) => setDoctor(e.target.value as string)
    const handleChangeSendSms = (e: React.ChangeEvent<{ checked: unknown }>) => setSendSms(e.target.checked as boolean)
    const handleChangePhone = (e: React.ChangeEvent<{ value: unknown }>) => {
        let value = e.target.value as string
        if (value.length > 11)
            return
        if (value.length < 1)
            return phone.setValue("7")
        return phone.bind.onChange(e as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    }
    const handleCloseAlert = () => setAlert(p => ({...p, open: false}))

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let passed = true
        if (fullname.value.split(" ").length <= 1) {
            passed = false
            setErrors(p => ({ ...p, fullname: "Вы должны указать полное ФИО" }))
        } else {
            setErrors(p => ({ ...p, fullname: "" }))
        }
        if (birthday.value === "1111-11-11") {
            passed = false
            setErrors(p => ({ ...p, birthday: "Вы должны указать свой день рождения" }))
        } else {
            setErrors(p => ({ ...p, birthday: "" }))
        }
        if (!(/^7[489][0-9]{9}/.test(phone.value))) {
            passed = false
            setErrors(p => ({ ...p, phone: "Вы указали неверный номер телефона" }))
        } else {
            setErrors(p => ({ ...p, phone: "" }))
        }
        if (sex.length === 0) {
            passed = false
            setErrors(p => ({ ...p, sex: "Вы должны указать свой пол" }))
        } else {
            setErrors(p => ({ ...p, sex: "" }))
        }
        if (doctor === "") {
            passed = false
            setErrors(p => ({ ...p, doctor: "Вы должны выбрать доктора" }))
        } else {
            setErrors(p => ({ ...p, doctor: "" }))
        }
        if (clientGroup.length === 0) {
            passed = false
            setErrors(p => ({ ...p, clientGroup: "Вы должны выбрать свою клиентскую группу" }))
        } else {
            setErrors(p => ({ ...p, clientGroup: "" }))
        }

        if (passed) {
            // toggle alert
            setAlert({
                text: sendSms ? "Заявка отправлена, за день и за час к вам придет уведомление" : "Заявка отправлена",
                open: true
            })
        }
    }

    return (
        <Paper className="patient__form_container">
            <form className="patient__form" onSubmit={handleSubmit}>
                <div className="header">
                    <Typography variant="h5">Персональная информация</Typography>
                </div>
                <div className="fullname__container">
                    <FullnameField
                        {...fullname}
                        onChange={fullname.bind.onChange}
                        error={Boolean(errors.fullname)}
                        helperText={errors.fullname}
                    />
                </div>
                <div className="bd_sex__container">
                    <StyledTextField
                        fullWidth
                        type="date"
                        label="День рождения"
                        {...birthday.bind}
                        error={Boolean(errors.birthday)}
                        helperText={errors.birthday}
                    />
                    <SexSelect
                        value={sex}
                        onChange={handleChangeSex}
                        error={Boolean(errors.sex)}
                        helperText={errors.sex}
                    />
                    <div className="phone__container">
                        <StyledTextField
                            fullWidth
                            label="Номер телефона"
                            value={phone.bind.value}
                            onChange={handleChangePhone}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                        />
                    </div>
                </div>

                <div className="header">
                    <Typography variant="h5">Информация о пациенте</Typography>
                </div>
                <div className="select_client_group__container">
                    <ClientGroupSelect
                        value={clientGroup}
                        onChange={handleChangeGroup}
                        error={Boolean(errors.clientGroup)}
                        helperText={errors.clientGroup}
                    />
                </div>
                <div className="select_doctor__container">
                    <DoctorSelect
                        value={doctor}
                        onChange={handleChangeDoctor}
                        error={Boolean(errors.doctor)}
                        helperText={errors.doctor}
                    />
                </div>
                <div className="send_sms__container">
                    <Checkbox id="patient__form__send_sms_checkbox" value={sendSms} onChange={handleChangeSendSms} />
                    <InputLabel htmlFor="patient__form__send_sms_checkbox">Отправить смс</InputLabel>
                </div>
                <div className="submit__container">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Отправить
                    </Button>
                </div>
            </form>
            <Alert 
                severity={sendSms ? "info" : "success"}
                onClose={handleCloseAlert}
                {...alert}
            />
        </Paper>
    )
}
