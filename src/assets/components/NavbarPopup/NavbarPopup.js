import React from 'react'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faMobileScreenButton, faPerson, faPersonDress, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons'
import "./_navbarPopup.scss"
import { useNavigate } from 'react-router-dom'
export const NavbarPopup = ({ setNavPopup, type }) => {
    const navigate = useNavigate()
    const handleRedirect = (menu) => {
        console.log(menu)
        if (menu === "Home") {
            navigate("/home")
            setNavPopup(false)
        }
        if (menu === "Men") {
            navigate("/men")
            setNavPopup(false)
        }
        if (menu === "Women") {
            navigate("/women")
            setNavPopup(false)
        }
        if (menu === "Electronics") {
            navigate("/electronics")
            setNavPopup(false)
        }
        if (menu === "Mobile") {
            navigate("/mobile")
            setNavPopup(false)
        }
        if (menu === "Dashboard") {
            navigate("/dashboard")
            setNavPopup(false)
        }
        if (menu === "Products") {
            navigate("/products")
            setNavPopup(false)
        }
        if (menu === "Orders") {
            navigate("/orders")
            setNavPopup(false)
        }
        if (menu === "Customer") {
            navigate("/customer")
            setNavPopup(false)
        }
        if (menu === "Payments") {
            navigate("/payments")
            setNavPopup(false)
        }
    }
    return (
        <div className='popup-navbar'>
            <div className='menu-icons-container'>

                <div className='menu'>
                    <p className='content search-content' onClick={() => { handleRedirect("Search") }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-style' />
                        Search
                    </p>
                    {
                        type === "User" ?
                            <>
                                <p className='content' onClick={() => { handleRedirect("Home") }}>
                                    <FontAwesomeIcon icon={faHouse} className='icon-style' />
                                    Home
                                </p>
                                <p className='content' onClick={() => { handleRedirect("Men") }}>
                                    <FontAwesomeIcon icon={faPerson} className='icon-style' />
                                    Mens</p>
                                <p className='content' onClick={() => { handleRedirect("Women") }}>
                                    <FontAwesomeIcon icon={faPersonDress} className='icon-style' />
                                    Womens</p>
                                <p className='content' onClick={() => { handleRedirect("Electronics") }}>
                                    <FontAwesomeIcon icon={faStore} className='icon-style' />
                                    Electronics</p>
                                <p className='content' onClick={() => { handleRedirect("Mobile") }}>
                                    <FontAwesomeIcon icon={faMobileScreenButton} className='icon-style' />
                                    Mobiles</p>
                                <p className='content'>
                                    <FontAwesomeIcon icon={faUser} className='icon-style' />
                                    Profile</p>
                                <p className='content' >
                                    <FontAwesomeIcon icon={faHeart} className='icon-style' />
                                    Wishlist</p>
                                <p className='content' >
                                    <FontAwesomeIcon icon={faShoppingCart} className='icon-style' />Cart</p>
                            </> :
                            <>
                                <p className='content' onClick={() => { handleRedirect("Dashboard") }}>
                                    <FontAwesomeIcon icon={faHouse} className='icon-style' />
                                    Dashboard
                                </p>
                                <p className='content' onClick={() => { handleRedirect("Products") }}>
                                    <FontAwesomeIcon icon={faPerson} className='icon-style' />
                                    Products</p>
                                <p className='content' onClick={() => { handleRedirect("Orders") }}>
                                    <FontAwesomeIcon icon={faPersonDress} className='icon-style' />
                                    Orders</p>
                                <p className='content' onClick={() => { handleRedirect("Customer") }}>
                                    <FontAwesomeIcon icon={faStore} className='icon-style' />
                                    Customer</p>
                                <p className='content' onClick={() => { handleRedirect("Payments") }}>
                                    <FontAwesomeIcon icon={faStore} className='icon-style' />
                                    Payments</p>
                            </>
                    }
                </div>

            </div>
        </div>
    )
}
