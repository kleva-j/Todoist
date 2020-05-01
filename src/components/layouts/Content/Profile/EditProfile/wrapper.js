import { Form } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import { EditProfile } from '.';
import { ComponentFromStreamWrapper } from '../../../../Reuseables/Wrapper';

const Component = ComponentFromStreamWrapper(EditProfile);

export const EditWrapper = compose(
  Form.create({ name: 'Edit_Profile' }),
  withState('state', 'setState', {}),
  withHandlers({
    handleSubmit: ({ form }) => (event) => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received these values ', values);
        }
      });
    }
  })
)(Component);
