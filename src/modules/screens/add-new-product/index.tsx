import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import ArrowBackToList from '../../components/arrow-back-list';
import { minCalendardate } from './../../../const/utils-func';
import { app } from './../../../index';
import { v4 as uuidv4 } from "uuid";
import './style.scss';

const ProductNew = () => {
    const {firestore} = useContext(Context);

    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [dateDiscount, setdateDiscount] = useState('');
    const [dateLength, setDateLength] = useState('');

    useEffect(() => {
        setDateLength(minCalendardate);
    }, []);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(
            `${uuidv4()}-${file.name}`
        );
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL())
    };

    const handleSend = async (e) => {
        firestore.collection("products").add({
            pdTitle: title,
            pdImage: fileUrl,
            pdDescr: description,
            pdPrice: price,
            pdDiscount: discount,
            pdDateDiscount: dateDiscount,
            createdTime: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTitle('');
        setFileUrl('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setdateDiscount('');
        
        e.preventDefault();
    };

    return (
        <main className='product-new-page'>
            <ArrowBackToList />
            <div className='pd-new-wrapper'>
                <h3>Форма добавления нового товара</h3>
                <form className='form-conteiner' onSubmit={(e) => handleSend(e)}>
                    <input
                        value={title}
                        type='text'
                        name='title'
                        placeholder='Заголовок товара (20 - 60 символов)'
                        pattern=".{20,60}"
                        required
                        maxLength={60}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={onFileChange}
                        name='image'
                        required
                        accept=".png,.jpg,.jpeg,.gif"
                    />
                    <input
                        value={description}
                        type='text'
                        name='description'
                        placeholder='Описание товара (до 200 символов)'
                        pattern=".{0,200}"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        value={price}
                        type='number' name='price'
                        placeholder='Цена товара'
                        required
                        step='any'
                        min='1'
                        max='99999999.99'
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input
                        value={discount}
                        type='number'
                        name='discount'
                        placeholder='Процент скидки'
                        min='10'
                        max='90'
                        onChange={e => setDiscount(e.target.value)}
                    />
                    {
                        discount !== '' ?
                            <input
                                value={dateDiscount}
                                type='date'
                                name='date-discount'
                                placeholder='Дата окончания скидки'
                                required
                                onChange={e => setdateDiscount(e.target.value)}
                                min={dateLength}
                            />
                        : ''
                    }
                    <button type='submit'>Сохранить</button>
                </form>
            </div>
        </main>
    )
}

export default ProductNew;