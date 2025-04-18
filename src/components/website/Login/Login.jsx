import axios from "axios";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Cookie from "cookie-universal";
import { Formik, Field, Form } from "formik";
import { StyledCotnaienr, StyledRegister, StyledForm, StyledcontainerInputs, StyledInput, Background } from "../Register/StyledRegister";
import { ValidationSchema } from "./schema";
import { api, api_login } from "../../../API/Api";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../images/logo.png';

const IndexLogin = () => {
    const [loading, setLoading] = useState(false);
    const cookie = Cookie();
    const [err, setErr] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width : 769px) and (max-width : 992px)");

    const initialValues = {
        email: "",
        password: "",
    };

    async function handleSubmit(values) {
        setLoading(true);
        setErr("");
        try {
            setLoading(false);
            let res = await axios.post(`${api}/${api_login}`, values);
            let token = res.data.token;
            const role = res.data.user.role;
            const to = role === "1995" ? "users" : role === "1999" ? "categories" : "writer";
            cookie.set("user", token);
            window.location.pathname = `/dashboard/${to}`;
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 422) {
                setErr("Email or password is wrong");
            } else {
                setErr("An error occurred. Please try again.");
            }
        }
    }

    const handleClick = () => {
        setSubmitAttempted(true);
    };

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
                                            }}>Welcome Back</h1>
                                            <p style={{
                                                color: "#666",
                                                fontSize: '0.9rem'
                                            }}>Login to your account</p>
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
                                                        className={`form-control ${submitAttempted && touched.password && errors.password ? "is-invalid" : ""}`}
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
                                                <label style={{
                                                    position: 'absolute',
                                                    left: "-5px",
                                                    top: values.password ? '-26px' : '18px',
                                                    opacity: values.password ? '1' : '0',
                                                    fontSize: '16px',
                                                    color: "#B8B8B8",
                                                    padding: '0 5px',

                                                    pointerEvents: 'none',
                                                    transition: "all 0.3s ease",
                                                    zIndex: 2,

                                                }} htmlFor="password">Password</label>
                                                {submitAttempted && touched.password && errors.password && (
                                                    <span className="error">{errors.password}</span>
                                                )}
                                            </StyledInput>

                                            {/* Forgot Password Link */}
                                            <div style={{
                                                textAlign: 'right',
                                                marginBottom: '1rem'
                                            }}>
                                                <Link
                                                    to="/forgot-password"
                                                    style={{
                                                        color: '#1f1f74',
                                                        textDecoration: 'none',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>

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

                                            {/* Login Button */}
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
                                                Login
                                            </button>

                                            {/* Google Login Button */}
                                            <div className="google-btn" style={{ marginBottom: '1rem' }}>
                                                <a
                                                    className="d-flex align-items-center justify-content-center"
                                                    href={`http://127.0.0.1:8000/login-google`}
                                                    style={{
                                                        borderRadius: '8px',
                                                        padding: '10px',
                                                        transition: 'all 0.3s ease',
                                                        textDecoration: 'none',

                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            marginRight: "12px",
                                                        }}
                                                        src={require("../../../images/search (1).png")}
                                                        alt=""
                                                    />
                                                    <span style={{
                                                        fontSize: "16",
                                                        fontWeight: "bold"
                                                    }}>
                                                        Continue with Google
                                                    </span>
                                                </a>
                                            </div>

                                            {/* Register Link */}
                                            <div style={{
                                                textAlign: 'center',
                                                marginTop: '1rem',
                                                color: '#666',
                                                fontSize: '0.9rem'
                                            }}>
                                                Don't have an account?{' '}
                                                <Link to="/register" style={{
                                                    color: '#1f1f74',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold'
                                                }}>
                                                    Register here
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

export default IndexLogin;
