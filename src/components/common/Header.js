import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';

const Header = () => {
    const { loggedInUser, setLoggedInUser, toggleForm, toggleSearch } = useContext(commonContext); // Obtener toggleSearch y toggleForm
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
        window.addEventListener('scroll', handleIsSticky);
        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    const cartQuantity = cartItems.length;

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null); // Actualiza el estado del usuario logueado
    };

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">PadArt</Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {cartQuantity > 0 && (
                                        <span className="badge">{cartQuantity}</span>
                                    )}
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Hola {loggedInUser ? <Link to="*">&nbsp;{loggedInUser}</Link> : 'Usuario'}</h4>
                                    <p>Inicia Sesion y empieza a ordenar</p>
                                    {!loggedInUser && (
                                        <button type="button" onClick={() => toggleForm(true)}>
                                            Login / Signup
                                        </button>
                                    )}
                                    {loggedInUser && (
                                        <button type="button" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    )}
                                    <div className="separator"></div>
                                    <ul>
                                        {dropdownMenu.map((item) => {
                                            const { id, link, path } = item;
                                            return (
                                                <li key={id}>
                                                    <Link to={path}>{link}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

export default Header;
