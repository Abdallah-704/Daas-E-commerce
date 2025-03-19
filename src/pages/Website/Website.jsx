import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Website = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
export default Website