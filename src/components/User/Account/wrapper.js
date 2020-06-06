import { compose, withState, withHandlers } from "recompose";

import { Account } from ".";
import { ComponentFromStreamWrapper } from "../../Reuseables/Wrapper";
import { FirebaseApp } from '../../../services';

const Component = ComponentFromStreamWrapper(Account);

export const AccountWrapper = compose(
  withState("state", "setState", { loading: false }),
  withHandlers({
    handleSubmit: () => () => {},
    changeEmail: () => (email) => {
      FirebaseApp.auth.updateEmail(email)
        .then()
        .catch();
    },
    validateUpdate: () => () => {}
  })
)(Component);
