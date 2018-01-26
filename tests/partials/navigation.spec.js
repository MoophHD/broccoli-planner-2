import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Primary from '../../src/js/partials/navigation/primary';
import {NavLink} from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<Primary /> partial', () => {
  let component;
  
  beforeEach(() => {
    component = shallow(<Primary />);
  });
  
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  
  it('contains 3 <NavLink /> components', () => {
    expect(component.find(NavLink)).toHaveLength(3)
  });
})
