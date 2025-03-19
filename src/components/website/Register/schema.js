import * as Yup from "yup";

const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const valipassword = /^(?=.*[a-z])(?=.*[$%^&*()#@!|])(?=.*[0-9]).{6,}$/;

export const ValidationSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Name is required'),
    email: Yup.string()
        .matches(validEmail, 'Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .matches(valipassword, 'Password must contain at least one lowercase letter, one special character, and one number')
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});
