import { useState } from "react";
import Loading from "../../loading/Loading";
import { Formik, Field, Form } from "formik";
import { StyledCotnaienr, StyledRegister, StyledForm, StyledcontainerInputs, StyledInput, Background } from "../Register/StyledRegister";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Axios } from "../../../API/Axios";
import { api } from "../../../API/Api";

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width : 769px) and (max-width : 992px)");

    const initialValues = {
        email: "",
    };

    async function handleSubmit(values, { resetForm }) {
        setLoading(true);
        setErr("");
        setSuccess("");
        try {
            await Axios.post(`/${api}`, values);
            setSuccess("Password reset instructions have been sent to your email.");
            resetForm();
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setErr("No account found with this email address.");
            } else {
                setErr("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        setSubmitAttempted(true);
    };

    return (
        <Background>
            <div className="ani">
                {[...Array(7)].map((_, index) => (
                    <span key={index}></span>
                ))}
            </div>

            {loading && <Loading />}
            <StyledCotnaienr>
                <StyledRegister>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ touched, errors }) => (
                            <StyledForm
                                style={{
                                    minHeight: "350px"
                                }}
                                isSmallDevice={isSmallDevice}
                                isMediumDevice={isMediumDevice}
                            >
                                <Form className="form" noValidate>
                                    <StyledcontainerInputs
                                        isSmallDevice={isSmallDevice}
                                        isMediumDevice={isMediumDevice}
                                    >
                                        <div className="form-header" style={{
                                            textAlign: 'center',
                                            marginBottom: '2rem'
                                        }}>
                                            <h1 style={{
                                                color: "#1f1f74",
                                                marginBottom: '0.5rem'
                                            }}>Forgot Password?</h1>
                                            <p style={{
                                                color: "#666",
                                                fontSize: '0.9rem'
                                            }}>Enter your email to reset your password</p>
                                        </div>

                                        <div style={{ margin: "auto", width: "90%" }}>
                                            {/* Email Field */}
                                            <StyledInput
                                                isMediumDevice={isMediumDevice}
                                                isSmallDevice={isSmallDevice}
                                            >
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className={`form-control ${submitAttempted && touched.email && errors.email ? "is-invalid" : ""}`}
                                                />
                                                <label htmlFor="email">Email</label>
                                                {submitAttempted && touched.email && errors.email && (
                                                    <span className="error">{errors.email}</span>
                                                )}
                                            </StyledInput>

                                            {/* Error Message */}
                                            {err !== "" && (
                                                <span
                                                    style={{
                                                        color: "#dc3545",
                                                        display: "block",
                                                        textAlign: "start",
                                                        marginBottom: "10px",
                                                        fontSize: "0.85rem"
                                                    }}
                                                >
                                                    {err}
                                                </span>
                                            )}

                                            {/* Success Message */}
                                            {success !== "" && (
                                                <span
                                                    style={{
                                                        color: "#198754",
                                                        display: "block",
                                                        textAlign: "start",
                                                        marginBottom: "10px",
                                                        fontSize: "0.85rem"
                                                    }}
                                                >
                                                    {success}
                                                </span>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                onClick={handleClick}
                                                type="submit"
                                                className="btn_1"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                    marginBottom: '1rem',
                                                    backgroundColor: '#1f1f74',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Reset Password
                                            </button>

                                            {/* Back to Login Link */}
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: '1rem',
                                                color: '#666',
                                                fontSize: '0.9rem'
                                            }}>
                                                Remember your password?{' '}
                                                <Link to="/login" style={{
                                                    color: '#1f1f74',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold'
                                                }}>
                                                    Back to Login
                                                </Link>
                                            </div>
                                        </div>
                                    </StyledcontainerInputs>
                                </Form>
                            </StyledForm>
                        )}
                    </Formik>
                </StyledRegister>
            </StyledCotnaienr>
        </Background>
    );
};

export default ForgotPassword; 