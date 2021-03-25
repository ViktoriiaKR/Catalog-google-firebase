import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../..';
import { AUTHORIZATION } from '../../../const/utils-path';
import {useAuthState} from "react-firebase-hooks/auth";
import './style.scss';

const HeaderNav = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

	return (
		<header className='header-nav'>
            <div className='header-enter-exit'>
                {
                    user ? 
                        <button onClick={() => auth.signOut()}>Выйти</button>
                        : 
                        <NavLink to={AUTHORIZATION} className='wrap'>
                            <button>Авторизация</button>
                        </NavLink>
                }
            </div>
		</header>
	)
}

export default HeaderNav;
