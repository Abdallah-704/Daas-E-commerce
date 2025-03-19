import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../API/Axios";
import { api_catagoriesAdd } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";

const EditCategory = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [loading_2, setLoading_2] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading_2(true);
      try {
        const response = await Axios.get(`${api_catagoriesAdd}/${id}`);
        setTitle(response.data.title);
      } catch (err) {
        nav("/404", { replace: true });
        console.log(err);
      } finally {
        setLoading_2(false);
      }
    };
    fetchData();
  }, [id, nav]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading_2(true);
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${api_catagoriesAdd}/edit/${id}`, form);
      nav("/dashboard/categories");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading_2(false);
    }
  };

  return (
    <>
      {loading_2 && <Loading />}
      <Form onSubmit={submit} className="w-100 p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit Title..."
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button
          disabled={loading_2 && title}
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

export default EditCategory;
