import React, { useEffect, useRef, useState } from "react";
import anime from 'animejs/lib/anime.es.js';
import './Home.css';
import ThemeSwitcher, { Theme } from "../theme-switcher/ThemeSwitcher";
import Typed from "typed.js";

const Home = () => {
    const [theme, setTheme] = useState<Theme>();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const welcomeBackTextEl = useRef(null);

    useEffect(() => {
        const welcomeBackTyped = new Typed(welcomeBackTextEl.current, {
            strings: ['Welcome back!'],
            typeSpeed: 100,
            showCursor: false
        });

        return () => {
            welcomeBackTyped.destroy();
        }
    }, []);

    const themeSwitchAdditionalHandler = (value: Theme) => {
        setTheme(value);
    };

    const getAnimeTimelineParams = (
        className: string,
        translateX: string | number,
        translateY: string | number,
        visibility: 'visible' | 'hidden'
    ): anime.AnimeAnimParams => {
        return {
            targets: className,
            translateX: translateX,
            translateY: translateY,
            begin: () => {
                const item = document.querySelector(className) as HTMLElement;
                item.style.visibility = visibility;
            }
        };
    };

    const showMenuHandler = () => {
        anime({
            targets: '.action-button',
            translateY: '25vh',
            duration: 750
        })

        setTimeout(() => {
            const timeline = anime.timeline({
                easing: 'easeOutExpo',
                duration: 200
            });
    
            timeline
                .add(getAnimeTimelineParams('.item-create', 0, '17vh', 'visible'))
                .add(getAnimeTimelineParams('.item-get-all', '5vw', '20vh', 'visible'))
                .add(getAnimeTimelineParams('.item-get-single', '-5vw', '20vh', 'visible'))
                .add(getAnimeTimelineParams('.item-delete', '6vw', '27vh', 'visible'))
                .add(getAnimeTimelineParams('.item-update', '-6vw', '27vh', 'visible'))
        }, 750);
    };

    const hideMenuHandler = () => {
        const timeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 200
        });

        timeline
            .add(getAnimeTimelineParams('.item-create', 0, '25vh', 'hidden'))
            .add(getAnimeTimelineParams('.item-get-all', 0, '25vh', 'hidden'))
            .add(getAnimeTimelineParams('.item-get-single', 0, '25vh', 'hidden'))
            .add(getAnimeTimelineParams('.item-delete', 0, '25vh', 'hidden'))
            .add(getAnimeTimelineParams('.item-update', 0, '25vh', 'hidden'))

        setTimeout(() => {
            anime({
                targets: '.action-button',
                translateY: 0,
                duration: 750
            })
        }, 200 * 5);
    };

    const toggleMenuHandler = () => {
        setShowMenu(!showMenu);
        showMenu ? hideMenuHandler() : showMenuHandler();
    };

    // success #cede9c
    // danger #e693a9 

    return (
        <>
            <div             
                className={
                    theme === 'light' 
                    ? 'w-screen h-screen login-container-light' 
                    : 'w-screen h-screen login-container-dark'
                }
            >
                <div className="flex flex-column h-full">
                    <div className="flex justify-content-end p-3">
                        <ThemeSwitcher themeSwitchAdditionalHandler={themeSwitchAdditionalHandler} />
                    </div>
                    <div className="flex justify-content-center h-3rem">
                        <span className="welcome-back" ref={welcomeBackTextEl}></span>
                    </div>
                    <div className="h-4rem"></div>
                    <div className="flex-auto flex justify-content-center">
                        <button 
                            className="action-button toggle"
                            style={showMenu ? {'backgroundColor': '#e693a9'} : {'backgroundColor': 'var(--primary-color)'}}
                            onClick={() => toggleMenuHandler()}
                        >
                            <i className={showMenu ? 'pi pi-times' : 'pi pi-bars'}></i>
                        </button>
                        <button className="action-button item-create">
                            <i className="pi pi-plus"></i>
                        </button>
                        <button className="action-button item-get-all">
                            <i className="pi pi-plus"></i>
                        </button>
                        <button className="action-button item-get-single">
                            <i className="pi pi-plus"></i>
                        </button>
                        <button className="action-button item-delete">
                            <i className="pi pi-plus"></i>
                        </button>
                        <button className="action-button item-update">
                            <i className="pi pi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;