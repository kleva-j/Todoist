import React from 'react';
import { notification, Icon } from 'antd';

import { FirebaseApp } from '.';

class Notifications {
  constructor() {
    this.messaging = FirebaseApp.messaging;
    this.userid = undefined;
  }

  init() {
    if (!this.userid) {
      notification.error({
        title: 'Error initializing notification service.',
        description: 'User id should be set before initializing notification service.'
      })
      return;
    }
    this.messaging.requestPermission()
      .then(() => this.messaging.getToken())
      .then((token) => this.updateFcmToken(this.userid, token))
      .catch(({ message }) => console.log(message));
  }

  setUserId(uid) {
    this.userid = uid;
  }

  setTokenRefreshListener() {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then((refreshedToken) => this.updateFcmToken(this.userid, refreshedToken))
        .catch((err) => console.log('Unable to retrieve refreshed token ', err));
    });
  }

  receiveMessages() {
    console.log('Now listening for new messages')
    this.messaging.onMessage((payload) => {
      console.log(payload);
      notification.open({
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        title: 'Firebase cloud messaging',
        description: 'This is a new message from firebase cloud messaging.'
      });
    });
  }

  setBackgroundHandler() {
    this.messaging.setBackgroundMessageHandler((payload) => {
      const title = payload?.data?.title;
      const options = {
        body: payload?.data?.message,
      };
      notification.open({
        title,
        description: options.body
      });
    })
  }

  updateFcmToken(uid, token) {
    FirebaseApp.db.collection('fcmToken').doc(uid).set({ [uid]: token }) 
      .then(() => console.log('Token has been saved to store.'))
      .catch((err) => console.log(err))
  }

  useServiceWorker(regRef) {
    this.messaging.useServiceWorker(regRef);
  }
}

export default new Notifications();
