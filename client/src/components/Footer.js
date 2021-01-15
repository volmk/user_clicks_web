import React from 'react';
import './Footer.scss'
function Footer({background}) {
    const footerClass = ['footer']
    const logoClass = ['footer__logo']

    if(!background) {
        footerClass.push('footer--bigger')
        logoClass.push('footer__logo--bigger')
    }

    return <div className={footerClass.join(' ')}>
        <div className={logoClass.join(' ')}>AppCo</div>
        <div className="footer__center">
            All rights reserved by ThemeTags
        </div>
        <div className="footer__copy">
            Copyrights © 2019.
        </div>
    </div>
}

export default Footer;