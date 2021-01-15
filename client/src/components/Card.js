import React from 'react';
import './Card.scss'
function Card({icon, iconAlt, title, subtitle}) {
    return <div className='card'>
        <div className="card__content">
            <div className="card__image">
                <img src={icon} alt={iconAlt}/>
            </div>
            <div className="card__title">{title}</div>
            <div className="card__subtitle">{subtitle}</div>
        </div>
    </div>
}

export default Card;