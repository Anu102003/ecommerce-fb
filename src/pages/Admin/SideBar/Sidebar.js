import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { basic } from '../../../images';
import "./_sidebar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faRightFromBracket, } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../../i18n';

export const Sidebar = ({ sidePopup, setSidePopup }) => {
    const Dashboard = "Dashboard"
    const Products = "Products"
    const Orders = "Orders"
    const Customer = "Customer"
    const Payments = "Payments"

    const navigate = useNavigate();
    const location = useLocation();

    const { email } = useSelector(state => state.user);
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin")
    };


    const pathname = location.pathname;
    const [sideMenuSelected, setSideMenuSelected] = useState()

    const handleRedirect = menu => {
        navigate(`/${menu.toLowerCase()}`);
    };

    useEffect(() => {
        if (pathname === '/admin') setSideMenuSelected(Dashboard)
        if (pathname === '/dashboard') setSideMenuSelected(Dashboard)
        if (pathname === '/products') setSideMenuSelected(Products)
        if (pathname === '/orders') setSideMenuSelected(Orders)
        if (pathname === '/customer') setSideMenuSelected(Customer)
        if (pathname === '/payments') setSideMenuSelected(Payments)
    }, [pathname])


    const [locale, setLocale] = useState(i18n.language);

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        const handleLanguageChange = (lng) => setLocale(lng);
        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);
    return (
        <>
            <div className='sidebar'>

                <div className='sidebar__logo' onClick={() => { handleRedirect(Dashboard) }}>
                    <img src={basic.logoWhite} />
                </div>
                <div className='sidebar__menu'>
                    <div className={`content ${sideMenuSelected === Dashboard && "active"}`} onClick={() => { handleRedirect(Dashboard) }}>Dashboard
                    </div>
                    <div className={`content ${sideMenuSelected === Products && "active"}`} onClick={() => { handleRedirect(Products) }}>Products
                    </div>
                    <div className={`content ${sideMenuSelected === Orders && "active"}`} onClick={() => { handleRedirect(Orders) }}>Orders
                    </div>
                    <div className={`content ${sideMenuSelected === Customer && "active"}`} onClick={() => { handleRedirect(Customer) }}>Customer
                    </div>
                    <div className={`content ${sideMenuSelected === Payments && "active"}`} onClick={() => { handleRedirect(Payments) }}>Payments
                    </div>
                </div>
            </div>


            <div className='sidebar-left'>
                <div className='search-logout-container'>

                    <div className='search'>
                        <input type='text' placeholder='Search' />
                        <div className='search-icon'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
                        </div>
                    </div>

                    <div className='profile-logout-wrapper'>
                        <div className='select-language'>
                            <select className="select-language__select" value={locale} onChange={handleChange}>
                                <option className="select-language__option" value="en">English</option>
                                <option className="select-language__option" value="zh">Chinese</option>
                            </select>
                        </div>
                        <div className='profile-img'>
                            <img src={email.profileImg} />
                        </div>

                        <div className="logout-btn" onClick={handleLogout}>
                            <div className='logout-icon'>
                                <FontAwesomeIcon icon={faRightFromBracket} color='white' />
                            </div>
                            <button>Logout</button>
                        </div>

                    </div>

                    <div className='more-icon-wrapper' onClick={() => { setSidePopup(!sidePopup) }}>
                        <FontAwesomeIcon className='more-icon' size='xl' icon={faBars} />
                    </div>
                </div>
            </div>
        </>
    )
}