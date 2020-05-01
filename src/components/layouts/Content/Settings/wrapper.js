import { Settings } from ".";
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";
import { compose, withState } from "recompose";

const Component = ComponentFromStreamWrapper(Settings);

export const SettingsWrapper = compose(
  withState('state', 'setState', {})
)(Component);
