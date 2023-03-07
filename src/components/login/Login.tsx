import React, { FormEvent, useState } from "react";
import reactLogo from '../../assets/react-logo.png';
import './Login.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Link, useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [hidePassword, setHidePassword] = useState<boolean | null>(true);
    const navigate = useNavigate();

    const hidePasswordHandler = (): void => { setHidePassword(!hidePassword) };

    const formSubmitHandler = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (username && password) {
            const params = {
                username,
                password
            };

            const response = await fetch(
                'http://localhost:5002/login', 
                {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const json = await response.json();

            if (json.accessToken) {
                localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
                rememberMe ? localStorage.setItem('user', JSON.stringify(json)) : sessionStorage.setItem('user', JSON.stringify(json));
                navigate('home');
            }
        } else {
            // TODO: show error toast?
        }
    };

    return (
        <>
            <img className="react-logo" src={reactLogo} alt="React logo"></img>
            <div className="w-screen h-screen flex justify-content-center align-items-center">
                <Card title='Login' className="w-6">
                    <form className="flex flex-column" onSubmit={formSubmitHandler}>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">Username</label>
                            <InputText 
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
                                        className={hidePassword ? 'pi pi-eye cursor-pointer' : 'pi pi-eye-slash cursor-pointer'}
                                        onClick={hidePasswordHandler}
                                    />
                                    <InputText 
                                        id="password" 
                                        type={hidePassword ? 'password' : 'text'}
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
                                onChange={(e: CheckboxChangeEvent) => {setRememberMe(e.checked!)}}
                            >
                            </Checkbox>
                            <label htmlFor="rememberMe" className="ml-2">Remember me</label>
                        </div>
                        <div className="flex justify-content-end mt-3">
                            <Button type="submit" label="Login"></Button>
                        </div>
                        <div className="flex justify-content-end mt-3">
                            <Link to='/register'>Don't have an account yet? Sign up!</Link>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Login;