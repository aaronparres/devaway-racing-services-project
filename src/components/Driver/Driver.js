/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

const Driver = ({ racesResults, driversRanking, fromCarouselId }) => {
    const { id } = useParams();
    const history = useHistory();

    const [selectedDriver, setSelectedDriver] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);

    useEffect(() => {
        fromCarouselId ? getDriverRacesInfo(fromCarouselId) : getDriverRacesInfo(id);
    }, [fromCarouselId, id]);

    const getDriverRacesInfo = (filteringId) => {
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
    }

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

export default Driver;
