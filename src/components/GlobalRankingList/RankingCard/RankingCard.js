import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { numberSuffix, setMedalEmoji } from '../../../shared/commonUtils';

import './RankingCard.scss';

const RankingCard = ({ driverInfo }) => {
    const { globalPosition, team, name, counter, _id } = driverInfo;

    return (
        <section className="container">
            <div className="card margin__card">
                <div className="card-header">
                    <h5 className="margin__title">
                        {setMedalEmoji(globalPosition)} {numberSuffix(globalPosition)} Position
                    </h5>
                </div>
                <div className={`card-body ${team && `card-body__${(team).toLowerCase()}`}`}>
                    <h5 className="card-title title-size">{name}</h5>
                    <h6 className="card-text">{counter} points</h6>
                    <Link to={`/driver/${_id}`} className="btn btn-warning margin__button">See driver info</Link>
                </div>
            </div>
        </section>
    )
}

RankingCard.propTypes = {
    driverInfo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        counter: PropTypes.number.isRequired,
        globalPosition: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        team: PropTypes.string.isRequired,
    }),
}

export default RankingCard;
