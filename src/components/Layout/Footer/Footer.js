import React from 'react';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer-box'>
            <div className='foot-list'>
                <ul>
                    <li><a href="#TC" onClick={(e) => e.preventDefault()}>Terms and conditions</a></li>
                    <li><a target="_blank" rel='noreferrer noopener' href='https://www.instagram.com/aaronparres_/'>Developer</a></li>
                    <li><a href='#FAQ' onClick={(e) => e.preventDefault()}>FAQ</a></li>
                </ul>
            </div>
            <div className='foot-copy'>
                <p>© 2020 - Devaway Racing Services</p>
            </div>
        </footer>
    )
}
export default Footer;
