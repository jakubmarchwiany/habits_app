import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    "& label": {
        color: theme.palette.secondary.main,
    },
    "& label.Mui-focused": {
        color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#616161",
        "&:hover fieldset": {
            borderColor: theme.palette.secondary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

type MyTextFieldType = {
    name: string;
    formik: any;
} & TextFieldProps;

const MyTextField = (props: MyTextFieldType) => {
    const { name, formik } = props;
    return (
        <StyledTextField
            {...props}
            variant="standard"
            fullWidth
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    );
};

export default MyTextField;
