import { Link } from "react-router-dom";

const Error403 = ({ role }) => {
  return (
    <>

      <div style={{ width: "100%", padding: "30px" }}>
        <h1 style={{ fontSize: "50px" }}>403 Forbidden</h1>
        <p className="fs-4">you don't have access to this page !!</p>
        <Link
          className="text-decoration-none fs-3"
          to={role === "1996" ? "/dashboard/writer" : "/"}
        >
          {role === "1996" ? "Go to page writer" : "GO to home page"}
        </Link>
      </div>
    </>
  );
};

export default Error403;
