import React, { Fragment } from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header/>
            <main style={{marginTop: "5rem"}}>
                {children}
            </main>
            <Footer />
        </Fragment>
    )
}

export default Layout;
