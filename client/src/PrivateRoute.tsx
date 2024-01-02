import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from "./context/UserState";
import { JsxElement } from 'typescript';

export const PrivateRoute = (props: {children: JSX.Element}) => {
    const {token} = useContext(UserContext);
    return token ? props.children : <Navigate to="/login"/>
};
