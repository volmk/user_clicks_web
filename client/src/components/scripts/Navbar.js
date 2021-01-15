import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Navbar.scss'

function Navbar({backgroundOff}) {
    const navClass = ['nav']

    if (backgroundOff) {
        navClass.push('nav--bg_transparent')
    }

    return <nav className={navClass.join(' ')}>
        <div className="nav__content">
            <div className="nav__logo">
                <Link to='/'>AppCo</Link>
            </div>
        </div>
    </nav>
}

export default Navbar;