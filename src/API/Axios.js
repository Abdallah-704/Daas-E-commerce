import axios from "axios";
import { api } from "./Api";
import Cookie from 'cookie-universal';

const cookie = Cookie();

// Create a single Axios instance with all configuration
const Axios = axios.create({
    baseURL: api,
    headers: {
        "Authorization": `Bearer ${cookie.get("user")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});
export { Axios };