export const selectFirebase = state => state.firebase;

export const selectUser = state => state.firebase.auth;

export const selectUid = state => state.firebase.auth.uid;

export const selectProfile = state => state.firebase.profile;

export const selectProjectIds = state => state.firebase.profile.projectIDs;

export const selectPhotoURL = state => state.firebase.auth.photoURL;

const selectUID = state => state.uid;

const anyth = state => selectUID(state.firebase.auth);

const mgth = state => selectUID(selectUser(state))