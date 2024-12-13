import React, { useContext, useRef, useState } from 'react';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import { Link } from 'react-router-dom';

const AccountForm = () => {
    const { isFormOpen, toggleForm, setLoggedInUser } = useContext(commonContext);
    const { inputValues, handleInputValues } = useForm();
    const formRef = useRef();

    // Cerrar el formulario cuando se hace clic fuera de él
    useOutsideClose(formRef, () => toggleForm(false));
    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);

    // Alternar entre las vistas de Registro e Inicio de Sesión
    const handleIsSignupVisible = () => {
        setIsSignupVisible((prevState) => !prevState);
    };

    // Enviar el formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (isSignupVisible) {
            // Lógica de registro
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some((user) => user.email === inputValues.mail);

            if (userExists) {
                alert('Este correo ya está registrado.');
            } else if (inputValues.password !== inputValues.conf_password) {
                alert('Las contraseñas no coinciden.');
            } else {
                const newUser = {
                    username: inputValues.username,
                    email: inputValues.mail,
                    password: inputValues.password,
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsSignupVisible(false);
            }
        } else {
            // Lógica de inicio de sesión
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(
                (user) => user.email === inputValues.mail && user.password === inputValues.password
            );

            if (user) {
                alert(`Bienvenido, ${user.username || 'Usuario'}!`);
                localStorage.setItem('loggedInUser', user.username); // Guarda el usuario logeado
                setLoggedInUser(user.username); // Actualiza el estado global con el nombre de usuario
                toggleForm(false); // Cierra el formulario
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        }
    };

    return (
        <>
            {isFormOpen && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>
                            {/* Form Header */}
                            <div className="form_head">
                                <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                                <p>
                                    {isSignupVisible
                                        ? 'Ya cuentas con una cuenta ?'
                                        : 'Nuevo en PadArt ?'}
                                    &nbsp;&nbsp;
                                    <button type="button" onClick={handleIsSignupVisible}>
                                        {isSignupVisible ? 'Login' : 'Crea una cuenta'}
                                    </button>
                                </p>
                            </div>

                            {/* Form Body */}
                            <div className="form_body">
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            name="username"
                                            className="input_field"
                                            value={inputValues.username || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Username</label>
                                    </div>
                                )}

                                <div className="input_box">
                                    <input
                                        type="email"
                                        name="mail"
                                        className="input_field"
                                        value={inputValues.mail || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Email</label>
                                </div>

                                <div className="input_box">
                                    <input
                                        type="password"
                                        name="password"
                                        className="input_field"
                                        value={inputValues.password || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Password</label>
                                </div>

                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="conf_password"
                                            className="input_field"
                                            value={inputValues.conf_password || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Confirm Password</label>
                                    </div>
                                )}

                                <button type="submit" className="btn login_btn">
                                    {isSignupVisible ? 'Signup' : 'Login'}
                                </button>
                            </div>

                            {/* Form Footer */}
                            <div className="form_foot">
                                <p>o logeate con</p>
                                <div className="login_options">
                                    <Link to="/">Facebook</Link>
                                    <Link to="/">Google</Link>
                                    <Link to="/">Twitter</Link>
                                </div>
                            </div>

                            {/* Close Button */}
                            <div
                                className="close_btn"
                                title="Close"
                                onClick={() => toggleForm(false)}
                            >
                                &times;
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountForm;
