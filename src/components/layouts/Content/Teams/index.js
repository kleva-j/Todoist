import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Divider, List, Typography } from 'antd';

import styles from './style.module.less';
import { SEOHeader } from '../../../Reuseables/Header';

export const TeamsComponent = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className={styles["Teams_container"]}>
      <SEOHeader pageTitle="Teams" pageDesc="Taskaider teams page" currentURL="/settings/team" />
      <article className={styles["Article"]}>
        <h2>Teams</h2>
        <Button>New Team</Button>
      </article>

      <Divider style={{ margin: 0 }} />

      <aside className={styles["Aside"]}>
        <List
          bordered
          className={styles["List"]}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={["Michael Inc", "Kleva Inc", 'Kasmic Inc']}
          renderItem={item => (
            <List.Item
              className={styles["ListItems"]}
              style={{
                border: '1px solid lightgrey',
                borderRadius: 5,
                margin: '0 0 10px',
              }}
              actions={[
                <Button size="small" key="list-leave">Leave</Button>
              ]}>
              <Typography.Text>
                <Link to={'#'}>{item}</Link>
              </Typography.Text>
            </List.Item>
          )}
        />
      </aside>

    </motion.section>
  );
};
