import * as Yup from "yup";


export const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});
