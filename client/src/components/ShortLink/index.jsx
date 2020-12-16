import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";
import Interstitial from "../Interstitial";
import NotFound from "../NotFound";
import { getShortLink } from "../../controllers/shortLink";

const state = {
  Loading: <Interstitial />,
  NotFound: <NotFound />,
};

const ShortLink = () => {
  const [display, setDisplay] = useState("Loading");
  let { id } = useParams();

  useEffect(() => {
    getShortLink(id)
      .then((rsp) => {
        if (rsp.type === "opaqueredirect")
          return window.location.assign(rsp.url);
        else if (rsp.status === 404) return setDisplay("NotFound");
        else {
          /**(rsp.status === 500)**/ return setDisplay("Error");
        }
      })
      .catch((err) => setDisplay("Error"));
  }, [id]);

  return state[display] || <Error />;
};

export default ShortLink;
