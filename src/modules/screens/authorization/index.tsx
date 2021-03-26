import React from 'react';
import AuthInvitation from '../../components/auth-invitation';
import AuthGoogle from '../../components/auth-with-google';
import SignInForm from '../../components/sign-in';
import './style.scss';

const Authorization = () => {

    return (
        <main className='authorization-page'>
            <div className='auth-sign-in'>
                <SignInForm />
                <p className='auth-another-way'>или с помощью:</p>
                <AuthGoogle />
                <AuthInvitation 
                    account={'Нет аккаунта?'}
                    path={'/sign-up'}
                    text={'Зарегистрируйтесь'}
                />
            </div>
        </main>
    )
}

export default Authorization;