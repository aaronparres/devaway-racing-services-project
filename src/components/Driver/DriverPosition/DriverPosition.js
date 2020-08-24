import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { numberSuffix, setMedalEmoji } from '../../../shared/commonUtils';

const DriverPosition = ({ positionInRace, race, index }) => {
    return (
        <Fragment>
            <Link className="clickable" to={`/race/${index + 1}`}>
                <li className="list-group-item">
                    <div className="d-flex">
                        <p className="col-sm-4">Race {index + 1}</p>
                        <p className="col-sm-4" style={{ textAlign: "center" }}>
                            Position: <span className="item-red">{numberSuffix(positionInRace)}{setMedalEmoji(positionInRace)}</span>
                        </p>
                        <p className="col-sm-4" style={{ textAlign: "right" }}>
                            Time - <span className="item-red">{race.time}</span>
                        </p>
                    </div>
                </li>
            </Link>
        </Fragment>
    );
};

DriverPosition.propTypes = {
    positionInRace: PropTypes.number.isRequired,
    race: PropTypes.shape({
        time: PropTypes.string.isRequired,
        name: PropTypes.string,
    }),
    index: PropTypes.number.isRequired,
};

export default DriverPosition;
