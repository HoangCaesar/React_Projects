import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/logoMovie2.png';

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content--logo mb-3">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <Link to="/">myMovies</Link>
                    </div>
                </div>
                <div className="footer__content--menus">
                    <div className="footer__content-menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About Us</Link>
                    </div>
                    <div className="footer__content-menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Privacy policy</Link>
                    </div>
                    <div className="footer__content-menu">
                        <Link to="/">You must wacth</Link>
                        <Link to="/">Recent Release</Link>
                        <Link to="/">Top IMDb</Link>
                    </div>
                    <div className="footer__content-menu">
                        <Link to="/">Account</Link>
                        <Link to="/">Ways to watch</Link>
                        <Link to="/">Corporation Informatuon</Link>
                        <Link to="/">Only on myMovies</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;