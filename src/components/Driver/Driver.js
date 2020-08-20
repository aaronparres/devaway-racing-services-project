import React from 'react';
import { useParams } from 'react-router-dom';

const Driver = () => {
    const { id } = useParams();
    return (
        <div className="container">
            <div className="card">
                {id}
            </div>
        </div>
    )
}

export default Driver;
