import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AccountWrapper } from './wrapper';
import { Account } from '.';

configure({ adapter: new Adapter() });

describe('Account container', () => {

  describe('AccountWrapper', () => {
    const wrapper = shallow(<AccountWrapper />);
    const props = wrapper.props();
  
    test('should render correctly', () => {
      expect(props).toHaveProperty('state');
      const prop = wrapper.prop('state');
      expect(prop).toHaveProperty('loading', false);
    });
    
    test('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Account component', () => {
    const wrapper = shallow(<Account />);
    
    test('should render correctly', () => {
      const prop = wrapper.prop('children');
      expect(prop.length).toBe(2);
      expect(prop[0].props.children.length).toBe(4);
      expect(prop[1].props.children.length).toBe(4);
    });
    
    test('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
  });
});
