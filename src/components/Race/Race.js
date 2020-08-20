/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import './Race.scss';

const Race = ({ racesResults, fromCarouselIndex }) => {
    const { num } = useParams();
    const history = useHistory();

    const [raceInfo, setRaceInfo] = useState([]);

    useEffect(() => {
        fromCarouselIndex ? getRaceInfo(fromCarouselIndex) : getRaceInfo(num);
    }, [fromCarouselIndex, num]);

    const getRaceInfo = (number) => {
        // To avoid anything that is not a number
        if (isNaN(number)) history.push('/');
        // Check if the number is inside the races[] length
        if (number > 0 && number <= racesResults.length) {
            setRaceInfo(racesResults[number - 1]);
        } else {
            history.push('/');
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="center-text">RACE {!fromCarouselIndex ? num : fromCarouselIndex}</h1>
            {raceInfo && raceInfo.map((driver, i) => (
                <p key={i}><Link to={`/driver/${driver._id}`}>{driver.name}</Link></p>
            ))}
        </div>
    )
}

export default Race;
