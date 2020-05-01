import { Notification } from ".";
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";
import { compose, withState } from "recompose";

const Component = ComponentFromStreamWrapper(Notification);

export const NotificationsWrapper = compose(
  withState('state', 'setState', {})
)(Component);
