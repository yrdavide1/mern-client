import React, { useEffect } from "react";
import { Button } from "primereact/button";
import useTheme from "../../hooks/useTheme";

export type Theme = 'light' | 'dark';

type ThemeSwitcherProps = {
    themeSwitchAdditionalHandler: (value: Theme) => void
};

const ThemeSwitcher = ({themeSwitchAdditionalHandler}: ThemeSwitcherProps): JSX.Element => {
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        if (!theme) localStorage.setItem('theme', 'light');
        setTheme(theme);
        themeSwitchAdditionalHandler(theme);
    }, [theme])

    const themeSwitchHandler = (value: Theme) => {
        const themeLink = document.getElementById('app-theme') as HTMLAnchorElement;
        if (theme === 'light') {
            setTheme('dark');
            themeLink.href = 'viva-dark/viva-dark.css';
        } else if (theme === 'dark') {
            setTheme('light');
            themeLink.href = 'viva-light/viva-light.css';
        }
        themeSwitchAdditionalHandler(theme);
    };

    const renderButton = () => {
        if (theme === 'dark') {
            return <Button icon='pi pi-moon' onClick={() => themeSwitchHandler('light')} rounded raised />;
        } else if (theme === 'light') {
            return <Button icon='pi pi-sun' onClick={() => themeSwitchHandler('dark')} rounded raised />
        }
    }

    return (
        <>
            <div className="flex">
                {renderButton()}                
            </div>
        </>
    );
};

export default ThemeSwitcher;