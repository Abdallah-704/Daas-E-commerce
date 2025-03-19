import axios from "axios";
import { api } from "./Api";
import Cookie from 'cookie-universal' 
const cookie=Cookie()
const token=cookie.get("Bearer")
export const Axios =axios.create({
    baseURL:api,
    headers:{
        Authorization:"Bearer "+token
    }
})