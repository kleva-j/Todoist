import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProfileWrapper } from './wrapper';
import { Profile } from '.';
import * as UserContext from '../../../contexts/UserContext';

configure({ adapter: new Adapter() });

describe('Profile container', () => {
  const contextValue = {
    name: 'name', email: 'email',
    bio:"bio", gender: 'gender',
    language:'English', pic: 'pic'
  };

  // jest
  //   .spyOn(UserContext, 'useUserContext')
  //   .mockImplementation(() => contextValue);

  describe('ProfileWrapper', () => {
    const wrapper = shallow(<ProfileWrapper />);
    
    test('should render correctly', () => {
      const children = wrapper.children();
      const props = wrapper.props();
      console.log(children, props);
    });
    
    test('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  // describe('Profile component', () => {
  //   const testProps = {
  //     form: {
  //       getFieldDecorator: jest.fn(),
  //     }
  //   };
  //   const wrapper = shallow(<Profile {...testProps} />);
    
  //   test('should render correctly', () => {
  //     const prop = wrapper.prop('children');
  //     expect(prop.length).toBe(3);
  //   });
    
  //   test('should match snapshot', () => {
  //     expect(wrapper).toMatchSnapshot();
  //   });
  // });
});
