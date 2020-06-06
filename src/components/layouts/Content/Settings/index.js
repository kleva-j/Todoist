import React from "react";
import { motion } from 'framer-motion';
import { Switch, Route } from "react-router-dom";

import styles from "./style.module.less";
import { SettingsWrapper } from "./wrapper";
import { NoContentFound } from "../NoContent";

export const Settings = (props) => {
  const { history, match: { isExact }} = props;

  React.useEffect(() => {
    if (isExact) {
      return history.push('/settings/profile');
    }
  }, [isExact, history]);

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className={styles["Settings"]}>
      <Switch>
        <Route exact={true} path="/settings/:component">
          <SettingsWrapper {...props} />
        </Route>
        <Route component={NoContentFound} />
      </Switch>
    </motion.section>
  );
};
