import { Form } from 'antd';
import { compose, withHandlers } from 'recompose';

import { EmailPrompt } from './emailPrompt';
import { ComponentFromStreamWrapper } from '../../Reuseables/Wrapper';

export const EmailPromptWrapper = compose(
  Form.create({ name: 'reset_email_prompt'}),
  withHandlers({
    handleFormSubmit: ({ form, handleSubmit, toggleModal }) => (event) => {
      event.preventDefault();
      form.validateFields((err, { email }) => {
        if (err) {
          console.log(err);
          return;
        }
        return handleSubmit(email, () => toggleModal(false));
      });
    },
  }),
)(ComponentFromStreamWrapper(EmailPrompt));
