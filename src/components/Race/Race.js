/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import { numberSuffix, setMedalEmoji, getColorTeam } from '../../shared/commonUtils';

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
        <div className="container">
            <h1 className="race-center-text">RACE {!fromCarouselIndex ? raceIndex : fromCarouselIndex}</h1>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {raceInfo &&
                        raceInfo.map((driver, i) => {
                            const { positionInRace, name, _id, race, pointsCounter, team } = driver;
                            const colorTeam = getColorTeam(team);
                            return (
                                <Link key={i} className="clickable" to={`/driver/${_id}`}>
                                    <p className="card-header">{numberSuffix(positionInRace)} Position {setMedalEmoji(positionInRace)}</p>
                                    <li className="list-group-item">
                                        <div className="d-flex">
                                            <div className="col-sm-4">
                                                <p className="item-black">{name}</p>
                                                <p className="item-black">{pointsCounter} points</p>
                                            </div>
                                            <p className="item-black col-sm-4">Team: &nbsp;<span style={{ color: `${colorTeam}` }}>{team}</span></p>
                                            <p className="item-black col-sm-4" style={{ textAlign: "right" }}>
                                                Time - &nbsp;<span style={{ color: "rgb(238, 72, 72)" }}>{race.time}</span>
                                            </p>
                                        </div>
                                    </li>
                                </Link>
                            );
                        })
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
