import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import { CalenderComponent } from './Calender/calender'
import { ProjectWrapper } from './Wrapper';
import { NoContentFound } from './NoContent';
import { ProfileWrapper } from './Profile/wrapper';
import { ProjectItemWrapper } from './ProjectItem/wrapper';
import { ProjectListWrapper } from './ProjectList/ProjectWrapper';
import { DashboardWrapper } from './Dashboard/wrapper';
import { Settings } from './Settings';

const { Content } = Layout;

export const Container = () => {
  return (
    <Content>
      <Switch>

        <Route exact={true} path="/calendar" component={CalenderComponent} />

        <Route path="/user">
          <Switch>

            <Route exact={true} path="/user/profile" component={ProfileWrapper} />

            <Route component={NoContentFound} />

          </Switch>

        </Route>

        <Route exact={true} path="/dashboard" component={DashboardWrapper} />

        <Route path="/settings" component={Settings} />

        <Route path="/project">
          <ProjectWrapper>
            <Switch>

              <Route exact={true} path="/project/all" component={ProjectListWrapper} />

              <Route exact={true} path="/project/:id" component={ProjectItemWrapper} />

              <Route component={NoContentFound} />

            </Switch>
          </ProjectWrapper>
        </Route>

        <Route component={NoContentFound} />

      </Switch>
    </Content>
  );
};
