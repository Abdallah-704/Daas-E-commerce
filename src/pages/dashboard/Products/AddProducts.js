import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { Axios } from "../../../API/Axios";
import { api_catagories, api_product } from "../../../API/Api";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const Addproducts = () => {
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
  const [id, setId] = useState(null);
  const [first_Sub, setFirst_Sub] = useState(false);
  const nav = useNavigate();
  const focus = useRef();
  const box_upload = useRef();
  const progress = useRef([]);
  const countForDivs = useRef(-1);
  const ID_Image = useRef([]);

  const Dummy_Form = {
    category: null,
    title: "dummy",
    description: "dummy",
    About: "dummy",
    price: 121,
    discount: 1,
  };

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

  // Get All categories
  const all_categories = categories.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  // Handle change form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFirst_Sub(true);
    if (!first_Sub) {
      firstSubmit();
    }
  }

  // Handle Delete Images
  async function HandleDeleteImage(index) {
    const IdImg = ID_Image.current[index];

    try {
      await Axios.delete(`product-img/${IdImg}`);
      setImages((prev) => prev.filter((_, i) => i !== index));
      ID_Image.current = ID_Image.current.filter((Id) => Id !== IdImg);
      countForDivs.current--;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(ID_Image);
  async function handleChangeImages(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();
      countForDivs.current++;
      formData.append("image", selectedFiles[i]);
      formData.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.round((loaded / total) * 100);
            if (progress.current[countForDivs.current]) {
              progress.current[
                countForDivs.current
              ].style.width = `${percent}%`;
              progress.current[countForDivs.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ID_Image.current[countForDivs.current] = res.data.id; // Store the image ID
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Show Images
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
          onClick={() => HandleDeleteImage(index)}
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

  // Handle SubmitEdit
  async function submitEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
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

  // Handle first FirstSubmit
  async function firstSubmit() {
    try {
      const res = await Axios.post(`${api_product}/add`, Dummy_Form);
      setId(res.data.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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
                disabled={!first_Sub}
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
            disabled={!first_Sub}
          />
        </Form.Group>

        <div onClick={handleUploadImage}>
          <div
            className="p-3 pt-4 d-flex justify-content-center align-items-center flex-column"
            style={{
              border: first_Sub ? "2px dashed blue" : "2px dashed gray",
              cursor: first_Sub ? "pointer" : "not-allowed",
            }}
          >
            <img
              style={{ filter: !first_Sub ? "grayscale(1)" : "" }}
              width="100"
              height="100"
              src={require("../../../images/R (1).png")}
              alt="Upload"
            />
            <p
              className="fw-bold"
              style={{ color: first_Sub ? "blue" : "gray" }}
            >
              Upload
            </p>
          </div>
        </div>

        <div>{showImages}</div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 22px", marginTop: "10px" }}
        >
          Add Product
        </button>
      </Form>
    </>
  );
};

export default Addproducts;
