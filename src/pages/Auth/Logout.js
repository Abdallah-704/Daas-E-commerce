import { useNavigate } from 'react-router-dom';
import { api_logout } from '../../API/Api'
import { Axios } from '../../API/Axios'
import Cookie from 'cookie-universal'
const cookie = Cookie();
const Logout = () => {
    const nav = useNavigate();
    const handlelogout = () => {
        Axios.get(`/${api_logout}`
        ).then(data => {
            console.log(data)
            cookie.remove("Bearer")
            cookie.remove("user")
            nav('/login')
        })
    }
    return (
        <button onClick={handlelogout}>logout</button>
    );
}

export default Logout;