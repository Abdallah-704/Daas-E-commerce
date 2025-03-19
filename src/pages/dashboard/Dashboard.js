import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Topbar />
           <div className='d-flex justify-content-between' style={{marginTop:"71px"}}>
           <Sidebar />
           <Outlet />
           </div>
        </div>
    );
}
 
export default Dashboard;