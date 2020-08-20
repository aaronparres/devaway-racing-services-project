import React from 'react';
import { useParams } from 'react-router-dom';

const Driver = ({ driversList, racesResults }) => {
    const { id } = useParams();
    console.log('driversList', driversList)
    console.log('racesResults', racesResults)
    return (
        <div className="container">
            <div className="card">
                {id}
            </div>
        </div>
    )
}

export default Driver;
