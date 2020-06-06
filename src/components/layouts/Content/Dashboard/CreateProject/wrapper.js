import { Form, message } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import { ProjectModal } from '.';
import { ComponentFromStreamWrapper } from '../../../../Reuseables/Wrapper';

const Component = ComponentFromStreamWrapper(ProjectModal);

export const CreateWrapper = compose(
  Form.create({ name: 'New Project' }),
  withState('state', 'setState', { loading: false }),
  withHandlers({
    handleSubmit: ({ form }) => (event) => {
      event.preventDefault();
      form.validateFields((err, _values) => {
        if (!err) {
          message.success('Values entered are valid');
        } else {
          message.error("Error, Please fix error before submission!");
        }
      });
    },
  })
)(Component);
