import React from 'react';

import './Spinner.scss';

const Spinner = () => (
    <div className="spinner-backdrop">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div>

);

export default Spinner;