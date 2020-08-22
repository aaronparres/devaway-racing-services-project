import React from 'react'

import './Header.scss';

import Logo from '../../UI/Logo/Logo';
import NavButton from './NavButton/NavButton';
import { Link } from 'react-router-dom';

const Header = ({drivers, races}) => {
    return (
        <header className="toolbar">
            <div className="toolbar-logo">
                <Link to="/"><Logo /></Link>
            </div>
            <nav>
                <NavButton />
            </nav>
        </header>
    );
};

export default Header;