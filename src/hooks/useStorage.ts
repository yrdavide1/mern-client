import { useState, useEffect } from "react";

function getSavedValue(key: StorageKey, initialValue: any) {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    const savedValue = JSON.parse(storage.getItem(key)!);

    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

const useStorage = (key: StorageKey, initialValue: any) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useStorage;

export type StorageKey = 'rememberMe' | 'accessToken' | 'userId' | 'username';