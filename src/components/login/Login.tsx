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

const Login = (): JSX.Element => {
    const imgLogoSrcs = [mongodbLogo, expressLogo, reactLogo, nodejsLogo];
    const el = useRef(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [hidePassword, setHidePassword] = useState<boolean | null>(true);
    const [, setUser] = useStorage("user", null);
    const navigate = useNavigate();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['MERN Practice', 'LOGIN ^1500'],
            typeSpeed: 100,
            showCursor: false,
            fadeOut: true
        });

        return () => {
            typed.destroy();
        }
    }, []);

    const hidePasswordHandler = (): void => {
        setHidePassword(!hidePassword);
    };

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
                    const containerEl = document.getElementById('container');
                    containerEl.style.animation = 'bgAnimation 1s linear';
                    resolve('Successfully logged in!');
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                } else {
                    reject(json.message);
                }
            } else {
                reject('Both fields are required!');
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
    }

    const redirectToRegister = () => {
        const containerEl = document.getElementById('container');
        containerEl.style.animation = 'bgAnimation 1s linear';
        setTimeout(() => {
            navigate('/register');
        }, 1000);
    };

    return (
        <>
            <div className="w-screen h-screen container" id="container">
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
                                <div className="flex">
                                    <span className="p-input-icon-right">
                                        <i
                                            className={
                                                hidePassword
                                                    ? "pi pi-eye cursor-pointer"
                                                    : "pi pi-eye-slash cursor-pointer"
                                            }
                                            onClick={hidePasswordHandler}
                                        />
                                        <InputText
                                            autoComplete="current-password"
                                            id="password"
                                            type={hidePassword ? "password" : "text"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </span>
                                </div>
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
