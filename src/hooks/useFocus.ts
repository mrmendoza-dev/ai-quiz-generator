import { useRef, useEffect } from "react";

const useFocus = () => {
  const ref: any = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
};

export default useFocus;
