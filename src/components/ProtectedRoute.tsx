import React from "react";
import { Navigate } from "react-router";
import useStorage from "../hooks/useStorage";

type ProtectedRouteProps = {
    children: JSX.Element,
    redirectPath: string
};

const ProtectedRoute = ({children, redirectPath}: ProtectedRouteProps): JSX.Element => {
    const [user] = useStorage('user', null);
    if (!user) {
        console.log(`Route ${window.location.href} could not be loaded!\nRedirecting to login.`);
        return <Navigate to={redirectPath}/>;
    }

    return children;
}

export default ProtectedRoute;