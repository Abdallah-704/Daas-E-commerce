import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
    const { theme } = useTheme();

    return (
        <div className="dashboard" style={{
            minHeight: "100vh",
            backgroundColor: theme.colors.background
        }}>
            <Topbar />
            <div className='d-flex' style={{
                marginTop: "71px",
                minHeight: "calc(100vh - 71px)"
            }}>
                <Sidebar />
                <main style={{
                    flex: 1,
                    overflow: "auto",
                    backgroundColor: theme.colors.background
                }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;