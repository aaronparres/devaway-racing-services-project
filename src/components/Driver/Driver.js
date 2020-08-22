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

    const getDriverRacesInfo = (id) => {
        // Get driver info by id
        const driverInfo = driversRanking.filter(position => position._id === id);
        if (driverInfo.length < 1) history.push('/'); // Redirect when driver is not found with the provided id
        setSelectedDriver(...driverInfo);

        // Get driver races info by id
        const driverRaces = [];
        racesResults.forEach(race => {
            race.forEach(position => {
                if (position._id === id) driverRaces.push(position);
            })
        });
        setDriverRaces(driverRaces);
    }
    window.scrollTo(0, 0);
    return (
        <div className="container">
            <div className="card">
                {selectedDriver.name}
                Global position: {selectedDriver.globalPosition}
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
