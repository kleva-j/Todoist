import { withFirestore } from "react-redux-firebase";
import { withHandlers, compose, withState, mapProps } from "recompose";

import { Content } from '.';
import { ComponentFromStreamWrapper } from "../../../../Reuseables/Wrapper";

const taskMenuItems = {
  'Backlog': [],
  'Planning': [],
  'Doing': [],
  'Done': []
};

const reduceTask = (tasks) => {
  return tasks.reduce((acc, cur) => {
    if (acc[cur.stage]) {
      const item = acc[cur.stage].find(item => item.id === cur.id);
      if (!item) acc[cur.stage].push(cur);
    }
    return acc;
  }, { 'Backlog': [], 'Planning': [], 'Doing': [], 'Done': [] });
};

const taskMenus = Object.keys(taskMenuItems);

export const ContentWrapper = compose(
  withFirestore,
  withState('state', 'setState', { taskMenus, modalIsVisible: false, modal: {} }),
  mapProps((props) => {
    const newTasks = props.tasks ? reduceTask(props.tasks) : taskMenuItems;
    return { ...props,  tasks: newTasks };
  }),
  withHandlers({
    setModalProp: ({ setState }) => (newState) => setState((prevState) => ({ ...prevState, modal: newState })),
    handleTaskUpdate: ({ state: { modal: { id } }, firestore }) => (action) => (updates) => {
      // return firestore
      //   .runTransaction(t => t.get('tasks'))
      //   .then(doc => console.log(doc))
      //   .catch(err => console.error(err.message));
    }
  }),
  withHandlers({
    handleSearch: ({ setState }) => value => setState(value),
    handleOk: ({ setModalVisibility }) => () => setModalVisibility(false),
    handleCancel: ({ setModalVisibility }) => () => setModalVisibility(false),
    toggleTaskModal: ({ state, setState }) => (updates) => {
      const { modal } = state;
      setState({ ...state, modalIsVisible: true, modal: { ...modal, ...updates } });
    },
  }),
)(ComponentFromStreamWrapper(Content));
