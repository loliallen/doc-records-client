import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert, Color } from "@material-ui/lab";


interface AlertProps {
    text: string,
    open: boolean,
    onClose: () => void,
    severity: Color
}
export const Alert = ({
    text,
    open,
    onClose,
    severity
}: AlertProps) =>
    <Snackbar
        open={open}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
        }}
        onClose={onClose}
        autoHideDuration={3500}
    >
        <MuiAlert onClose={onClose} severity={severity}>{text}</MuiAlert>
    </Snackbar>
