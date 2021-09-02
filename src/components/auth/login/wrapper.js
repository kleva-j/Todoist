import { Form, message } from "antd";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";

import { ComponentFromStreamWrapper } from "../../Reuseables/Wrapper";
import { getMessage } from "../../../constants/alertMessages";
import { isEmpty } from "../../../selectors/user";
import { FirebaseApp } from "../../../services";
import { LoginComponent } from ".";

const Component = ComponentFromStreamWrapper(LoginComponent);

export const Login = compose(
  withState("form_", "setForm", { isLogin: true }),
  withState("state", "setState", {
    alert: {
      type: undefined,
      message: undefined,
      description: undefined,
      isVisible: false,
    },
  }),
  connect(isEmpty),
  Form.create({ name: "login_form" }),
  withHandlers({
    updateState: ({ setState }) => (newState) => {
      setState((state) => ({ ...state, ...newState }));
    },
  }),
  withHandlers({
    handleSubmit: ({ form, updateState }) => (authType) => (event) => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          return FirebaseApp.loginWithCredentials(authType, values)(
            () =>
              updateState({
                alert: { isVisible: true, ...getMessage("loginSuccess") },
              }),
            ({ code }) =>
              updateState({ alert: { isVisible: true, ...getMessage(code) } })
          );
        } else {
          updateState({
            alert: { isVisible: true, ...getMessage("loginValidation") },
          });
        }
      });
    },
    handleReset: ({ updateState }) => (email, callback) => {
      if (email) {
        FirebaseApp.auth
          .sendPasswordResetEmail(email, {
            url: "http://localhost:3000/dashboard",
          })
          .then(() => {
            updateState({ alert: { isVisible: true, ...getMessage("passwordReset") }});
            callback();
          })
          .catch(({ code }) => {
            updateState({ alert: { isVisible: true, ...getMessage(code) } });
            callback();
          });
      }
    },
    switchForm: ({ setForm, form_: { isLogin } }) => (event) => {
      event.preventDefault();
      setForm({ isLogin: !isLogin });
    },
    loginUser: ({ history }) =>
      FirebaseApp.loginWithSocials(
        (_) => history.push("/dashboard"),
        () => message.error('Network error, Please check your network connection.', 4),
      ),
  })
)(Component);
