import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState<string>(value);
  useEffect(() => {
    const delayHandler = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(delayHandler);
    };
  }, [value]);
};
