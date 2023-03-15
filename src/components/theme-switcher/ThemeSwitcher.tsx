import React, { useState } from "react";
import { Button } from "primereact/button";

export type Theme = 'light' | 'dark';

type ThemeSwitcherProps = {
    themeSwitchAdditionalHandler: (theme: Theme) => void
};

const ThemeSwitcher = ({themeSwitchAdditionalHandler}: ThemeSwitcherProps): JSX.Element => {
    const [theme, setTheme] = useState<Theme>('light');

    const themeSwitchHandler = () => {
        const themeLink = document.getElementById('app-theme') as HTMLAnchorElement;
        if (theme === 'light') {
            setTheme('dark');
            themeLink.href = 'viva-dark/viva-dark.css';
        } else {
            setTheme('light');
            themeLink.href = 'viva-light/viva-light.css';
        }
        themeSwitchAdditionalHandler(theme);
    };

    return (
        <>
            <div className="flex">
                <Button icon={theme === 'light' ? 'pi pi-moon' : 'pi pi-sun'} onClick={() => themeSwitchHandler()} rounded raised />
            </div>
        </>
    );
};

export default ThemeSwitcher;