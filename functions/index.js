const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.updateNewTask = functions.firestore.document('/tasks/{taskId}')
.onCreate((snap, context) => {
  const data = snap.data();
  const { creator } = data;
  console.log([data, context]);
  return snap.ref.set({
    deleted: false,
    archived: false,
    priority: '',
    members: [creator.uid],
  }, {merge: true});
});

