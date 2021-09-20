import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, guardFunction, guardFunctionArgs, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (guardFunction && guardFunction(guardFunctionArgs)) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{ path: "/", state: { from: props.location } }} />;
                }
            }}
        />
    );
};

export default ProtectedRoute;