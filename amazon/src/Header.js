import React from 'react';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';

import './Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <StorefrontIcon className="header__logoImage" fontSize="large" />
                <h2 className="header__logoTitle">Vina</h2>
            </div>

            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <div className="nav__item">
                    <span className="nav__item-LineOne">Hello Guest</span>
                    <span className="nav__item-LineTwo">Sign In</span>
                </div>
                <div className="nav__item">
                    <span className="nav__item-LineOne">Your</span>
                    <span className="nav__item-LineTwo">Shop</span>
                </div>
                <div className="nav__itemBasket">
                    <ShoppingBasketIcon className="nav__basketIcon" />
                    <span className="nav__item-LineTwo nav__basketCount">0</span>
                </div>
            </div>
        </div>
    )
}

export default Header