import axios from "axios";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Cookie from "cookie-universal";
import { Formik, Field, Form } from "formik";
import { StyledCotnaienr, StyledRegister, StyledForm, StyledcontainerInputs, StyledInput, Background } from "../Register/StyledRegister"; // Ensure this file is correct
import { ValidationSchema } from "./schema"; // Define validation schema for email and password
import { api, api_login } from "../../../API/Api"; // Ensure correct API imports
import { useMediaQuery } from "@uidotdev/usehooks";

const IndexLogin = () => {
    const [loading, setLoading] = useState(false);
    const cookie = Cookie();
    const [err, setErr] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

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
            let res = await axios.post(`${api}/${api_login}`, values);
            setLoading(false);
            let token = res.data.token;
            const role = res.data.user.role;
            const to = role === "1995" ? "users" : role === "1999" ? "categories" : "writer";
            cookie.set("Bearer", token);
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

    return (
        <>
            <Background>
                <div className="ani">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
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
                                    <Form
                                        className="form"
                                        noValidate>
                                        <StyledcontainerInputs
                                            isSmallDevice={isSmallDevice}
                                            isMediumDevice={isMediumDevice}
                                        >
                                            <h1 style={{
                                                color: "#1f1f74",

                                            }}>Login Now</h1>

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
                                                        className={`form-control ${submitAttempted &&
                                                            touched.email &&
                                                            errors.email
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    <label htmlFor="email">Email :</label>
                                                    {submitAttempted &&
                                                        touched.email &&
                                                        errors.email && (
                                                            <span className="error">
                                                                {errors.email}
                                                            </span>
                                                        )}
                                                </StyledInput>

                                                {/* Password Field */}
                                                <StyledInput
                                                    isMediumDevice={isMediumDevice}
                                                    isSmallDevice={isSmallDevice}
                                                >
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        className={`form-control ${submitAttempted &&
                                                            touched.password &&
                                                            errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    <label htmlFor="password">Password :</label>
                                                    {submitAttempted &&
                                                        touched.password &&
                                                        errors.password && (
                                                            <span className="error">
                                                                {errors.password}
                                                            </span>
                                                        )}
                                                </StyledInput>

                                                {err !== "" && (
                                                    <span
                                                        style={{
                                                            color: "red",
                                                            display: "block",
                                                            textAlign: "start",
                                                            marginTop: "-20px",
                                                            marginBottom: "10px",
                                                            fontSize: "12px",
                                                            backgroundColor: "transparent"
                                                        }}
                                                    >
                                                        {err}
                                                    </span>
                                                )}
                                                {/* Error Message */}

                                                {/* Login Button */}
                                                <button
                                                    onClick={handleClick}
                                                    type="submit"
                                                    className="btn_1"
                                                >
                                                    Login
                                                </button>

                                                {/* Google Login Button */}
                                                <div className="google-btn">
                                                    <a
                                                        className="d-flex align-items-center justify-content-center"
                                                        href={`http://127.0.0.1:8000/login-google`}
                                                    >
                                                        <img
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                                borderRadius: "50%",
                                                                marginRight: "20px",
                                                            }}
                                                            src={require("../../../images/search (1).png")}
                                                            alt=""
                                                        />
                                                        <p className="btn-text">Login with Google</p>

                                                    </a>
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
        </>
    );
};

export default IndexLogin;
