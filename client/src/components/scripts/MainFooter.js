import React from 'react';
import Footer from "./Footer";
import '../styles/MainFooter.scss'

function MainFooter() {
    return <div className='main_footer'>
        <div className="main_footer__content">
            <form className="main_footer__form">
                <input type="email" placeholder="Enter your email" className="main_footer__input"/>
                <button className="main_footer__button">Subscribe</button>
            </form>
        </div>
        <Footer backgroundOff={true}/>
    </div>

}

export default MainFooter;