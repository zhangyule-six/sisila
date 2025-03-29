import { useEffect, useState } from "react";
function useDebounce(value, delay = 300) {
    const [debuncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debuncedValue;
}
export default useDebounce;
