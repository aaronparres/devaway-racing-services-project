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
      filteredRacesByDriver.push({
        driverId: driver._id,
        races: [...driver.races]
      });
    });

    setRacesByDriver([...filteredRacesByDriver])
    console.log('racesByDriver', filteredRacesByDriver);
  }, []);

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
          return ({
            driverId: driver.driverId,
            ...driver.races[i]
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
    // Flatten the array to combine all points for each driver (same id)
    let resultFlatten = Object.values(
      globalResults.reduce((res, { id, counter }) => {
        res[id] = res[id] || { id, counter: [] };
        res[id].counter = res[id].counter.concat(Array.isArray(counter) ? counter : [counter]);
        return res;
      }, {})
    ).map(res => ({ ...res, counter: res.counter.reduce((a, b) => a + b, 0) }) // Sum all points in the [counter] for each driver
    ).sort((a, b) => b.counter - a.counter); // Descending order ranking

    return resultFlatten;
  }

  useEffect(() => {
    if (totalPositionsByRace.length < 1) return;
    let globalRankingCounters = [];
    if (totalPositionsByRace && totalPositionsByRace.length > 0) {
      drivers.forEach((driver) => {
        totalPositionsByRace.forEach((race) => {
          race.forEach((position) => {
            if (driver._id === position.driverId) {
              globalRankingCounters.push({
                id: position.driverId,
                counter: position.pointsCounter
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