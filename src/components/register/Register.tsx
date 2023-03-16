import React, { useEffect, useRef, useState } from "react";
import mongodbLogo from "../../assets/mongodb-logo.png";
import expressLogo from "../../assets/express-logo.png";
import reactLogo from "../../assets/react-logo.png";
import nodejsLogo from "../../assets/nodejs-logo.png";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import './Register.css';
import { Card } from "primereact/card";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import toast, { Toaster } from "react-hot-toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ThemeSwitcher, { Theme } from "../theme-switcher/ThemeSwitcher";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface IRegisterFormFields {
    name: string,
    surname: string,
    email: string,
    username: string,
    password: string
}

const Register = (): JSX.Element => {
    const imgLogoSrcs = [mongodbLogo, expressLogo, reactLogo, nodejsLogo];
    const el = useRef(null);
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const navigate = useNavigate();
    const [theme, setTheme] = useState<Theme>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [formFields, setFormFields] = useState<IRegisterFormFields>({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: ''
    });
    const items: MenuItem[] = [
        {
            label: 'Personal Info'
        },
        {
            label: 'Username & Password'
        }
    ];

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['MERN Client', 'Login'],
            typeSpeed: 100,
            showCursor: false,
            fadeOut: true
        });

        return () => {
            typed.destroy();
        }
    }, []);

    const isValidEmail = (): boolean => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(formFields.email);
    };

    const isValidPassword = (): boolean => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(formFields.password);
    };

    const isValidFirstStep = (): boolean => {
        return (
            isValidEmail()
            && !!formFields.name
            && !!formFields.surname
        );
    };

    const isValidSecondStep = (): boolean => {
        return (
            !!formFields.username
            && isValidPassword()
        );
    };

    const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (activeIndex === (items.length - 1)) {
            if (isValidSecondStep()) {
                toast.promise(
                    register(),
                    {
                        loading: 'Hold on a sec...',
                        success: (message) => message,
                        error: (err) => err,
                    }
                );
            } else toast.error('Invalid form!');
        } else isValidFirstStep() ? setActiveIndex(activeIndex + 1) : toast.error('Invalid form!');
    };

    const register = (): Promise<string> => {
        return new Promise<string>(async (resolve, reject) => {
            const params = {
                name: formFields.name,
                surname: formFields.surname,
                username: formFields.username,
                email: formFields.email,
                password: formFields.password,
            };

            const response = await fetch('http://localhost:5002/register', {
                method: 'post',
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();

            if (response.status === 200) {
                resolve('Successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else reject(json.message);
        });
    };

    const redirectToLogin = () => {
        // const containerEl = document.getElementById('container');
        // containerEl.style.animation = 'bgAnimation 1s linear';
        // setTimeout(() => {
        //     navigate('/login');
        // }, 1000);
        navigate('/login');
    };

    const renderFormStep = () => {
        if (activeIndex === (items.length - 1)) {
            return (
                <>
                    <div className="flex flex-column col-12 gap-1 mt-3">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={formFields.username}
                            onChange={(e) => setFormFields({...formFields, username: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-column col-12 gap-1">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            autoComplete="new-password"
                            value={formFields.password}
                            type={hidePassword ? 'password' : 'text'}
                            onChange={(e) => setFormFields({...formFields, password: e.target.value})}
                        />
                    </div>
                    <div className="flex align-items-center col-12">
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
                </>
            );
        } else {
            return (
                <>
                    <div className="flex flex-column col-6 gap-1 mt-3">
                        <label htmlFor="name">Name</label>
                        <InputText
                            id="name"
                            value={formFields.name}
                            onChange={(e) => setFormFields({...formFields, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-column col-6 gap-1 mt-3">
                        <label htmlFor="surname">Surname</label>
                        <InputText
                            id="surname"
                            value={formFields.surname}
                            onChange={(e) => setFormFields({...formFields, surname: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-column col-12 gap-1">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            type='email'
                            value={formFields.email}
                            onChange={(e) => setFormFields({...formFields, email: e.target.value})}
                        />
                    </div>
                </>
            );
        }
    };

    const themeSwitchAdditionalHandler = (value: Theme) => {
        setTheme(value);
    };

    return (
        <>
            <Toaster
                position="top-left"
                toastOptions={{
                    style: {
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--surface-0)'
                    }
                }}  
            />
            <div 
                id="register-container"
                className={
                    theme === 'light'
                    ? 'w-screen h-screen register-container-light' 
                    : 'w-screen h-screen register-container-dark'
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
                <div className="flex justify-content-center align-items-center register-form-container">
                    <Card className="w-6">
                        <Steps 
                            model={items}
                            activeIndex={activeIndex}
                        />
                        <div className="grid" id="step">
                            {renderFormStep()}
                        </div>
                        <div className="flex justify-content-end mt-3">
                            <Button 
                                label="Back"
                                raised
                                type="button"
                                severity="secondary"
                                className="mr-3"
                                disabled={activeIndex !== (items.length - 1)}
                                onClick={() => setActiveIndex(activeIndex - 1)}
                            />
                            <Button 
                                label={activeIndex === (items.length - 1) ? 'Register' : 'Next'}
                                raised
                                type="button"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => registerHandler(e)}
                            />
                        </div>
                        <div className="flex justify-content-end mt-3">
                            <a href="#!" onClick={(e) => {e.preventDefault(); redirectToLogin();}}>Already have an account? Sign in!</a>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Register;