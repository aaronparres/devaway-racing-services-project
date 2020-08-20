import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

const RacesList = ({ racesResults }) => {
    const { num } = useParams();
    const history = useHistory();

    const [raceInfo, setRaceInfo] = useState([]);

    useEffect(() => {
         // To avoid anything that is not a number
        if (isNaN(num)) history.push('/');
        // Check if the number is inside the races[] length
        if (num > 0 && num <= racesResults.length) {
            setRaceInfo(racesResults[num - 1]);
        } else {
            history.push('/');
        }
    }, [history, num, racesResults])

    return (
        <div className="container-fluid">
            <h1 className="center-text">RACE {num}</h1>
            {raceInfo && raceInfo.map((position, i) => (
                <p key={i}><Link to={`/driver/${position._id}`}>{position.name}</Link></p>
            ))}
        </div>
    )
}

export default RacesList;
