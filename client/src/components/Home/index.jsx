import { useState } from "react";
import Form from "../Form";
import NewLink from "../NewLink";

const Home = () => {
  let [data, setData] = useState({});

  return (
    <>
      <Form {...{ setData }} />
      {data && <NewLink {...{ data }} />}
    </>
  );
};

export default Home;
