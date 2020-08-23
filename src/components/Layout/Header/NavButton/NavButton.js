import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavButton.scss';

const NavButton = () => {
    return (
        <ul className="option">
            <li className="option-link">
                <NavLink to="/global" activeClassName="option-active">Global Ranking</NavLink>
            </li>
        </ul>
    );
};

export default NavButton;