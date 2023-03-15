import React, { useEffect } from "react";
import { Button } from "primereact/button";
import useTheme from "../../hooks/useTheme";

export type Theme = 'light' | 'dark';

type ThemeSwitcherProps = {
    themeSwitchAdditionalHandler?: (value: Theme) => void
};

const ThemeSwitcher = ({themeSwitchAdditionalHandler}: ThemeSwitcherProps): JSX.Element => {
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        themeSwitchAdditionalHandler(theme);
    }, [themeSwitchAdditionalHandler, theme]);

    const themeSwitchHandler = (value: Theme) => {
        const themeLink = document.getElementById('app-theme') as HTMLAnchorElement;
        themeLink.href = value === 'dark' ? 'viva-dark/viva-dark.css' : 'viva-light/viva-light.css';
        setTheme(value);
        themeSwitchAdditionalHandler(value);
    };

    const renderButton = () => {
        if (theme === 'dark') {
            return <Button icon='pi pi-moon' onClick={() => themeSwitchHandler('light')} rounded raised />;
        } else if (theme === 'light') {
            return <Button icon='pi pi-sun' onClick={() => themeSwitchHandler('dark')} rounded raised />
        }
    };

    return (
        <>
            <div className="flex">
                {renderButton()}                
            </div>
        </>
    );
};

export default ThemeSwitcher;