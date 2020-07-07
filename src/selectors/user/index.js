export const selectFirebase = state => state.firebase;

export const selectIsEmpty = state => ({ isEmpty: state.isEmpty });

export const selectUser = state => state.auth;

export const selectProfile = state => state.profile;

export const selectProjectIds = state => state.firebase.profile.projectIDs;

export const selectPhotoURL = state => state.photoURL;

export const selectUID = state => ({ uid: state.uid });

export const getUID = state => selectUID(selectUser(selectFirebase(state)));

export const isEmpty = state => selectIsEmpty(state.firebase.auth);

export const getUser = (state) => selectUser(selectFirebase(state));

export const getName = (state) => state.display_name

export const getProfile = (state) => selectProfile(selectFirebase(state));

export const selectName = (state) => getName(getProfile(state));

export const getMemberProfile = (state) => ({ user: getProfile(state) });