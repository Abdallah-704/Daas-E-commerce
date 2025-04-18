import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../../components/Footer/Footer";
import { ScrollToTop } from "../../components/common";
import { useTheme } from "../../context/ThemeContext";

const Website = () => {
    const { theme } = useTheme();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: theme.colors.background,
            }}
        >
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Website;