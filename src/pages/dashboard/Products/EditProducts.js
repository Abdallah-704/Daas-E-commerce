import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { Axios } from "../../../API/Axios";
import { api_catagories, api_product } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import "../Dashboard.css";

const EditPropduct = () => {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    About: "",
    price: "",
    discount: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const focus = useRef([]);
  const box_upload = useRef();
  const progress = useRef([]);
  const ID_Image = useRef([]);
  const [editImages, setEditImages] = useState([]);
  const [idDeleteImages, setIdDeleteImages] = useState([]);

  // Get Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Axios.get(`${api_product}/${id}`);
        setForm(res.data[0]);
        setEditImages(res.data[0].images);
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Get All Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(api_catagories);
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Render Categories
  const all_categories = categories.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Delete Images
  async function handleDeleteImage(index) {
    const idImg = ID_Image.current[index];

    try {
      await Axios.delete(`product-img/${idImg}`);
      setImages((prev) => prev.filter((_, i) => i !== index));
      ID_Image.current = ID_Image.current.filter((id) => id !== idImg);
    } catch (err) {
      console.error(err);
    }
  }

  // Handle Delete Edit Images
  async function handleDeleteEditImage(id) {
    setEditImages((prev) => prev.filter((img) => img.id !== id));
    setIdDeleteImages((prev) => [...prev, id]);
  }

  // Handle Change Images
  async function handleChangeImages(e) {
    const selectedFiles = e.target.files;
    setImages((prev) => [...prev, ...selectedFiles]);
    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", selectedFiles[i]);
      formData.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.round((loaded / total) * 100);
            if (progress.current[i]) {
              progress.current[i].style.width = `${percent}%`;
            }
          },
        });
        ID_Image.current[i] = res.data.id; // Store the image ID
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Show Original Images
  const showImages = images.map((item, index) => (
    <div key={index} className="mt-3 p-3" style={{ border: "1px solid black" }}>
      <div className="box">
        <img
          src={URL.createObjectURL(item)}
          width="200"
          height="200"
          style={{ borderRadius: "10px" }}
          alt="Uploaded"
        />
        <p>
          {item.size / (1024 * 1024) < 1
            ? (item.size / 1024).toFixed(2) + " KB"
            : (item.size / (1024 * 1024)).toFixed(2) + " MB"}
        </p>
        <Button
          onClick={() => handleDeleteImage(index)}
          className="mb-3"
          variant="danger"
        >
          Delete
        </Button>
      </div>
      <div className="prog">
        <span
          className="inner"
          ref={(el) => (progress.current[index] = el)}
        ></span>
      </div>
    </div>
  ));

  // Show Edit Images
  const showEditImages = editImages.map((img) => (
    <div
      key={img.id}
      className="d-flex gap-1 justify-content-center mt-3 w-100 p-3"
      style={{ border: "1px solid black" }}
    >
      <div className="box gap-2 flex-column d-flex justify-content-center align-items-center">
        <img
          src={img.image}
          width="100"
          height="100"
          style={{ borderRadius: "10px" }}
          alt="Uploaded"
        />
        <Button
          onClick={() => handleDeleteEditImage(img.id)}
          className="mt-2 p-1"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  ));

  // Handle Submit Edit
  async function submitEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      for (let id of idDeleteImages) {
        await Axios.delete(`product-img/${id}`);
      }
      await Axios.post(`${api_product}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Handle Upload Image
  function handleUploadImage() {
    box_upload.current.click();
  }

  return (
    <>
      {loading && <Loading />}
      <Form className="w-100 p-2" onSubmit={submitEdit}>
        <Form.Group className="mb-3" controlId="categorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            name="category"
            required
            value={form.category}
            onChange={handleChange}
          >
            <option disabled>Select Category</option>
            {all_categories}
          </Form.Select>
        </Form.Group>

        {["title", "description", "About", "price", "discount"].map(
          (field, index) => (
            <Form.Group
              className="mb-3"
              controlId={`${field}Input`}
              key={index}
            >
              <Form.Label>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Form.Label>
              <Form.Control
                type="text"
                name={field}
                required
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}...`}
              />
            </Form.Group>
          )
        )}

        <Form.Group className="mb-3" controlId="imagesInput">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={box_upload}
            hidden
            multiple
            type="file"
            onChange={handleChangeImages}
          />
        </Form.Group>

        <div onClick={handleUploadImage}>
          <div
            className="p-3 pt-4 d-flex justify-content-center align-items-center flex-column"
            style={{ border: "2px dashed gray", cursor: "pointer" }}
          >
            <img
              width="100"
              height="100"
              src={require("../../../images/R (1).png")}
              alt="Upload"
            />
            <p className="fw-bold" style={{ color: "gray" }}>
              Upload
            </p>
          </div>
        </div>

        <div className="d-flex gap-2 align-items-center justify-content-center w-100">
          {showEditImages}
        </div>
        <div>{showImages}</div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 22px", marginTop: "10px" }}
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default EditPropduct;
