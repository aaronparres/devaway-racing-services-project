import React from 'react';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { driversRanking, races, driverInfo } from './__mocks__/rankingMock.json';

import GlobalRankingList from '../components/GlobalRankingList/GlobalRankingList';
import RankingCard from '../components/GlobalRankingList/RankingCard/RankingCard';

configure({ adapter: new Adapter() });

describe('<GlobalRankingList />', () => {
  let wrapper;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    wrapper = shallow(<GlobalRankingList />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render Races options for dropdown', () => {
    wrapper.setProps({ races });
    expect(wrapper.find(Link)).toHaveLength(10);
  });

  it('should render a <RankingCard /> for each position', () => {
    wrapper.setProps({ driversRanking });
    expect(wrapper.find(RankingCard)).toHaveLength(22);
  });

  it('should render a button for drivers info', () => {
    wrapper = shallow(<RankingCard driverInfo={driverInfo} />);
    expect(wrapper.find(Link)).toHaveLength(1);
  });

});
