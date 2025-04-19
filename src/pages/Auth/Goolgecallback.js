import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, api_google_back } from "../../API/Api";
import Cookie from 'cookie-universal'

const Googlecallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cookie = Cookie();
    const [error, setError] = useState("");

    useEffect(() => {
        async function googlecall() {
            try {
                const res = await axios.get(`${api}/${api_google_back}${location.search}`);
                const token = res.data.access_token;
                cookie.set("user", token);
                window.location.href = "/";
            } catch (err) {
                let errorMessage;
                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                } else if (err.message) {
                    errorMessage = err.message;
                } else {
                    errorMessage = "An error occurred during Google authentication";
                }
                setError(errorMessage);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        }

        googlecall();
    }, [navigate, location.search]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "red",
            textAlign: "center",
            padding: "20px"
        }}>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Googlecallback;
