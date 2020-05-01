import { Form } from 'antd';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { LoginComponent } from './index';
import { ComponentFromStreamWrapper } from '../../Reuseables/Wrapper';
import { FirebaseApp } from '../../../services';
import { isEmpty } from '../../../selectors/user';
import { getMessage } from '../../../constants/alertMessages';

const Component = ComponentFromStreamWrapper(LoginComponent);

const mapStoreToProps = connect(isEmpty);

export const Login = compose(
  withState('form_', 'setForm', { isLogin: true, showResetModal: false }),
  withState('state', 'setState', {
    alert: { type: undefined, message: undefined, description: undefined, isVisible: false },
  }),
  mapStoreToProps,
  Form.create({ name: 'login_form' }),
  withHandlers({
    setModalVisibility: ({ form_, setForm }) => visibility => setForm({ ...form_, showResetModal: visibility }),
    updateState: ({ state, setState }) => (update) => {
      setState({ ...state, ...update });
    },
  }),
  withHandlers({
    handleSubmit: ({ form, updateState }) => authType => event => {
      event.preventDefault(); 
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          return FirebaseApp.loginWithCredentials(authType, values)(
            () => updateState({ alert: { isVisible: true, ...(getMessage('loginSuccess')) } }),
            ({ code }) => updateState({ alert: { isVisible: true, ...(getMessage(code)) } })
          );
        } else {
          updateState({ alert: { isVisible: true, ...(getMessage('loginValidation')) } });
        }
      });
    },
    toggleModal: ({ setModalVisibility }) => () => setModalVisibility(true),
    handleReset: ({ setModalVisibility, updateState }) => (email) => {
      if (email) {
        FirebaseApp.auth.sendPasswordResetEmail(email, { url: 'http://localhost:3000/login' })
          .then(() => {
            updateState({ alert: { isVisible: true, ...(getMessage('passwordReset')) } })
            setModalVisibility(false)
          })
          .catch(({ code }) => updateState({ alert: { isVisible: true, ...(getMessage(code)) } }) );
      }
    },
    handleCancel: ({ setModalVisibility }) => () => setModalVisibility(false),
    switchForm: ({ setForm, form_: { isLogin }}) => (event) => {
      event.preventDefault();
      setForm({ isLogin: !isLogin });
    },
    loginUser: ({ history }) => FirebaseApp.loginWithSocials(
      _ => history.push('/projects'),
      ({ message }) => console.log(message, 'Login Error')
    ),
  })
)(Component);
