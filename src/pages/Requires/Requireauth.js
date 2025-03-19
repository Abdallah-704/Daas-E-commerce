import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import Loading from "../../components/loading/Loading";
import Error403 from "../Error/Err403";
import { api_user } from "../../API/Api";

export default function Requireauth({ allowedRole }) {
  const cookie = Cookie();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = cookie.get("Bearer");

  useEffect(() => {
    setLoading(true);

    if (token) {
      Axios.get(`/${api_user}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [navigate, token]);

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return allowedRole.includes(user.role) ? (
    <Outlet />
  ) : (
    <Error403 role={user.role} />
  );
}
