import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ components }) => {

    const [componentIndex, setComponentIndex] = useState(0);

    useEffect(() => {
        const timeout = setInterval(() => {
            setComponentIndex((prevIndex) => {
                if (prevIndex === (components.length - 1)) {
                    return 0;
                } else {
                    return prevIndex + 1;
                }
            });
        }, 5000);
        return () => clearInterval(timeout);
    }, [componentIndex, components.length])

    let component = components[componentIndex];

    return (
        <Fragment>
            {component}
        </Fragment>
    )
}

Carousel.prototypes = {
    components: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Carousel;
