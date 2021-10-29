import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import Index from '../containers/Index';


const UserRoute = ({ children, ...rest }) => {

    const { currentUser } = useSelector(state => state.user)
    return (currentUser ? <Route {...rest} /> : <Index />)
}

export default UserRoute;