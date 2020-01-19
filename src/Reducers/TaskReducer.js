export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const task = state.task;
      return { ...state, task: [ ...task, action.payload ] }

    case 'SET_TASK':
        return { ...state, task: [ ...action.payload ] }

    case 'DELETE_TASK':
      const { taskId } = action.payload;
      let taskList = state.task;
      taskList = taskList.filter(item => item.id !== taskId);
      return { ...state, task: [...taskList] }

    default:
      return state;
  }
};
