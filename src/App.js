import React, { useState, useEffect, Fragment } from 'react';

import data from './backend/devaway-racing-services-export.json';

const App = () => {
  const { driversData } = data;

  const [drivers, setDrivers] = useState(driversData);
  const [racesByDriver, setRacesByDriver] = useState([]);

  useEffect(() => {
    const filteredRacesByDriver = [];
    drivers.forEach((driver) => {
      filteredRacesByDriver.push({
        driverId: driver._id,
        races: [...driver.races]
      });
    });

    setRacesByDriver([...filteredRacesByDriver])
  }, []);

  useEffect(() => {
    if (racesByDriver.length < 1 ) return;
    console.log('racesByDriver', racesByDriver);
  }, [racesByDriver])

  return (
    <Fragment>
      {drivers && drivers.map((driver, i) => (<p key={i}>{driver.name}</p>))}
      GLOBAL RANKING
      Race 1 .... n
      Driver 1 ... n
    </Fragment>
    );
}

export default App;
