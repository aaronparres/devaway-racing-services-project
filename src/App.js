import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import data from './backend/devaway-racing-services-export.json';

import Layout from './components/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';

const LazyDriver = lazy(() => import('./components/Driver/Driver'));
const LazyRace = lazy(() => import('./components/Race/Race'));
const LazyGlobalRankingList = lazy(() => import('./components/GlobalRankingList/GlobalRankingList'));
const LazyCarousel = lazy(() => import('./components/Carousel/Carousel'));

const App = () => {
  const { driversData } = data;

  // eslint-disable-next-line no-unused-vars
  const [drivers, setDrivers] = useState(driversData);
  const [totalPositionsByRace, setTotalPositionsByRace] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [componentsList, setComponentsList] = useState([]);

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

  useEffect(() => {
    if (drivers.length < 1 || totalPositionsByRace.length < 1 || globalRanking.length < 1) return;
    const components = [];
    components.push((
      <Suspense fallback={<Spinner />}>
        <LazyGlobalRankingList driversRanking={globalRanking} />
      </Suspense>
    ));
    totalPositionsByRace.forEach((race, i) => {
      components.push((
        <Suspense fallback={<Spinner />}>
          <LazyRace racesResults={totalPositionsByRace} fromCarouselIndex={i + 1} />
        </Suspense>
      ));
    })
    globalRanking.forEach(driver => {
      components.push((
        <Suspense fallback={<Spinner />}>
          <LazyDriver
            racesResults={totalPositionsByRace}
            driversRanking={globalRanking}
            fromCarouselId={driver._id} />
        </Suspense>
      ))
    });
    setComponentsList(components);
  }, [drivers, globalRanking, totalPositionsByRace]);

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
    <Layout
      racesResults={totalPositionsByRace}
      driversRanking={globalRanking}>
      <Switch>
        <Route path="/driver/:id" exact component={() => (
          <Suspense fallback={<Spinner />}>
            <LazyDriver
              racesResults={totalPositionsByRace}
              driversRanking={globalRanking} />
          </Suspense>
        )} />
        <Route path="/race/:num" exact component={() => (
          <Suspense fallback={<Spinner />}>
            <LazyRace racesResults={totalPositionsByRace} />
          </Suspense>
        )} />
        <Route path="/global" exact component={() => (
          <Suspense fallback={<Spinner />}>
            <LazyGlobalRankingList driversRanking={globalRanking} />
          </Suspense>
        )} />
        <Route path="/" exact component={() => (
          <Suspense fallback={<Spinner />}>
            <LazyCarousel components={componentsList} />
          </Suspense>
        )} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;