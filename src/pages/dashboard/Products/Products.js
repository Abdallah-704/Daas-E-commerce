import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { api_product, api_products } from "../../../API/Api";
import Tablecomp from "../../../components/Dashboard/TableShow";
const Products = () => {
  const [Products, setProducts] = useState([]);
  const [Page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get(`${api_products}?limit=${limit}&page=${Page}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
  }, [limit, Page]);

  const header = [
    {
      value: "title",
      name: "Title",
    },
    {
      value: "images",
      name: "Image",
    },
    {
      value: "description",
      name: "Description",
    },
    {
      value: "price",
      name: "Price",
    },
    {
      value: "discount",
      name: "Discount",
    },
    {
      value: "About",
      name: "About",
    },
    {
      value: "created_at",
      name: "Created",
    },
    {
      value:"updated_at",
      name: "Updated",
    }
  ];

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;
    try {
      await Axios.delete(`${api_product}/${id}`);
      alert("Item deleted successfully.");
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Tablecomp
        header={header}
        handleDelete={handleDelete}
        data={Products}
        limit={limit}
        Page={Page}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        API={api_product}
      />
    </div>
  );
};

export default Products;
