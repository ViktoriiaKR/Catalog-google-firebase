import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../..";
import AppRouter from '../../services/RouteSettings';
import HeaderNav from './header-nav/index';
import Loader from './loader/index';
import './../../styles/index.scss';

const App = () => {
    const { auth } = useContext(Context)
    const [ user, loading, error ] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <HeaderNav />
            <AppRouter /> 
        </BrowserRouter>
    )
}

export default App;