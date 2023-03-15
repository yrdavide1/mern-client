import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Theme } from "../components/theme-switcher/ThemeSwitcher";

const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;

        return savedTheme;
    });

    useEffect(() => {
        localStorage.setItem('theme', theme ? theme : 'light');
    }, [theme, setTheme]);
    
    return [theme, setTheme];
};

export default useTheme;
