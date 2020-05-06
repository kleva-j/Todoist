import React from 'react';
import { Divider } from 'antd';

import styles from './style.module.less';

export const Notification = () => {
  return (
    <section className={styles["Notification_container"]}>
      
      <article className={styles["Article"]}>
        <h2>Notifications</h2>
        <Divider style={{ margin: 0 }} />
        <p className={styles["Paragraph"]}>
          Choose how you receive notifications. These notification settings apply to the things you’re watching / involved in.
        </p>
      </article>
      
    </section>
  );
};
