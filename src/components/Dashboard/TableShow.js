import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaginatedItems } from "./pagintions/Paginations";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import TransformDate from "../../Date/TransformDate";

const Tablecomp = ({
  limit,
  setPage,
  header,
  data,
  currentuser,
  handleDelete,
  setLimit,
  total,
  loading,
  API,
}) => {
  const current = currentuser || { name: "" };
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Filter data based on date and search
  const filteredByDate = data.filter(item => TransformDate(item.created_at) === date);
  const filteredBySearchAndDate = filterData.filter(item => TransformDate(item.created_at) === date);

  const WhichData = date.length > 0
    ? search.length > 0 ? filteredBySearchAndDate : filteredByDate
    : search.length > 0 ? filterData : data;

  // Fetch search results
  const fetchSearchData = async () => {
    setSearchLoading(true);
    try {
      const res = await Axios.post(`${API}/search?title=${search}`);
      setFilterData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 0) fetchSearchData();
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  // Render table rows
  const renderTableRow = (item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      {header.map((headerItem, index) => {
        const value = item[headerItem.value];

        // Handle different types of data
        if (headerItem.value === "image") {
          return (
            <td style={{ fontSize: "14px", color: "gray" }} key={index}>
              {value ? (
                <img src={value} width="50px" height="50px" style={{ borderRadius: "10px" }} alt="User" />
              ) : "No Image"}
            </td>
          );
        } else if (headerItem.value === "images") {
          return (
            <td style={{ fontSize: "14px", color: "gray" }} key={index}>
              <div className="d-flex flex-wrap gap-2" style={{ width: "180px" }}>
                {value?.map((img, imgIndex) => (
                  <img key={imgIndex} src={img.image} width="40px" height="40px" alt="products" />
                ))}
              </div>
            </td>
          );
        } else if (headerItem.value === "created_at" || headerItem.value === "updated_at") {
          return (
            <td style={{ fontSize: "14px", color: "gray" }} key={index}>
              {TransformDate(value)}
            </td>
          );
        } else if (value !== undefined) {
          // Handle role-specific values
          let displayValue = value;
          if (value === "1995") displayValue = "Admin";
          else if (value === "2001") displayValue = "User";
          else if (value === "1996") displayValue = "Writer";
          else if (value === "1999") displayValue = "Product Manager";
          else if (value === current.name) displayValue = `${value} (You)`;

          return (
            <td style={{ fontSize: "14px", color: "gray" }} key={index}>
              {displayValue}
            </td>
          );
        } else {
          return (
            <td style={{ fontSize: "14px", color: "gray" }} key={index}>
              N/A
            </td>
          );
        }
      })}
      <td>
        <div className="d-flex align-items-center gap-5">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"22px"} icon={faPenSquare} />
          </Link>
          {current.name !== item.name && (
            <FontAwesomeIcon
              color="red"
              cursor={"pointer"}
              fontSize={"22px"}
              onClick={() => handleDelete(item.id)}
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Search and Date Inputs */}
      <div style={{ width: "300px", margin: "0 0 20px 0" }}>
        <Form.Control
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-3" style={{ width: "300px", margin: "0 0 20px 0" }}>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={{
        overflow: "auto"
      }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              {header.map((item, index) => <th key={index}>{item?.name || "No Name"}</th>)}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading || searchLoading ? (
              <tr>
                <td colSpan={12} className="text-center">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : search.length > 0 && filterData.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center">No results</td>
              </tr>
            ) : data.length > 0 ? (
              WhichData.map(renderTableRow)
            ) : (
              <tr>
                <td colSpan={12} className="text-center">No Data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination and Limit Selector */}
      <div className="d-flex px-2 w-100 justify-content-end">
        <Form.Select
          style={{ width: "60px", margin: "0 20px 0 0", padding: "0 0 0 10px" }}
          onChange={(e) => setLimit(e.target.value)}
        >
          {[10, 5, 3, 1].map((value) => <option key={value} value={value}>{value}</option>)}
        </Form.Select>
        <PaginatedItems setPage={setPage} total={total} itemsPerPage={limit} />
      </div>
    </>
  );
};

export default Tablecomp;