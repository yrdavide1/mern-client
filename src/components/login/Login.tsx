import React, { FormEvent, useEffect, useRef, useState } from "react";
import mongodbLogo from "../../assets/mongodb-logo.png";
import expressLogo from "../../assets/express-logo.png";
import reactLogo from "../../assets/react-logo.png";
import nodejsLogo from "../../assets/nodejs-logo.png";
import "./Login.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import useStorage from "../../hooks/useStorage";
import Typed from "typed.js";
import toast, { Toaster } from "react-hot-toast";
import ThemeSwitcher, { Theme } from "../theme-switcher/ThemeSwitcher";

const Login = (): JSX.Element => {
    const imgLogoSrcs = [mongodbLogo, expressLogo, reactLogo, nodejsLogo];
    const el = useRef(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [, setUser] = useStorage("user", null);
    const navigate = useNavigate();
    const [theme, setTheme] = useState<Theme>();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['MERN Client', 'Register'],
            typeSpeed: 100,
            showCursor: false,
            fadeOut: true
        });

        return () => {
            typed.destroy();
        }
    }, []);

    const formSubmitHandler = (e: FormEvent): Promise<string> => {
        return new Promise<string>(async (resolve, reject) => {
            e.preventDefault();

            if (username && password) {
                const params = {
                    username,
                    password,
                };
    
                const response = await fetch("http://localhost:5002/login", {
                    method: "POST",
                    body: JSON.stringify(params),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const json = await response.json();
    
                if (json.accessToken && response.status === 200) {
                    localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
                    setUser(json);
                    // const containerEl = document.getElementById('login-container');
                    // containerEl.style.animation = 'bgAnimation 1s linear';
                    // setTimeout(() => {
                    //     navigate("/home");
                    // }, 1000);
                    resolve('Successfully logged in!');
                    setTimeout(() => {
                        navigate('/home');
                    }, 200);
                } else {
                    reject(json.message);
                }
            } else {
                reject('Invalid form!');
            }
        })
    };

    const login = (e: FormEvent) => {
        toast.promise(
            formSubmitHandler(e),
            {
                loading: 'Hold on a sec...',
                success: (message) => message,
                error: (err) => err,
            }
        );
    };

    const redirectToRegister = () => {
        // const containerEl = document.getElementById('login-container');
        // containerEl.style.animation = 'bgAnimation 1s linear';
        // setTimeout(() => {
        //     navigate('/register');
        // }, 1000);
        navigate('/register');
    };

    const themeSwitchAdditionalHandler = (value: Theme) => {
        setTheme(value);
    };

    return (
        <>
            <div 
                id="login-container"
                className={
                    theme === 'light' 
                    ? 'w-screen h-screen login-container-light' 
                    : 'w-screen h-screen login-container-dark'
                }
            >
                <div className="flex justify-content-end pr-2 pt-2">
                    <ThemeSwitcher themeSwitchAdditionalHandler={themeSwitchAdditionalHandler} />
                </div>
                <div className="h-2rem w-full"></div>
                <div className="flex align-items-center justify-content-center logo-container">
                    {imgLogoSrcs.map(l => <img id="logo" className="logo" src={l} key={l} alt="Logo"></img>)}
                </div>
                <div className="h-2rem w-full"></div>
                <div className="flex align-items-center justify-content-center h-2rem">
                    <span className="title" ref={el}></span>
                </div>
                <div className="h-2rem w-full"></div>
                <div className="flex justify-content-center login-form-container">
                    <Card className="w-6">
                        <form
                            className="flex flex-column login-form"
                            onSubmit={login}
                        >
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Username</label>
                                <InputText
                                    autoComplete="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-column gap-2 mt-3">
                                <label htmlFor="password">Password</label>
                                <InputText
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    type={hidePassword ? 'password' : 'text'}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex align-items-center mt-3">
                                <Checkbox
                                    inputId="showPassword"
                                    checked={!hidePassword}
                                    onChange={(e: CheckboxChangeEvent) => {
                                        setHidePassword(!e.checked!);
                                    }}
                                ></Checkbox>
                                <label htmlFor="showPassword" className="ml-2">
                                    Show password
                                </label>
                            </div>
                            <div className="flex align-items-center mt-3">
                                <Checkbox
                                    inputId="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e: CheckboxChangeEvent) => {
                                        setRememberMe(e.checked!);
                                    }}
                                ></Checkbox>
                                <label htmlFor="rememberMe" className="ml-2">
                                    Remember me
                                </label>
                            </div>
                            <div className="flex justify-content-end mt-3">
                                <Button label="Login" raised />
                                <Toaster
                                    position="top-left"
                                    toastOptions={{
                                        style: {
                                            backgroundColor: 'var(--primary-color)',
                                            color: 'var(--surface-0)'
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex justify-content-end mt-3">
                                <a href="#!" onClick={(e) => {e.preventDefault(); redirectToRegister();}}>Don't have an account yet? Sign up now!</a>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;
