import React, { useState, useEffect, Fragment } from 'react';

import data from './backend/devaway-racing-services-export.json';

const App = () => {
  const { driversData } = data;

  const [drivers, setDrivers] = useState(driversData);
  const [racesByDriver, setRacesByDriver] = useState([]);
  const [totalPositionsByRace, setTotalPositionsByRace] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);

  useEffect(() => {
    if (drivers.length < 1) return;
    const filteredRacesByDriver = [];
    drivers.forEach((driver) => {
      const { _id, races } = driver;
      filteredRacesByDriver.push({
        driverId: _id,
        races: [...races]
      });
    });
    setRacesByDriver([...filteredRacesByDriver])
    console.log('racesByDriver', filteredRacesByDriver);
  }, [drivers]);

  useEffect(() => {
    if (racesByDriver.length < 1) return;
    const totalPositions = [];
    if (racesByDriver && racesByDriver.length > 0) {
      for (let i = 0; i < racesByDriver[0].races.length; i++) {
        totalPositions.push(racesByDriver.map(driver => {
          const { driverId, races } = driver;
          return ({
            driverId: driverId,
            ...races[i]
          })
        }));
        totalPositions[i].sort((a, b) => timeParserIntoSeconds(a.time) - timeParserIntoSeconds(b.time));
        totalPositions[i] = totalPositions[i].map((driver, index) => ({
          ...driver,
          pointsCounter: 22 - index
        }));
      }
      setTotalPositionsByRace(totalPositions);
      console.log('totalPositionsByRace', totalPositions);
    }
  }, [racesByDriver]);

  useEffect(() => {
    if (totalPositionsByRace.length < 1) return;
    const globalRankingCounters = [];
    if (totalPositionsByRace && totalPositionsByRace.length > 0) {
      drivers.forEach(driver => {
        totalPositionsByRace.forEach(race => {
          race.forEach(position => {
            if (driver._id === position.driverId) {
              const { driverId, pointsCounter } = position;
              globalRankingCounters.push({
                id: driverId,
                counter: pointsCounter
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
      const { id, counter } = globalResult;
      const index = resultsFlatten.findIndex(result => result.id === id);
      if (index === -1) {
        resultsFlatten.push({ id, counter });
      } else {
        resultsFlatten[index].counter += counter;
      }
    });

    return resultsFlatten.sort((a, b) => b.counter - a.counter);
  }

  return (
    <Fragment>
      GLOBAL RANKING
      {globalRanking && globalRanking.map((element, i) => (<div key={i}><p>{element.id}</p><p>{element.counter}</p></div>))}
      Race 1 .... n
      Driver 1 ... n
    </Fragment>
  );
}

export default App;