import React, { useState, useEffect, Fragment } from 'react';

import data from './backend/devaway-racing-services-export.json';

const App = () => {
  const { driversData } = data;

  const [drivers, setDrivers] = useState(driversData);

  useEffect(() => {
    console.log(drivers);
  }, []);

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
