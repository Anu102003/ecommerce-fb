import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSoild, faUser as faUserSoild } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./_navbarIcons.scss"
export const NavbarIcons = () => {
    const profile = 'profile'
    const wishlist = 'wishlist'
    const cart = 'cart'

    const [iconHovered, setIconHovered] = useState({
        profile: false,
        wishlist: false,
        cart: false
    });
    
    const handleIconHover = (key, isHovered) => {
        setIconHovered(prevValue => ({
            ...prevValue,
            [key]: isHovered
        }));
    };
    return (
        <div className='icon'>
            <div className='icon__profile'
                onMouseEnter={() => handleIconHover(profile, true)}
                onMouseLeave={() => handleIconHover(profile, false)}
            >
                <FontAwesomeIcon icon={iconHovered.profile ? faUserSoild : faUser} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.profile && 'purple' }}>Profile</span>
            </div>

            <div className='icon__wishlist'
                onMouseEnter={() => handleIconHover(wishlist, true)}
                onMouseLeave={() => handleIconHover(wishlist, false)}
            >
                <FontAwesomeIcon icon={iconHovered.wishlist ? faHeartSoild : faHeart} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.wishlist && 'purple' }}>Wishlist</span>

            </div>
            <div className='icon__cart'
                onMouseEnter={() => handleIconHover(cart, true)}
                onMouseLeave={() => handleIconHover(cart, false)}
            >
                <FontAwesomeIcon icon={faShoppingCart} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.cart && 'purple' }}>Cart</span>
            </div>
        </div>
    )
}
