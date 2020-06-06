import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CustomAlert } from '.';

configure({ adapter: new Adapter() });

describe('CustomAlert', () => {
  const testProps = {
    type: 'danger',
    message: 'This is a message',
    description: 'This is a description',
    afterClose: jest.fn(),
  };

  const wrapper = shallow(<CustomAlert {...testProps} />);
  const { type, message, description } = wrapper.props();

  test('should render correctly', () => {
    expect(type).toBe(testProps.type);
    expect(message).toBe(testProps.message);
    expect(description).toBe(testProps.description);
  });
  
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
