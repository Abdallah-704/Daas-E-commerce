import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/Axios";
import { api_catagoriesAdd } from "../../../API/Api";
import Loading from "../../../components/loading/Loading";

const AddCategories = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${api_catagoriesAdd}/add`, form);
      console.log(res);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  const focus = useRef();
  useEffect(() => {
    focus.current.focus();
  });

  return (
    <>
      {loading && <Loading />}
      <Form onSubmit={submit} className="w-100 p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            ref={focus}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title..."
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button
          disabled={title.length > 1 ? false : true}
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 22px", marginTop: "10px" }}
        >
          Add Category
        </button>
      </Form>
    </>
  );
};

export default AddCategories;
