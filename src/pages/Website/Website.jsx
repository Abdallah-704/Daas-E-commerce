import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "../../components/Footer"
import { ScrollToTop } from "../../components/common"

const Website = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Website