import { compose, withState } from "recompose"
import { ComponentFromStreamWrapper } from "../Wrapper";
import { CustomModal } from "./CustomModal";

const Component = ComponentFromStreamWrapper(CustomModal);

export const Modal = compose(withState('state', 'setState', {}))(Component);
