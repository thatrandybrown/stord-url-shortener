import "./style.css";

const Error = ({
  heading = "Oops!",
  detail = "Something went wrong!",
  link = true,
}) => {
  return (
    <section className="error-section">
      {heading && <h2 style={{ fontSize: "10rem" }}>{heading}</h2>}
      {detail && <p>{detail}</p>}
      {link && <a href="/">Navigate Home</a>}
    </section>
  );
};

export default Error;
