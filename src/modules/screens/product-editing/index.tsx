import React, { useContext, useEffect, useState } from 'react';
import ArrowBackToList from './../../components/arrow-back-list/index';
import { app, Context } from '../../..';
import { minCalendardate } from '../../../const/utils-func';
import { v4 as uuidv4 } from "uuid";
import './style.scss';

const ProductEditing = (props) => {
    const {firestore} = useContext(Context);

    const [showTitle, setShowTitle] = useState('');
    const [showPhoto, setShowPhoto] = useState('');
    const [showDescr, setShowDescr] = useState('');
    const [showPrice, setShowPrice] = useState('');
    const [showSale, setShowSale] = useState('');
    const [showSaleDate, setShowSaleDate] = useState('');

    const [minDate, setMinDate] = useState('');
    
    const [titleEdit, setTitleEdit] = useState('');
    const [photoEdit, setPhotoEdit] = useState('');
    const [descrEdit, setDescrEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [saleEdit, setSaleEdit] = useState('');
    const [dateSaleEdit, setDateSaleEdit] = useState('');

    const actionsImage = async(e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(
            `${uuidv4()}-${file.name}`
        );
        await fileRef.put(file);
        setPhotoEdit(await fileRef.getDownloadURL())
    };
        
    useEffect(() => {
        firestore.collection("products").doc(props.location.state.idCard).get()
        .then((doc) => {
            setShowTitle(doc.data().pdTitle);
            setTitleEdit(doc.data().pdTitle);

            setShowPhoto(doc.data().pdImage);
            setPhotoEdit(doc.data().pdImage);

            setShowDescr(doc.data().pdDescr);
            setDescrEdit(doc.data().pdDescr);

            setShowPrice(doc.data().pdPrice);
            setPriceEdit(doc.data().pdPrice);

            setShowSale(doc.data().pdDiscount);
            setSaleEdit(doc.data().pdDiscount);

            setShowSaleDate(doc.data().pdDateDiscount);
            setDateSaleEdit(doc.data().pdDateDiscount);
          });
          setMinDate(minCalendardate);
    }, []);

    const handleEditCard = (e) => {
        firestore.collection("products").doc(props.location.state.idCard).update({
            "pdTitle": titleEdit === showTitle ? showTitle : titleEdit,
            "pdImage": photoEdit === showPhoto ? showPhoto : photoEdit,
            "pdDescr": descrEdit === showDescr ? showDescr : descrEdit,
            "pdPrice": priceEdit === showPrice ? showPrice : priceEdit,
            "pdDiscount": saleEdit === showSale ? showSale : saleEdit,
            "pdDateDiscount": dateSaleEdit === showSaleDate ? showSaleDate : dateSaleEdit
        })
        .then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        e.preventDefault();
    };

    return (
        <main className='product-editing-page'>
            <ArrowBackToList />
            <form className='form-conteiner' onSubmit={(e) => handleEditCard(e)}>
                <input
                    defaultValue={showTitle}
                    type='text'
                    name='title'
                    placeholder='Заголовок товара (20 - 60 символов)'
                    required
                    pattern=".{20,60}"
                    onChange={e => setTitleEdit(e.target.value)}
                    
                />
                <div className='current-product-image'>
                    <p>Текущее изображение: </p>
                    <img src={showPhoto} alt ='product-img' className='current-image' />
                </div>
                <input
                    type="file"
                    onChange={actionsImage}
                    name='image'
                    accept=".png,.jpg,.jpeg,.gif"
                />
                <input
                    defaultValue={showDescr}
                    type='text'
                    name='description'
                    placeholder='Описание товара (до 200 символов)'
                    pattern=".{0,200}"
                    onChange={e => setDescrEdit(e.target.value)}
                />
                <input
                    defaultValue={showPrice}
                    type='number'
                    name='price'
                    placeholder='Цена товара'
                    required
                    step='0.01'
                    min='1'
                    max='99999999.99'
                    onChange={e => setPriceEdit(e.target.value)}
                />
                <input
                    defaultValue={showSale}
                    type='number'
                    name='discount'
                    placeholder='Процент скидки'
                    min='10'
                    max='90'
                    onChange={e => setSaleEdit(e.target.value)}
                />
                {
                    showSale !== '' || saleEdit !== '' ? 
                        <input
                            defaultValue={showSaleDate}
                            type='date'
                            name='date-discount'
                            placeholder='Дата окончания скидки'
                            required
                            min={minDate}
                            onChange={e => setDateSaleEdit(e.target.value)}
                        />
                        : ''
                }
                <button type='submit'>Сохранить</button>
            </form>
        </main>
    )
}

export default ProductEditing;