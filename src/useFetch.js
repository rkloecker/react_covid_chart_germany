import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("fetching data failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const dataObj = {
          labels: data.data.map(({ date }) => date.slice(0, 10)),
          datasets: [
            {
              label: "Incidence",
              data: data.data.map(({ weekIncidence }) =>
                weekIncidence.toFixed(1)
              ),
              borderColor: ["rgba(0, 0, 0, 1)"],
              backgroundColor: ["rgba(0, 206, 86, 0.3)"],
              pointBackgroundColor: "rgba(0, 0, 0, 0.8)",
              pointBorderColor: "rgba(0, 0, 0, 0.8)",
              pointRadius: 0.5,
            },
          ],
        };
        setIsPending(false);
        setData(dataObj);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
