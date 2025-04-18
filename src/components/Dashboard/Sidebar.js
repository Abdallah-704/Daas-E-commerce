import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../context/Menucontext";
import { useContext, useEffect, useState } from "react";
import { window_WI } from "../../context/Windowsize";
import { Axios } from "../../API/Axios";
import { api_user } from "../../API/Api";
import Loading from "../loading/Loading";
import { Links } from "./Navlink";

const Sidebar = () => {
  const menu = useContext(Menu);
  const open = menu.isopen;
  const widthWindo = useContext(window_WI);
  const N_width_window = widthWindo.widthwindow;
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${api_user}`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const links = Links.map(
    (link, key) =>
      users &&
      link.role.includes(users.role) && (
        <NavLink
          key={key}
          to={link.path}
          className={({ isActive }) =>
            `d-flex align-items-center bar_link fs-6 ${isActive ? "active" : ""}`
          }
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={link.icon} />
          </div>
          <p className={`link-text ${!open ? 'hidden' : ''}`}>
            {link.name}
          </p>
        </NavLink>
      )
  );

  return (
    <>
      {loading && <Loading />}
      <div
        className="sidebar-overlay"
        style={{
          display: N_width_window < 768 && open ? "block" : "none",
        }}
      ></div>
      <div
        className={`side_bar ${open ? 'expanded' : 'collapsed'}`}
        style={{
          left: N_width_window < 768 && !open ? "-100%" : 0,
          position: N_width_window < 768 ? "fixed" : "sticky",
        }}
      >
        {links}
      </div>
    </>
  );
};

export default Sidebar;
