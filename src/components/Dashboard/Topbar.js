import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/Menucontext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Axios } from "../../API/Axios";
import { api_logout, api_user } from "../../API/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Cookie from "cookie-universal";
const Topbar = () => {
  const menu = useContext(Menu);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();
  const nav = useNavigate();
  useEffect(() => {
    Axios.get(`${api_user}`).then((data) => setName(data.data.name));
  }, []);
  async function handlelogout() {
    try {
      setLoading(true);
      await Axios.get(`${api_logout}`);
      nav("/login");
      cookie.remove("Bearer");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="top_bar d-flex align-items-center justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="me-5">E-commerce</h3>
          <FontAwesomeIcon
            onClick={() => {
              menu.setisopen((prev) => !prev);
            }}
            style={{ cursor: "pointer" }}
            className="me-2"
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </>
  );
};

export default Topbar;
