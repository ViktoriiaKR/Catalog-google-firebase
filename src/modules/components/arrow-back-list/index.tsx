import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowBack } from './../../../const/utils-img';
import './style.scss';

const ArrowBackToList = () => {
	return (
		<NavLink to='/product-list' className='arrow-back'>
            <img src={ArrowBack} alt='back' /> Список товаров
        </NavLink>
	)
}

export default ArrowBackToList;