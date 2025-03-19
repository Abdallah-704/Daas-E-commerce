import "./Err404.css";
const Error404 = () => {
  return (
    <div className="flex-center position-r full-height">
      <div className="code">404</div>
      <div className="message" style={{ padding: "10px" }}>
        NOT FOUND
      </div>
    </div>
  );
};

export default Error404;
