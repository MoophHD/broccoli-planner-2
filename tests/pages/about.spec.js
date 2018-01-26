import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import About from '../../src/js/views/About/index';

configure({ adapter: new Adapter() });

describe('<About /> page', () => {
  let component;

  beforeEach(() => {
    component = shallow(<About />);
  });

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should have one <h1>', () => {
    expect(component.find('h1')).toHaveLength(1);
  });
});
