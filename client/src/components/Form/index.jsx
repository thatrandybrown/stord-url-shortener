import { useState } from "react";
import Error from "../Error";
import Interstitial from "../Interstitial";
import { postShortLink } from "../../controllers/shortLink";

const state = {
  Loading: <Interstitial />,
  PostError: (
    <Error
      {...{
        // link: false,
        // heading: null,
        detail: "There was an error submitting your request. Please try again.",
      }}
    />
  ),
};

const Form = ({ setData }) => {
  const [url, setUrl] = useState("");
  const [display, setDisplay] = useState("");

  const post = (event) => {
    event.preventDefault();
    setDisplay("Loading");
    postShortLink(url)
      .then((rsp) => (rsp.ok ? rsp : Promise.reject("service call failed")))
      .then((rsp) => {
        setDisplay("");
        setUrl("");
        return rsp.json();
      })
      .then(setData)
      .catch((err) => setDisplay("PostError"));
  };

  return display === "PostError" ? (
    state[display]
  ) : (
    <>
      <p>
        Shorten your link: provide a full url and get a shortened link for
        sharing.
      </p>
      <form onSubmit={post}>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="url"
          name="url"
          required
          onChange={(event) => setUrl(event.target.value)}
          value={url}
        />
        {/* <label htmlFor="submit">
          Submit:
        </label> */}
        <input
          type="submit"
          name="submit"
          value="Shorten"
          disabled={url === ""}
          aria-label="Shorten"
        />
      </form>
      {display === "Loading" && state[display]}
    </>
  );
};

export default Form;
