import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: any) {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    const savedValue = JSON.parse(storage.getItem(key));

    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

const useStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        if (value) storage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useStorage;