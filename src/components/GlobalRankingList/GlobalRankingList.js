import React from 'react';

import './GlobalRankingList.scss';

import RankingCard from './RankingCard/RankingCard';

const GlobalRankingList = ({ driversRanking }) => {
    return (
        <div className="container-fluid">
            <h1 className="center-text">GLOBAL RANKING</h1>
            {driversRanking && driversRanking.map((driver, i) => (
                <RankingCard key={i} driverInfo={driver} />
            ))}
        </div>
    )
}

export default GlobalRankingList;
