import React, { FormEvent, useState } from "react";
import reactLogo from '../../assets/react-logo.png';
import './Login.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean | null>(true);

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

            console.log(json);
        } else {
            // TODO: show error toast?
        }
    };

    return (
        <>
            <img className="react-logo" src={reactLogo} alt="React logo"></img>
            <div className="w-screen h-screen flex justify-content-center align-items-center">
                <Card title='Login'>
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
                        <div className="flex justify-content-end mt-3">
                            <Button type="submit" label="Login"></Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Login;