import React from 'react';
import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import mobile from "../../images/mobile.png";
import '../styles/MainHeader.scss'

function MainHeader(props) {
    return <header className="header">
        <div className="header__container">
            <Navbar background={false}/>
            <div className="header__body">
                <div className="header__content">
                    <h1 className="header__title">
                        <strong>Brainstorming</strong> for desired perfect Usability
                    </h1>
                    <div className="header__subtitle">
                        Our design projects are fresh and simple and will benefit your business greatly. Learn more
                        about
                        our work!
                    </div>
                    <Link to='/users'>
                        <button className="header__button">
                            Views Stats
                        </button>
                    </Link>
                </div>
                <div className="header__image">
                    <img src={mobile} alt="Mobile app"/>
                </div>
            </div>
        </div>
    </header>
}

export default MainHeader;