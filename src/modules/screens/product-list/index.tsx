
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../..';
import { RouteNewProdPage } from '../../../const/utils-img';
import './style.scss';

const ProductList = (props) => {
    const {firestore} = useContext(Context);

    const [card, setCard] = useState([] as any);

    const calculatePriceSale = (data) => {
        let a = data.pdPrice;
        let b = data.pdDiscount;
        let discount = (a / 100) * b;
        let sale = a - discount;
        data.sale = Math.trunc(sale * 100) / 100; 
    };

    const calculateDateDiff = (data) => {
        let today = moment(new Date()).toISOString();
        let resultDate = moment(data.pdDateDiscount).diff(moment(today), 'days') + 1; // "+1" - to include the start day;
        let days = resultDate;
        data.days = days;
    };
    
    useEffect(() => {
        firestore.collection("products").orderBy("createdTime").get()
        .then(querySnapshot => {
            const productsData = querySnapshot.docs.map(function (doc) {
                const eventData = doc.data();
                let id = doc.id;
                eventData.id = id;

                calculatePriceSale(eventData);

                calculateDateDiff(eventData);

                return eventData
            });
            setCard(card.concat(productsData))
          });
    }, [])

    const deleteCard = (id) => {
        firestore.collection("products").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        setCard(card.filter(item => item.id !== id));
    };

    return (
        <main className='product-list-page'>
            {
                card.map((el, i) => (
                    <div className='pd-list-wrapper' key={i}>
                        <img src={el.pdImage} alt='product-img' />
                        <div className='pd-info'>
                            <p className='title-product'>{el.pdTitle}</p>
                            {el.pdDescr !== '' ? <p>{el.pdDescr}</p> : ''}
                            <p className={el.pdDiscount !== ''  && el.days !== 0 ? 'price-cross-out' : ''}>{el.pdPrice} $</p>
                            {el.pdDiscount !== '' && el.days !== 0 ? <p className='discount'>{el.pdDiscount} %</p> : ''}
                            {el.pdDiscount !== '' && el.days !== 0 ? <p className='price-sale'>{el.sale} $</p> : ''}
                            {el.pdDiscount !== '' && el.days !== 0 ? <p>До конца скидки: {el.days} дней </p> : ''}
                            
                        </div>
                        <div className='options-panel'>
                                <NavLink to={{
                                    pathname: '/product-editing',
                                    state: { idCard: el.id }  
                                }}> 
                                    <button>Редактировать</button>
                                </NavLink>
                                <button className='btn-delete' onClick={() => deleteCard(el.id)}>Удалить</button>
                            </div>
                    </div> 
                ))
            }
            <NavLink to='product-new' className='to-newProdPage'>
                <img src={RouteNewProdPage} alt='product-new-page' className='img-to-page' />
            </NavLink>
        </main>
    )
}

export default (ProductList);