/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';

import './Race.scss';

const Race = ({ racesResults, fromCarouselIndex }) => {
    const { raceIndex } = useParams();
    const history = useHistory();

    const [raceInfo, setRaceInfo] = useState([]);

    useEffect(() => {
        fromCarouselIndex ? getRaceInfo(fromCarouselIndex) : getRaceInfo(raceIndex);
    }, [fromCarouselIndex, raceIndex]);

    const getRaceInfo = (filteringIndex) => {
        // To avoid anything that is not a number
        if (isNaN(filteringIndex)) history.push('/');
        // Check if the number is inside the races[] length
        if (filteringIndex > 0 && filteringIndex <= racesResults.length) {
            setRaceInfo(racesResults[filteringIndex - 1]);
        } else {
            history.push('/');
        }
    };

    window.scrollTo(0, 0);
    return (
        <div className="container-fluid">
            <h1 className="race-center-text">RACE {!fromCarouselIndex ? raceIndex : fromCarouselIndex}</h1>
            {raceInfo && raceInfo.map((driver, i) => (
                <p key={i}><Link to={`/driver/${driver._id}`}>{driver.name}</Link></p>
            ))}
        </div>
    )
}

Race.propTypes = {
    racesResults: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                age: PropTypes.number.isRequired,
                pointsCounter: PropTypes.number.isRequired,
                positionInRace: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
                team: PropTypes.string.isRequired,
                race: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    time: PropTypes.string.isRequired,
                })
            })
        )
    ).isRequired,
    fromCarouselIndex: PropTypes.number,
}

export default Race;
