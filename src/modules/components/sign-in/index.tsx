import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Context } from "../../..";
import { useContext } from "react";
import { useState } from "react";
import './style.scss';

const ValidationSchemaSignIn = yup.object().shape({
    email: yup.array()
        .transform(function(value, originalValue) {
        if (this.isType(value) && value !== null) {
            return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
        })
    .of(yup.string().email(({ value }) => `${value} это не правильный формат электронной почты`)),
    password: yup.string()
        .required("Это обязательное поле")
});

const SignInForm = () => {
    const { auth } = useContext(Context);

    const [emailFound, setEmailFound] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleClickSignIn = (values) => {
        auth.signInWithEmailAndPassword(values.email, values.password)
            .catch((error) => {
                let errorCode = error.code;
                switch (errorCode) {
                    case 'auth/user-not-found':
                        setEmailFound(true)
                        break;
                    case 'auth/wrong-password':
                        setWrongPassword(true)
                        break;
                };
                console.log(error,'error')
            });
    }

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={() => {}}
                validationSchema={ValidationSchemaSignIn}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isValid,
                        dirty,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <input
                                name="email"
                                type="text"
                                placeholder="Введите электронный адрес"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="input-inf"
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <input
                                name="password"
                                type="password"
                                placeholder="Введите пароль"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="input-inf"
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                            <button
                                type="submit"
                                disabled={!isValid || !dirty}
                                onClick={() => handleClickSignIn(values)}
                                className="submit-sign-in"
                            >
                                Войти
                            </button>
                        </form>
                    );
                }}
            </Formik>
            { emailFound ? <p className="auth-errors">Не удалось найти аккаунт</p> : null }
            { (!emailFound && wrongPassword) ? <p className="auth-errors">К сожалению, вы ввели неправильный пароль. Проверьте свой пароль еще раз.</p> : null }
        </>
    )
}

export default SignInForm;