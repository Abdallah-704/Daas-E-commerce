import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api, api_google_back } from "../../API/Api";
import Cookie from 'cookie-universal'
const Googlecallback = () => {
    const location = useLocation();
    const cookie = Cookie()
    useEffect(() => {
        async function googlecall() {
            try {
                const res = await axios.get(`${api}/${api_google_back}${location.search}`);
                const token = res.data.access_token
                cookie.set("Bearer", token)
                window.location.href = "/"
            } catch (err) {
                console.log(err);
            }
        }

        googlecall();
    }, []);

    return (<></>);
}

export default Googlecallback;
