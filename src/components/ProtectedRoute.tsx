import React from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
    children: JSX.Element,
    redirectPath: string
};

const ProtectedRoute = ({children, redirectPath}: ProtectedRouteProps): JSX.Element => {
    const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
    const user = JSON.parse(rememberMe ? localStorage.getItem('user') : sessionStorage.getItem('user'));

    if (!user) {
        console.warn(`Route ${window.location.href} could not be loaded!\nRedirecting to login.`);
        return <Navigate to={redirectPath}/>;
    }

    return children;
}

export default ProtectedRoute;