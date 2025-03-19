import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/Axios";
import { api_user } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading_2, setLoading_2] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading_2(true);
      try {
        const response = await Axios.get(`${api_user}/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (err) {
        nav("/404", { replace: true });
      } finally {
        setLoading_2(false);
      }
    };
    fetchData();
  }, [id, nav]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading_2(true);
    try {
      await Axios.post(`${api_user}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      nav("/dashboard/users");
    } catch (err) {
      console.log(err);
      setError("An error occurred while saving the data.");
    } finally {
      setLoading_2(false);
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={submit} className="w-100 p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Edit name..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Label>Role:</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select option</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Manager Product</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={loading_2 && role !== ""}
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 22px" }}
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default User;
