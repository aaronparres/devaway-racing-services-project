import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { numberSuffix, setMedalEmoji } from '../../shared/commonUtils';

import './Driver.scss';

import DriverPosition from './DriverPosition/DriverPosition';

const Driver = ({ racesResults, driversRanking, fromCarouselId }) => {
    const { id } = useParams();
    const history = useHistory();

    const [selectedDriver, setSelectedDriver] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);

    const getDriverRacesInfo = useCallback((filteringId) => {
        // Get driver info by id
        const driverInfo = driversRanking.filter(position => position._id === filteringId);
        if (driverInfo.length < 1) history.push('/'); // Redirect when driver is not found with the provided id
        setSelectedDriver(...driverInfo);

        // Get driver races info by id
        const driverRacesInfo = [];
        racesResults.forEach(race => {
            race.forEach(position => {
                if (position._id === filteringId) driverRacesInfo.push(position);
            })
        });
        setDriverRaces(driverRacesInfo);
    }, [driversRanking, history, racesResults]);

    useEffect(() => {
        fromCarouselId ? getDriverRacesInfo(fromCarouselId) : getDriverRacesInfo(id);
    }, [fromCarouselId, getDriverRacesInfo, id]);

    window.scrollTo(0, 0);

    const { name, globalPosition, age, counter, picture, team } = selectedDriver;

    return (
        <div className="container">
            <div className="card">
                <div className={`team-banner ${team && `team-banner__${team.toLowerCase()}`}`}></div>
                <div className="top-content">
                    <div className="center-image">
                        <img className="img-fluid img-thumbnail" src={picture} alt="driver-img" />
                    </div>
                    <h2>{name} <sup>({age} yo)</sup></h2>
                    <div className="info d-flex">
                        <h4>Global position: <span className="item-red">{numberSuffix(globalPosition)}</span>{setMedalEmoji(globalPosition)}</h4>
                        <h4>Total points: <span className="item-red">{counter}</span></h4>
                    </div>
                </div>
            </div>
            <div className="card table-positions">
                <ul className="list-group list-group-flush">
                    {driverRaces &&
                        driverRaces.map((infoRace, i) => {
                            const { positionInRace, race } = infoRace;
                            return (
                                <DriverPosition key={i} positionInRace={positionInRace} race={race} index={i} />
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

Driver.propTypes = {
    driversRanking: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            age: PropTypes.number.isRequired,
            counter: PropTypes.number.isRequired,
            globalPosition: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            team: PropTypes.string.isRequired,
        })
    ).isRequired,
    racesResults: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                age: PropTypes.number,
                pointsCounter: PropTypes.number,
                positionInRace: PropTypes.number.isRequired,
                name: PropTypes.string,
                picture: PropTypes.string,
                team: PropTypes.string,
                race: PropTypes.shape({
                    name: PropTypes.string,
                    time: PropTypes.string.isRequired,
                }).isRequired
            })
        )
    ).isRequired,
    fromCarouselId: PropTypes.string,
}

export default Driver;
