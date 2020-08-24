import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import './Race.scss';

import RacePosition from './RacePosition/RacePosition';

const Race = ({ racesResults, fromCarouselIndex }) => {
    const { raceIndex } = useParams();
    const history = useHistory();

    const [raceInfo, setRaceInfo] = useState([]);

    const getRaceInfo = useCallback((filteringIndex) => {
        // To avoid anything that is not a number
        if (isNaN(filteringIndex)) history.push('/');
        // Check if the number is inside the races[] length
        if (filteringIndex > 0 && filteringIndex <= racesResults.length) {
            setRaceInfo(racesResults[filteringIndex - 1]);
        } else {
            history.push('/');
        }
    }, [history, racesResults]);

    useEffect(() => {
        fromCarouselIndex ? getRaceInfo(fromCarouselIndex) : getRaceInfo(raceIndex);
    }, [fromCarouselIndex, getRaceInfo, raceIndex]);


    window.scrollTo(0, 0);
    return (
        <div className="container">
            <h1 className="race-center-text">RACE {!fromCarouselIndex ? raceIndex : fromCarouselIndex}</h1>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {raceInfo &&
                        raceInfo.map((driver, i) => (
                            <RacePosition key={i} driver={driver} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

Race.propTypes = {
    racesResults: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                age: PropTypes.number,
                pointsCounter: PropTypes.number.isRequired,
                positionInRace: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                picture: PropTypes.string,
                team: PropTypes.string.isRequired,
                race: PropTypes.shape({
                    name: PropTypes.string,
                    time: PropTypes.string.isRequired,
                })
            })
        )
    ).isRequired,
    fromCarouselIndex: PropTypes.number,
}

export default Race;
