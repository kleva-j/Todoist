import React from 'react';
import { Divider } from 'antd';
import styles from './style.module.less';

export const SecurityComponent = () => {
  return (
    <section className={styles["Security_container"]}>
      
      <article className={styles["Article"]}>
        <h2>Security</h2>
        <Divider style={{ margin: 0 }} />
        <p className={styles["Paragraph"]}>
          Choose your security settings and how you want it implemented.
        </p>
      </article>
      
    </section>
  );
};
