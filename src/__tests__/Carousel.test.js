import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Carousel from '../components/Carousel/Carousel';

configure({ adapter: new Adapter() });

describe('<Carousel />', () => {
    let wrapper;
    let mockComponent;
    const Component = () => {
         return <div />;
     }

    beforeEach(() => {
        mockComponent = [<Component />];
        wrapper = shallow(<Carousel components={mockComponent} />);
    });

    it('should render a Component', () => {
        expect(wrapper.find(Component)).toHaveLength(1);
    })
});