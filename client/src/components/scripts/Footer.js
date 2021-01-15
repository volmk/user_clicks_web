import React from 'react';
import '../styles/Footer.scss'

function Footer({backgroundOff}) {
    const footerClass = ['footer']
    const logoClass = ['footer__logo']

    if(backgroundOff) {
        footerClass.push('footer--bg_transparent')
    }

    return <div className={footerClass.join(' ')}>
        <div className="footer__content">
            <div className={logoClass.join(' ')}>AppCo</div>
            <div className="footer__center">
                All rights reserved by ThemeTags
            </div>
            <div className="footer__copy">
                Copyrights © 2019.
            </div>
        </div>
    </div>
}

export default Footer;