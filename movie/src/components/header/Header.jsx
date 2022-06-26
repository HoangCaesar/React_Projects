import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './header.scss';
import logo from '../../assets/logoMovie2.png';
import { OutlineButton } from '../button/Button';
import Context from '../../store/Context';
import { auth } from '../../api/firebase';
import { setUserStatus } from '../../store/actions';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
];

const status = {
    login: 'login',
    signup: 'signup'
}

function Header() {
    const [state, dispatch] = useContext(Context);
    const { userEmail, userInfo, userStatus } = state;

    const navigate = useNavigate();

    const handleSignout = () => {
        auth.signOut();
        dispatch(setUserStatus(false));
        navigate('/');
    }

    let { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <Link to="/">myMovies</Link>
                </div>
                {
                    userStatus
                        ? <ul className="header__nav">
                            {
                                headerNav.map((e, i) => (
                                    <li key={i} className={`${i === active ? 'active' : ''}`}>
                                        <Link to={e.path}>
                                            {e.display}
                                        </Link>
                                    </li>
                                ))
                            }
                            <OutlineButton className="small" onClick={handleSignout}>
                                Sign Out
                            </OutlineButton>
                        </ul>
                        : ''
                }

            </div>
        </div>
    );
}

export default Header;