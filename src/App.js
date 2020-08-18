import React, { useState, useEffect, Fragment } from 'react';

import data from './backend/devaway-racing-services-export.json';

const App = () => {
  const { driversData } = data;

  const [drivers, setDrivers] = useState(driversData);
  const [racesByDriver, setRacesByDriver] = useState([]);
  const [totalPositionsByRace, setTotalPositionsByRace] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);

  useEffect(() => {
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
  }, []);  // like componentdidmount (on init)

  const timeParserIntoSeconds = (time) => {
    const timeParts = time.split(':');
    return +timeParts[0] * 3600 + +timeParts[1] * 60 + +timeParts[2];
  }

  useEffect(() => {
    if (racesByDriver.length < 1) return;
    let total = [];
    if (racesByDriver && racesByDriver.length > 0) {
      for (let i = 0; i < racesByDriver[i].races.length; i++) {
        total.push(racesByDriver.map(driver => {
          const { driverId, races } = driver;
          return ({
            driverId: driverId,
            ...races[i]
          })
        }));
        total[i].sort((a, b) => timeParserIntoSeconds(a.time) - timeParserIntoSeconds(b.time));
        total[i] = total[i].map((driver, index) => ({
          ...driver,
          pointsCounter: 22 - index
        }));
      }
      setTotalPositionsByRace(total);
      console.log('totalPositionsByRace', total);
    }
  }, [racesByDriver]);

  const flattenCounterResults = (globalResults) => {
    console.log(globalResults)
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

  useEffect(() => {
    if (totalPositionsByRace.length < 1) return;
    let globalRankingCounters = [];
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