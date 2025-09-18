import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response:", res); // ✅ debug
        setData(res[baseCurrency]); // ✅ correct key
      })
      .catch((err) => console.error("API Error:", err));
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;
