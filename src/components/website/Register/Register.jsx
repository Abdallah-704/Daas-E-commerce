import axios from "axios";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Cookie from "cookie-universal";
import { Formik, Field, Form } from "formik";
import { StyledCotnaienr, StyledRegister, StyledForm, StyledcontainerInputs, StyledInput, Background } from "./StyledRegister";
import { ValidationSchema } from "./schema";
import { api, api_register } from "../../../API/Api";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../images/logo.png';

const Index = () => {
    const [loading, setLoading] = useState(false);
    const cookie = Cookie();
    const [err, setErr] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width : 769px) and (max-width : 992px)");

    const initialValues = {
        name: "",
        email: "",
        password: "",
        acceptTerms: false
    };

    async function handleSubmit(values, { setFieldError }) {
        if (!values.acceptTerms) {
            setFieldError('acceptTerms', 'You must accept the Terms and Privacy Policy');
            return;
        }

        setLoading(true);
        setErr("");
        try {
            let res = await axios.post(`${api}/${api_register}`, values);
            setLoading(false);
            let token = res.data.token;
            cookie.set("user", token);
            window.location.pathname = "/";
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 422) {
                setErr("Email is already taken");
            } else {
                console.log(err);
                setErr("An error occurred, please try again.");
            }
        }
    }

    const handleClick = () => {
        setSubmitAttempted(true);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        {({ touched, errors, values }) => (
                            <StyledForm
                                isSmallDevice={isSmallDevice}
                                isMediumDevice={isMediumDevice}
                            >
                                <Form className="form" noValidate>
                                    <StyledcontainerInputs
                                        isSmallDevice={isSmallDevice}
                                        isMediumDevice={isMediumDevice}
                                    >
                                        {/* Logo */}
                                        <div style={{
                                            textAlign: 'center',

                                        }}>
                                            <img
                                                src={logo}
                                                alt="Logo"
                                                style={{
                                                    width: '100px',
                                                    height: 'auto',

                                                }}
                                            />
                                        </div>

                                        <div className="form-header" style={{
                                            textAlign: 'center',
                                            marginBottom: '2rem'
                                        }}>
                                            <h1 style={{
                                                color: "#1f1f74",
                                                marginBottom: '0.5rem'
                                            }}>Create Account</h1>
                                            <p style={{
                                                color: "#666",
                                                fontSize: '0.9rem'
                                            }}>Join our e-commerce community today</p>
                                        </div>

                                        <div style={{ margin: "auto", width: "90%" }}>
                                            {/* Name Field */}
                                            <StyledInput
                                                isMediumDevice={isMediumDevice}
                                                isSmallDevice={isSmallDevice}
                                            >
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className={`form-control ${submitAttempted && touched.name && errors.name ? 'is-invalid' : ''}`}
                                                />
                                                <label htmlFor="name">Name</label>
                                                {submitAttempted && touched.name && errors.name && (
                                                    <span className="error">{errors.name}</span>
                                                )}
                                            </StyledInput>

                                            {/* Email Field */}
                                            <StyledInput
                                                isMediumDevice={isMediumDevice}
                                                isSmallDevice={isSmallDevice}
                                            >
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className={`form-control ${submitAttempted && touched.email && errors.email ? 'is-invalid' : ''}`}
                                                />
                                                <label htmlFor="email">Email</label>
                                                {submitAttempted && touched.email && errors.email && (
                                                    <span className="error">{errors.email}</span>
                                                )}
                                            </StyledInput>

                                            {/* Password Field */}
                                            <StyledInput
                                                isMediumDevice={isMediumDevice}
                                                isSmallDevice={isSmallDevice}
                                            >
                                                <div style={{ position: 'relative' }}>
                                                    <Field
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        className={`form-control ${submitAttempted && touched.password && errors.password ? 'is-invalid' : 'valid'}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '0',
                                                            color: '#1f1f74'
                                                        }}
                                                    >
                                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                    </button>
                                                </div>
                                                <label
                                                    htmlFor="password"
                                                    style={{
                                                        position: 'absolute',
                                                        left: "-5px",
                                                        top: values.password ? '-26px' : '18px',
                                                        opacity: values.password ? '1' : '0',
                                                        fontSize: '16px',
                                                        color: 'rgba(128, 128, 128, 0.555)',
                                                        background: 'white',
                                                        padding: '0 4px',
                                                        pointerEvents: 'none',
                                                        transition: "all 0.3s ease",
                                                        backgroundColor: "transparent"
                                                    }}
                                                >Password</label>
                                                {submitAttempted && touched.password && errors.password && (
                                                    <span className="error">{errors.password}</span>
                                                )}
                                            </StyledInput>

                                            {/* Terms and Privacy Acceptance */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems:'center',
                                                gap: '10px',
                                                marginBottom: "4px",
                                                marginTop: "-30px",
                                                padding: '12px',
                                                backgroundColor: "transparent",
                                                borderRadius: '8px',
                                                position: "relative"
                                            }}>
                                                <Field
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                    id="acceptTerms"
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        accentColor: '#1f1f74',
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        top: '2px',
                                                        marginRight:"10px"
                                                    }}
                                                />
                                                <label
                                                    htmlFor="acceptTerms"
                                                    style={{
                                                        fontSize: isSmallDevice ? '0.7rem' : '0.9rem',
                                                        color: '#666',
                                                        margin: '0',
                                                        cursor: 'pointer',
                                                       
                                                        position: 'relative',
                                                        top: '0'
                                                    }}
                                                >
                                                    I accept the{' '}
                                                    <Link
                                                        to="/terms"
                                                        style={{
                                                            color: '#1f1f74',
                                                            textDecoration: 'none',
                                                            fontWeight: '500',
                                                            borderBottom: '1px solid #1f1f74'
                                                        }}
                                                    >
                                                        Terms of Service
                                                    </Link>
                                                    {' '}and{' '}
                                                    <Link
                                                        to="/privacy"
                                                        style={{
                                                            color: '#1f1f74',
                                                            textDecoration: 'none',
                                                            fontWeight: '500',
                                                            borderBottom: '1px solid #1f1f74'
                                                        }}
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                </label>
                                            </div>
                                            {submitAttempted && touched.acceptTerms && errors.acceptTerms && (
                                                <span
                                                    className="error"
                                                    style={{
                                                        marginTop: '-0.5rem',
                                                        marginBottom: '1rem',
                                                        display: 'block',
                                                        color: '#dc3545',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    {errors.acceptTerms}
                                                </span>
                                            )}

                                            {err !== "" && <span style={{
                                                color: 'red',
                                                display: "block",
                                                textAlign: "start",
                                                marginTop: "-10px",
                                                marginBottom: "10px",
                                                fontSize: "12px"
                                            }}>{err}</span>}

                                            {/* Register Button */}
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
                                                Register
                                            </button>

                                            {/* Login Link */}
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: '1rem',
                                                color: '#666',
                                                fontSize: '0.9rem'
                                            }}>
                                                Already have an account?{' '}
                                                <Link to="/login" style={{
                                                    color: '#1f1f74',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold'
                                                }}>
                                                    Login here
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

export default Index;

