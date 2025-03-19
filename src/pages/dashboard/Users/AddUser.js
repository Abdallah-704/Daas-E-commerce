import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/Axios";
import { api_user } from "../../../API/Api";
import Loading from "../../../components/loading/Loading";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = useRef();
  useEffect(() => {
    focus.current.focus();
  });

  async function submit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${api_user}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form onSubmit={submit} className="w-100 p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            ref={focus}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Role:</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select option
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={role !== "" ? false : true}
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 22px" }}
        >
          Add User
        </button>
      </Form>
    </>
  );
};

export default AddUser;
