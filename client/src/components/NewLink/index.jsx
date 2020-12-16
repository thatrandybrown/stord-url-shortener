import "./style.css";

const copyLink = (event) => {
  const selection = window.getSelection();
  selection.removeAllRanges();

  const range = document.createRange();
  range.selectNodeContents(document.querySelector(".shortLink"));
  selection.addRange(range);

  document.execCommand("Copy");
  selection.removeAllRanges();
};

const NewLink = ({ data }) =>
  data && data.target && data.shortCode ? (
    <section className="notice">
      <p>
        <a href={data.target}>{data.target}</a> is now{" "}
        <a
          className="shortLink"
          href={`${window.location.href}${data.shortCode}`}
        >
          {window.location.href}
          {data.shortCode}
        </a>
      </p>
      <button onClick={copyLink}>Copy!</button>
    </section>
  ) : null;

export default NewLink;
