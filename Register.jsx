import axios from "axios";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Cookie from "cookie-universal";
import { Formik, Field, Form } from "formik";
import { StyledCotnaienr, StyledRegister, StyledForm, StyledcontainerInputs, StyledInput, Background } from "./StyledRegister"; // Corrected typo
import { ValidationSchema } from "./schema"; // Ensure this file exports the validation schema
import { api, api_register } from "../../../API/Api"; // Make sure these are correctly exported
import { useMediaQuery } from "@uidotdev/usehooks";

const Index = () => {
    const [loading, setLoading] = useState(false);
    const cookie = Cookie();
    const [err, setErr] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width : 769px) and (max-width : 992px)");

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    async function handleSubmit(values) {
        setLoading(true);
        setErr("");
        try {
            let res = await axios.post(`${api}/${api_register}`, values);
            setLoading(false);
            let token = res.data.token;
            cookie.set("Bearer", token);
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
                                    isSmallDevice={isSmallDevice}
                                    isMediumDevice={isMediumDevice}
                                >
                                    <Form className="form" noValidate>
                                        <StyledcontainerInputs
                                            isSmallDevice={isSmallDevice}
                                            isMediumDevice={isMediumDevice}

                                        >
                                            <h1 style={{
                                                color: "#1f1f74",
                                            }}>Sign In</h1>

                                            <div style={{
                                                margin: 'auto',
                                                width: '90%',
                                            }}>
                                                {/* Name Field */}
                                                <StyledInput
                                                    isSmallDevice={isSmallDevice}
                                                    isMediumDevice={isMediumDevice}>
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        className={`form-control ${submitAttempted && touched.name && errors.name ? 'is-invalid' : ''}`}
                                                    />
                                                    <label htmlFor="name">Name :</label>
                                                    {submitAttempted && touched.name && errors.name && (
                                                        <span className="error">{errors.name}</span>
                                                    )}
                                                </StyledInput>


                                                {/* Email Field */}
                                                <StyledInput
                                                    isMediumDevice={isMediumDevice}
                                                    isSmallDevice={isSmallDevice}>
                                                    <Field

                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className={`form-control ${submitAttempted && touched.email && errors.email ? 'is-invalid' : ''}`}
                                                    />
                                                    <label htmlFor="email">Email :</label>
                                                    {submitAttempted && touched.email && errors.email && (
                                                        <span className="error">{errors.email}</span>
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
                                                        className={`form-control ${submitAttempted && touched.password && errors.password ? 'is-invalid' : 'valid'}`}
                                                    />
                                                    <label htmlFor="password">Password :</label>
                                                    {submitAttempted && touched.password && errors.password && (
                                                        <span className="error">{errors.password}</span>
                                                    )}
                                                </StyledInput>
                                                {err !== "" && <span style={{
                                                    color: 'red',
                                                    display: "block",
                                                    textAlign: "start",
                                                    marginTop: "-20px",
                                                    marginBottom: "10px",
                                                    fontSize: "12px"
                                                }}>{err}</span>}

                                                {/* Register Button */}
                                                <button onClick={handleClick} type="submit" className="btn_1">
                                                    Register
                                                </button>

                                                {/* Google Sign-in Button */}
                                                <div className="google-btn">
                                                    <a className='d-flex align-items-center justify-content-center ' href={`http://127.0.0.1:8000/login-google`}>
                                                        <img style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "50%",
                                                            marginRight: "20px"
                                                        }} src={require('../../../images/search (1).png')} alt="" />
                                                        <p className="btn-text">Sign in with Google</p>
                                                    </a>
                                                </div>
                                            </div>
                                            {/* Error Message */}

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

export default Index;
