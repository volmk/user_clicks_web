import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss'

function Navbar({background}) {
    return <nav className="nav">
        <div className="nav__logo">
            <Link to='/'>AppCo</Link>
        </div>
    </nav>
}

export default Navbar;