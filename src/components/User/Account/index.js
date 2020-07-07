import React from 'react';
import { Divider, Button, Input } from 'antd';
import { motion } from 'framer-motion';

import styles from './style.module.less';
import { SEOHeader } from '../../Reuseables/Header';

export const Account = () => {
  return (
    <motion.section
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className={styles["Account_container"]}>
        <SEOHeader pageTitle="Account" pageDesc="Account settings" currentURL="/settings/account" />
      <article>
        <h2>Change / Reset Email</h2>
        <Divider style={{ margin: 0 }} />
        <p>
          Be informed that if you login to this platform using the social media account linked with your account, this action would not be successful.
        </p>
        <div>
          <Input type="text" value="kasmickleva@gmail.com" className={styles["Input"]} allowClear />
          <Button>Change</Button>
        </div>
      </article>

      <article>
        <h2>Delete Account</h2>
        <Divider style={{ margin: 0 }} />
        <p>
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div>
          <Button type="danger">Delete your account</Button>
        </div>
      </article>

    </motion.section>
  );
};
