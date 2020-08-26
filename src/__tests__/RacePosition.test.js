import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { races } from './__mocks__/rankingMock.json';

import RacePosition from '../components/Race/RacePosition/RacePosition';

configure({ adapter: new Adapter() });

describe('<RacePosition />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RacePosition driver={races[0][0]} />);
    });

    it('should render a <Link to="/driver/id" />', () => {
        expect(wrapper.find({to: `/driver/${races[0][0]._id}`})).toHaveLength(1);
    });
});
