import React from 'react';
import { shallow } from 'enzyme';
import { CustomModal } from '.';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('CustomModal', () => {
  const testProps = {
    width: 500,
    isVisible: true,
    title: 'This is a title',
    handleOk: jest.fn(() => {}),
    handleCancel: jest.fn(() => {}),
  };

  const wrapper = shallow(<CustomModal {...testProps} />);
  const { width, visible, title } = wrapper.props();

  test('should render correctly', () => {
    expect(width).toBe(testProps.width);
    expect(visible).toBe(testProps.isVisible);
    expect(title).toBe(testProps.title);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
