import React from 'react';
import { Divider, Button, Input } from 'antd';
import styles from './style.module.less';

export const Account = () => {
  return (
    <section className={styles["Account_container"]}>
      <article>
        <h2>Delete Account</h2>
        <Divider style={{ margin: 0 }} />
        <p>
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div>
          <Button type="primary" danger>Delete your account</Button>
        </div>
      </article>

      <article>
        <h2>Change / Reset Email</h2>
        <Divider style={{ margin: 0 }} />
        <p>
          You can manage verified email addresses in your email settings.
        </p>
        <div>
          <Input type="text" value="kasmickleva@gmail.com" className={styles["Input"]} allowClear />
          <Button danger>Change</Button>
        </div>
      </article>
    </section>
  );
};
