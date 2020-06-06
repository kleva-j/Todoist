import React from 'react';
import { List, Typography } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import { compose, withHandlers, withState } from "recompose";

import styles from './style.module.less';
import { NoContentFound } from '../NoContent';
import { ProfileWrapper } from '../../../User/Profile/wrapper';
import { AccountWrapper } from '../../../User/Account/wrapper';
import { UserProvider } from '../../../../contexts/UserContext';
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";
import { NotificationsWrapper } from '../Notifications/wrapper';
import { TeamsWrapper } from '../Teams/wrapper';
import { SecurityWrapper } from '../Security/wrapper';

const data = [
  { title: "Profile",       path: "/settings/profile",      },
  { title: "Account",       path: "/settings/account",      },
  { title: "Notifications", path: "/settings/notifications" },
  { title: "Teams",         path: "/settings/teams",        },
  { title: "Security",      path: "/settings/security",     },
];

export const SettingsWrapper = compose(
  withState('state', 'setState', { currentTab: 'profile' }),
  withHandlers({
    updateState: ({ setState, state }) => update => setState({ ...state, ...update }),
    navigateToPath: ({ history }) => path => history.push(path),
  }),
  withHandlers({
    handleOnClick: ({ updateState, navigateToPath }) => item => () => {
      navigateToPath(item.path);
      updateState({ currentTab: item.title.toLowerCase() })
    }
  })
)(
  ComponentFromStreamWrapper((props) => {
    const { handleOnClick } = props;
    return (
      <section className={styles["Settings_container"]}>
        <article className={styles["Left_article"]}>
          <List
            header={<h3>Settings</h3>}
            bordered
            size="small"
            dataSource={data}
            style={{ borderColor: "#e7e7e7" }}
            renderItem={item => (
              <List.Item
                className={styles['Listitem']}
                onClick={handleOnClick(item)}
              >
                <Typography.Text>
                  <Link to={`${item.path}`}>{item.title}</Link>
                </Typography.Text>
              </List.Item>
            )}
          />
        </article>

        <article className={styles["Right_article"]}>
          <UserProvider>
            <Switch>
              <Route exact={true} path="/settings/profile"       component={ProfileWrapper} />
              <Route exact={true} path="/settings/account"       component={AccountWrapper} />
              <Route exact={true} path="/settings/notifications" component={NotificationsWrapper} />
              <Route exact={true} path="/settings/teams"         component={TeamsWrapper}         />
              <Route exact={true} path="/settings/security"      component={SecurityWrapper} />
              <Route component={NoContentFound} />
            </Switch>
          </UserProvider>
        </article>
      </section>
    );
  })
);
