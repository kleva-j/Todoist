export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const task = state.task;
      return { ...state, task: [ ...task, action.payload ] }

    case 'SET_TASK':
        return { ...state, task: [ ...action.payload ] }

    case 'DELETE_TASK':
      const { taskId } = action.payload;
      const taskList = state.tasks;
      taskList.map(item => (item.id === taskId) && (item.archived = true));
      return { ...state, task: [...taskList] }

    default:
      return state;
  }
};
