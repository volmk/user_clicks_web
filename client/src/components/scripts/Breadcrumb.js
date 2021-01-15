import React from 'react';
import '../styles/Breadcrumb.scss'
import {Link} from "react-router-dom";

function Breadcrumb({links}) {
    return <ul className='breadcrumbs'>
        {links.map(item =>
            <li key={item.title.replace(/\s/, '')} className='breadcrumbs__item'>
                <Link to={item.link}>{item.title}</Link>
            </li>
        )}
    </ul>
}

export default Breadcrumb;