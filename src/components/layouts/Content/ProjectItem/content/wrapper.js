// import { message } from 'antd';
import { withFirestore } from "react-redux-firebase";
import { withHandlers, compose, withState, mapProps } from "recompose";

import { Content } from '.';
import { ComponentFromStreamWrapper } from "../../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(Content);

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
  }, {
    'Backlog': [],
    'Planning': [],
    'Doing': [],
    'Done': []
  });
};

const taskMenus = Object.keys(taskMenuItems);

export const ContentWrapper = compose(
  withFirestore,
  withState('state', 'setState', { taskMenus, modalIsVisible: false, modal: {}, loadingUpdate: false }),
  mapProps((props) => {
    const { tasks } = props;
    const newTasks = tasks ? reduceTask(tasks) : taskMenuItems;
    const result = { ...props,  tasks: newTasks };
    return result;
  }),
  withHandlers({
    setModalVisibility: ({ state, setState }) => (value) => {
      setState({ ...state, modalIsVisible: value });
    },
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
)(Component);
