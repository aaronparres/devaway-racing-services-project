import React, { useEffect, useState, Fragment } from 'react';

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
        }, 4000);
        return () => clearInterval(timeout);
    }, [componentIndex, components.length])

    let component = components[componentIndex % components.length];

    return (
        <Fragment>
            {component}
        </Fragment>
    )
}

export default Carousel;
