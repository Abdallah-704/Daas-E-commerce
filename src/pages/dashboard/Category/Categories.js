import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { api_catagories, api_catagoriesAdd } from "../../../API/Api";
import Tablecomp from "../../../components/Dashboard/TableShow";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  useEffect(() => {
    Axios.get(`${api_catagories}?limit=${limit}&page=${page}`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit, page]);

  const header = [
    {
      value: "title",
      name: "Title",
    },
    {
      value: "image",
      name: "Image",
    },{
      value:"created_at",
      name:"Created"
    }
    ,{
      value:"updated_at",
      name:"updated"
    }
  ];

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;
    try {
      await Axios.delete(`${api_catagoriesAdd}/${id}`);
      alert("Item deleted successfully.");
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Tablecomp
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        Page={page}
        header={header}
        handleDelete={handleDelete}
        data={categories}
        total={total}
        API={api_catagoriesAdd}
      />
    </div>
  );
};

export default Categories;
