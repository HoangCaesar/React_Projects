import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/footer-bg.jpg';
import './guestPage.scss'
import Button from '../button/Button';

const GuestPage = props => {
    return (
        <div className="guestPage" style={{ backgroundImage: `url(${Logo})` }}>
            <h1 className="title">Unlimited movies, TV shows, and more.</h1>
            <h3 className="des">Watch anywhere. Cancel anytime.</h3>
            <p className="announce">Ready to watch? Sign up to create or restart your membership.</p>
            {
                props.msg
                    ? <h1 style={{ color: 'blue', fontWeight: "700" }}>{props.msg}</h1>
                    : ''
            }
            <Button className="small guestPage-btn">
                <Link to={`${props.path}`}>{props.type}</Link>
            </Button>
        </div>
    )
};

export default GuestPage;