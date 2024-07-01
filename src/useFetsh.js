import { useEffect, useState } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrMsg(err.message);
      });
  }, [url]);

  return { data, loading, errMsg };
};

export default UseFetch;
