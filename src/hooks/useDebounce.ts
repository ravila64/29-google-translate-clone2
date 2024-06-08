import { useEffect, useState } from "react";
// ejecuta hasta que se cumpla un tiempo
// useDebounce recibe el tipo por parametros
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}

/*
línea del tiempo de cómo se comporta el usuario:

0ms -> user type - 'h' -> value
   useEffect ... L7
150ms -> user type 'he' -> value
   clear useEffect - L11
   useEffect ... L7
300ms -> user type 'hel'  -> value
   clear useEffect - L11
   useEffect ... L7
400ms -> user type 'hell'  -> value
    clear useEffect - L11
    useEffect ... L7
900ms -> L8 -> setDebouncedValue('hell') -> debounceValue L14
*/
