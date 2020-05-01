export const selectProject = state => state.firestore.data?.projects;
export const selectProjectId = state => selectProject(state);

export const selectFirestore = state => state.firestore;

export const getData = state => state.data;
export const selectFirestoreData = state => getData(selectFirestore(state));

export const getTasks = state => state.tasks;
export const selectTasks = state => getTasks(selectFirestoreData(state));
