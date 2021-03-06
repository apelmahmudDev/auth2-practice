import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="nav">
           <Link to="/home">Home</Link>
           <Link to="/review">Product Review</Link>
           <Link to="/login">Log In</Link>
           <Link to ="/setPhoto"> Set User Photo</Link>
        </nav>
    );
};

export default Header;