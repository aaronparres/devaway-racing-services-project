import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { numberSuffix, setMedalEmoji, getColorTeam } from '../../../shared/commonUtils';


const RacePosition = ({driver}) => {
    const { positionInRace, name, _id, race, pointsCounter, team } = driver;
    const colorTeam = getColorTeam(team);
    return (
        <Fragment>
            <Link className="clickable" to={`/driver/${_id}`}>
                <p className="card-header">{numberSuffix(positionInRace)} Position {setMedalEmoji(positionInRace)}</p>
                <li className="list-group-item">
                    <div className="d-flex">
                        <div className="col-sm-4">
                            <p className="item-black">{name}</p>
                            <p className="item-black">{pointsCounter} points</p>
                        </div>
                        <p className="item-black col-sm-4">
                            Team: &nbsp;<span style={{ color: `${colorTeam}` }}>{team}</span>
                        </p>
                        <p className="item-black col-sm-4" style={{ textAlign: "right" }}>
                            Time - &nbsp;<span style={{ color: "rgb(238, 72, 72)" }}>{race.time}</span>
                        </p>
                    </div>
                </li>
            </Link>
        </Fragment>
    )
};

RacePosition.propTypes = {
    driver: PropTypes.shape({
        positionInRace: PropTypes.number.isRequired,
        age: PropTypes.number,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        race: PropTypes.shape({
            time: PropTypes.string.isRequired,
            name: PropTypes.string,
        }),
        pointsCounter: PropTypes.number.isRequired,
        team: PropTypes.string.isRequired,
        picture: PropTypes.string,
    }),
};

export default RacePosition;
