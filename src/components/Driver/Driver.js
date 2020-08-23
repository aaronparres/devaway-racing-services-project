import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';

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

    const { name, globalPosition } = selectedDriver;

    return (
        <div className="container">
            <div className="card">
                {name}
                Global position: {globalPosition}
                {driverRaces.map((race, i) => (
                    <div key={i}>
                        <p><Link to={`/race/${i + 1}`}>Race {i + 1} - pos: {race.positionInRace}</Link></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

Driver.propTypes = {
    driversRanking: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
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
    fromCarouselId: PropTypes.string,
}

export default Driver;
