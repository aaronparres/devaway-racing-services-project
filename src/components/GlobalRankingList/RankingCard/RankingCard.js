import React from 'react';
import { numberSuffix } from '../../../shared/commonUtils';

import './RankingCard.scss';

import { Link } from 'react-router-dom'

const RankingCard = ({driverInfo}) => {
    const { globalPosition, team, name, counter, _id } = driverInfo;

    return (
        <div className="container">
            <div className="card margin__card">
                <div className="card-header">
                    <h5 className="margin__title">{numberSuffix(globalPosition)} Position</h5>
                </div>
                <div className={`card-body ${team ? `card-body__${(team).toLowerCase()}` : ''}`}>
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-text">{counter} points</h6>
                    <Link to={`/driver/${_id}`} className="btn btn-warning margin__button">See driver info</Link>
                </div>
            </div>
        </div>
    )
}

export default RankingCard;
