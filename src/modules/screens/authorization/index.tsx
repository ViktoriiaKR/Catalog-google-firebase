import React, { useContext } from 'react';
import { Context } from '../../..';
import firebase from 'firebase';
import './style.scss';

const Authorization = () => {
    const {auth} = useContext(Context);

    const authorization = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(provider)
    };

    return (
        <main className='authorization-page'>
            <button onClick={authorization} className='btn-auth'>
                <img src={require('./../../../styles/assets/images/logo-google.png')} alt='' className='' />
                <span>Войти с помощью google</span>
            </button>
        </main>
    )
}

export default Authorization;