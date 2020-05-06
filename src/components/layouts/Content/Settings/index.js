import React from "react";
import { Switch, Route } from "react-router-dom";

import styles from "./style.module.less";
import { SettingsWrapper } from "./wrapper";
import { NoContentFound } from "../NoContent";
import { isEmpty } from '../../../../helpers';

export const Settings = (props) => {
  const { history, match: { params }} = props;
  
  React.useEffect(() => {
    if (isEmpty(params)) {
      return history.push('/settings/profile');
    }
  }, []);

  return (
    <section className={styles["Settings"]}>
      <Switch>
        <Route exact={true} path="/settings/:component">
          <SettingsWrapper {...props} />
        </Route>
        <Route component={NoContentFound} />
      </Switch>
    </section>
  );
};
