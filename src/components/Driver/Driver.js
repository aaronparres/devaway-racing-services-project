import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Driver = ({ racesResults, driversRanking }) => {
    const { id } = useParams();
    const history = useHistory();

    const [selectedDriver, setSelectedDriver] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);

    useEffect(() => {
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

    }, [racesResults, driversRanking, id, history]);

    return (
        <div className="container">
            <div className="card">
                {selectedDriver.name}
                Global position: {selectedDriver.globalPosition}
                {driverRaces.map((race, i) => (
                    <div key={i}>
                        <p>Race {i + 1} - pos: {race.positionInRace}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Driver;
