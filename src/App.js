import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as helpers from './shared/utility';

import data from './backend/devaway-racing-services-export.json';

const App = () => {
  const { driversData } = data;

  const [drivers, setDrivers] = useState(driversData);
  const [totalPositionsByRace, setTotalPositionsByRace] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);

  useEffect(() => {
    if (drivers.length < 1) return;
    console.log('drivers', drivers);
    const totalPositions = [];
    if (drivers && drivers.length > 0) {
      for (let i = 0; i < drivers[0].races.length; i++) {
        totalPositions.push(drivers.map(driver => {
          const { age, name, picture, team, _id, races } = driver;
          return {
            _id,
            age,
            name,
            picture,
            team,
            race: races[i],
          }
        }));
        totalPositions[i].sort((a, b) => timeParserIntoSeconds(a.race.time) - timeParserIntoSeconds(b.race.time));
        totalPositions[i] = totalPositions[i].map((driver, index) => ({
          ...driver,
          pointsCounter: 22 - index,
          positionInRace: index + 1,
        }));
      }
      setTotalPositionsByRace(totalPositions);
      console.log('totalPositionsByRace', totalPositions);
    }
  }, [drivers]);

  useEffect(() => {
    if (totalPositionsByRace.length < 1) return;
    const globalRankingCounters = [];
    if (totalPositionsByRace && totalPositionsByRace.length > 0) {
      drivers.forEach(driver => {
        totalPositionsByRace.forEach(race => {
          race.forEach(position => {
            if (driver._id === position._id) {
              const { pointsCounter } = position;
              const { age, name, picture, team, _id } = driver;
              globalRankingCounters.push({
                _id,
                age,
                name,
                picture,
                team,
                counter: pointsCounter,
              })
            }
          })
        })
      })
      const globalRanking = flattenCounterResults(globalRankingCounters);
      setGlobalRanking(globalRanking);
      console.log('globalRanking', globalRanking);
    }
  }, [drivers, totalPositionsByRace]);

  const timeParserIntoSeconds = (time) => {
    const timeParts = time.split(':');
    return +timeParts[0] * 3600 + +timeParts[1] * 60 + +timeParts[2];
  }

  const flattenCounterResults = (globalResults) => {
    const resultsFlatten = [];
    globalResults.forEach(globalResult => {
      const { _id, counter } = globalResult;
      const index = resultsFlatten.findIndex(result => result._id === _id);
      if (index === -1) {
        resultsFlatten.push({ ...globalResult, counter });
      } else {
        resultsFlatten[index].counter += counter;
      }
    });
    // Sorting and adding globalPosition to the results
    return resultsFlatten.sort((a, b) => b.counter - a.counter).map((result, positionIndex) => ({
      ...result,
      globalPosition: positionIndex + 1,
    }));
  }

  return (
    <div className="container-fluid">
      <h1 style={{ textAlign: "center" }}>GLOBAL RANKING</h1>
      {globalRanking && globalRanking.map((element, i) => (
        <div key={i} className="container">
          <div className="card" style={{ marginBottom: "2em" }}>
            <div className="card-header">
              <h5 style={{ marginBottom: 0 }}>{helpers.numberSuffix(element.globalPosition)} Position</h5>
            </div>
            <div className={`card-body ${element.team ? `card-body__${(element.team).toLowerCase()}` : ''}`}>
              <h5 className="card-title">{element.name}</h5>
              <h6 className="card-text">{element.counter} points</h6>
              <Link to={`/driver/${element._id}`} className="btn btn-warning">See driver info</Link>
            </div>
          </div>
        </div>
      ))}
      Race 1 .... n
      Driver 1 ... n
    </div>
  );
}

export default App;