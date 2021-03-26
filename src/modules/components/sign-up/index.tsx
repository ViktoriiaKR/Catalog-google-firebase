import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Context } from "../../..";
import { useContext } from "react";
import AuthInvitation from "../auth-invitation";
import './style.scss';

const ValidationSchemaSignUp = yup.object().shape({
    email: yup.array()
        .transform(function(value, originalValue) {
          if (this.isType(value) && value !== null) {
            return value;
          }
          return originalValue ? originalValue.split(/[\s,]+/) : [];
        })
        .of(yup.string().email(({ value }) => `${value} это не правильный формат электронной почты`))
        .required("Это обязательное поле"),
    password: yup.string()
        .required("Это обязательное поле")
        .min(8, "Пароль слишком короткий - не менее 8 символов")
        .matches(/(?=.*[0-9])/, "Пароль должен содержать цифру"),
    passwordConfirm: yup.string()
        .required("Это обязательное поле")
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

const SignUpForm = () => {
    const [emailUse, setEmailUse] = useState(false);
    const { auth } = useContext(Context);

    const handleClick = (values) => {
        auth.createUserWithEmailAndPassword(values.email, values.password)
        .catch((error) => {
            let errorCode = error.code;
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    setEmailUse(true)
                    break;
            };
        });
    };

    return (
        <main className='sign-up-page'>
            <div className='sign-up-wrapper'>
                <Formik
                    initialValues={{ email: "", password: "", passwordConfirm: "" }}
                    onSubmit={() => {}}
                    validationSchema={ValidationSchemaSignUp}
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
                            <form className="sign-up-form" onSubmit={handleSubmit}>
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
                                <input
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input-inf"
                                />
                                {errors.passwordConfirm && touched.passwordConfirm && (
                                    <div className="input-feedback">{errors.passwordConfirm}</div>
                                )}
                                <button
                                    type="submit"
                                    disabled={!isValid || !dirty}
                                    onClick={() => handleClick(values)}
                                    className="submit-sign-up"
                                >
                                    Зарегистрироватся
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                { emailUse ? <p className="email-to-use">Адрес электронной почты уже используется другим аккаунтом.</p> : null }
                <AuthInvitation 
                    account={'Есть аккаунт?'}
                    path={'/auth'}
                    text={'Войдите'}
                />
            </div>
        </main>
    )
}

export default SignUpForm;