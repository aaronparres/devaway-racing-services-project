import React, { Fragment } from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children, driversRanking, racesResults }) => {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    )
}

export default Layout;
