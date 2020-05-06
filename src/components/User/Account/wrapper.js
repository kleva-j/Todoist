import { Form, message } from "antd";
import { compose, withState, withHandlers } from "recompose";
import { Account } from ".";
import { ComponentFromStreamWrapper } from "../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(Account);

export const AccountWrapper = compose(
  Form.create({ name: "account" }),
  withState("state", "setState", { loading: false }),
  withHandlers({
    handleSubmit: ({ form }) => () => {
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received these values ', values);
        } else {
          console.log(err);
          message.error(err.message);
        }
      });
    },
  })
)(Component);
