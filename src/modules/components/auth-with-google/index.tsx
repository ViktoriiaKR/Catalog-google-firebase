import React, { useContext } from 'react';
import { Context } from '../../..';
import firebase from 'firebase';
import './style.scss';

const AuthGoogle = () => {
    const { auth } = useContext(Context);

    const authorization = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(provider)
    };

    return (
            <button onClick={authorization} className='btn-auth'>
                <img src={require('./../../../styles/assets/images/logo-google.png')} alt='auth-google' className='logo-google' />
                <span>Войти с помощью google</span>
            </button>
    )
}

export default AuthGoogle;