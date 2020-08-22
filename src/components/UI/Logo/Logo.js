import React from 'react';

import logo from '../../../assets/logo/logo.svg';
import './Logo.scss';

const Logo = () => {
    return (
        <div className="racing-logo devaway-racing-logo">
            <img src={logo} alt="devaway-racing-logo" />
        </div>
    );
};

export default Logo;