import { message } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import { SecurityComponent } from '.'
import { FirebaseApp } from '../../../../services';
import { ComponentFromStreamWrapper } from '../../../Reuseables/Wrapper';

const Component = ComponentFromStreamWrapper(SecurityComponent);

export const SecurityWrapper = compose(
  withState('state', 'setState', { loading: false, isModalVisible: false, confirmLoading: false  }),
  withHandlers({
    updateState: ({ state, setState }) => (update) => setState({ ...state, ...update }),
    setModalVisibility: ({ state, setState }) => (visibility) => setState({ ...state, isModalVisible: visibility }),
  }),
  withHandlers({
    handleReset: ({ updateState }) => (email) => () => {
      if (email) {
        updateState({ confirmLoading: true });
        FirebaseApp.auth.sendPasswordResetEmail(email)
          .then(() => {
            message.success("A mail has successfully been sent to your email.");
            updateState({
              confirmLoading: false,
              isModalVisible: false,
            });
          })
          .catch(({ message }) => {
            message.error(message);
            updateState({
              confirmLoading: false,
              isModalVisible: false,
            })
          });
      }
    },
    handleCancel: ({ setModalVisibility }) => () => setModalVisibility(false)
  })
)(Component);
