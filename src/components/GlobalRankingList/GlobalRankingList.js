import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GlobalRankingList.scss';

import RankingCard from './RankingCard/RankingCard';

const GlobalRankingList = ({ driversRanking, races }) => {
    window.scrollTo(0, 0);
    return (
        <div className="container-fluid">
            <h1 className="global-center-text">GLOBAL RANKING</h1>
            {races &&
                <div className="container">
                    <div className="dropdown">
                        <button className="btn btn-danger dropdown-toggle">See Races info</button>
                        <div className="dropdown-content">
                            {races && races.map((race, i) => (
                                <Link key={i} to={`/race/${i + 1}`}>Race {i + 1}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {driversRanking && driversRanking.map((driver, i) => (
                <RankingCard key={i} driverInfo={driver} />
            ))}
        </div>
    )
}

RankingCard.propTypes = {
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
    ),
}

export default GlobalRankingList;
