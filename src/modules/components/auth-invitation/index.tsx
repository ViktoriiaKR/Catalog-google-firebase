import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const AuthInvitation = (props) => {

    return (
        <p className='invitation'>
            {props.account} <Link to={props.path}> {props.text}</Link>
        </p>
    )
}

export default AuthInvitation;