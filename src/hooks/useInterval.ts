
import { useEffect, useRef } from "react";

const useInterval = (callback: any, delay = 30000, dependencies = []) => {
  const savedCallback: any = useRef();


  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, ...dependencies]);
};

export default useInterval;

