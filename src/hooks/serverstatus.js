import { useState, useEffect } from "react";

export function useStatusServer({ url, pollingInterval = 2000 }) {
  const [status, setStatus] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url).then(({ status }) => {
        setStatus(status);
        if (status === 200) {
          clearInterval(interval); // optional poll deactivation
        }
      });
    }, pollingInterval);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [pollingInterval]);

  return { status };
}
