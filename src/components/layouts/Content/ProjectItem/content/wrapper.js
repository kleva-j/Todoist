import { withHandlers, compose, withState, mapProps } from "recompose";
import { Content } from './index';
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
  withState('state', 'setState', { taskMenus, modalIsVisible: false, modal: {} }),
  mapProps((props) => {
    const { tasks } = props;
    const newTasks = tasks ? reduceTask(tasks) : taskMenuItems;
    const result = { ...props,  tasks: newTasks };
    return result;
  }),
  withHandlers({
    setModalVisibility: ({ state, setState}) => (value) => {
      setState({ ...state, modalIsVisible: value });
    },
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
