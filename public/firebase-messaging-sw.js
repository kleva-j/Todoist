/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js');
// importScripts('/__/firebase/7.15.0/firebase-app.js');
// importScripts('/__/firebase/7.15.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

if (!firebase.apps.length) {
  firebase.initializeApp({
    messagingSenderId: "704305468060"
  });
}

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const title = payload?.data?.title;
  const options = {
    body: payload?.data?.message,
  };
  return self.registration.showNotification(title, options);
});
