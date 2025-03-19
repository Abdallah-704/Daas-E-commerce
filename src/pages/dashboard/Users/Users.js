import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { api, api_user, api_users } from "../../../API/Api";
import Tablecomp from "../../../components/Dashboard/TableShow";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentuser, setCurrentuser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();

  useEffect(() => {
    Axios.get(`/${api_user}`)
      .then((response) => {
        setCurrentuser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${api}/${api_users}?limit=${limit}&page=${page}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [limit, page]);
  const header = [
    { value: "name", name: "Name" },
    { value: "email", name: "Email" },
    { value: "role", name: "Role" },
    { value: "created_at", name: "Created" },
    { value: "updated_at", name: "Updated" },
  ];

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      await Axios.delete(`${api_user}/${id}`);
      alert("User deleted successfully.");
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Tablecomp
        header={header}
        data={users}
        currentuser={currentuser}
        handleDelete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        Page={page}
        setPage={setPage}
        total={total}
        API={api_user}
      />
    </div>
  );
};

export default Users;
