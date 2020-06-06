import React from "react";
import { Divider, Card, Checkbox } from "antd";
import { motion } from "framer-motion";

import styles from "./style.module.less";

export const Notification = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className={styles["Notification_container"]}
    >
      <article className={styles["Article"]}>
        <h2>Notifications</h2>
        <Divider style={{ margin: 0 }} />
        <p className={styles["Paragraph"]}>
          Choose how you receive notifications. These notification settings
          apply to the things you’re watching / involved in.
        </p>
      </article>

      <article className={styles["Notify"]}>
        <Card>
          <h3>Automatic Watching</h3>
          <aside className={styles["Content"]}>
            <div>
              <strong>Team</strong>
              <div><Checkbox>Project Creation/Update</Checkbox></div>
              <div><Checkbox>Task Creation/Update</Checkbox></div>
              <div><Checkbox>Email Change</Checkbox></div>
              <div><Checkbox>Join Team</Checkbox></div>
              <div><Checkbox>Leave Team</Checkbox></div>
            </div>
            <div>
              <strong>Security</strong>
              <div><Checkbox>Password Reset</Checkbox></div>
              <div><Checkbox>Email Change</Checkbox></div>
              <div><Checkbox>Account Deletion</Checkbox></div>
              <div><Checkbox>Leave Team</Checkbox></div>
            </div>
          </aside>
        </Card>

        <Card>
          <h3>Email Notification</h3>
          <aside className={styles["Content"]}>
            <div>
              <strong>Team</strong>
              <div><Checkbox>Project Creation/Update</Checkbox></div>
              <div><Checkbox>Task Creation/Update</Checkbox></div>
              <div><Checkbox>Email Change</Checkbox></div>
              <div><Checkbox>Join Team</Checkbox></div>
              <div><Checkbox>Leave Team</Checkbox></div>
            </div>
            <div>
              <strong>Security</strong>
              <div><Checkbox>Password Reset</Checkbox></div>
              <div><Checkbox>Email Change</Checkbox></div>
              <div><Checkbox>Account Deletion</Checkbox></div>
              <div><Checkbox>Leave Team</Checkbox></div>
            </div>
          </aside>
        </Card>
      </article>
    </motion.section>
  );
};
