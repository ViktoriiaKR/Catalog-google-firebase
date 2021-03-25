import React from 'react';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Context } from '..';
import { AUTHORIZATION } from '../const/utils-path';
import { PRODUCT_LIST } from '../const/utils-path';
import { privateRoutes, publicRoutes } from './routes';
import {useAuthState} from "react-firebase-hooks/auth";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
  
    return user ? 
        (
            <Switch>
                {privateRoutes.map(({ path, Component}) =>
                    <Route
                        path={path}
                        component={Component}
                        exact={true}
                        key={path}
                    />
                )}
               <Redirect to={PRODUCT_LIST} /> 
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route
                        path={path}
                        component={Component}
                        exact={true}
                        key={path}
                    />
                )}
                <Redirect to={AUTHORIZATION} /> 
            </Switch>
        )
}

export default AppRouter;