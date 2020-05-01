import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { ProjectItemWrapper } from './ProjectItem/wrapper';
import { ProjectListWrapper } from './ProjectList/ProjectWrapper';
import { NoContentFound } from './NoContent';

import { ProjectWrapper } from './Wrapper';
import { ProfileWrapper } from './Profile/wrapper';
import { SettingsWrapper } from './Settings/wrapper';
import { NotificationsWrapper } from './Notifications/wrapper';
import { DashboardWrapper } from './Dashboard/wrapper';
import { CalenderComponent } from './Calender/calender';

const { Content } = Layout;

export const Container = () => {
  
  return (
    <Content>
      <Switch>

        <Route path="/user">
          <Switch>

            <Route exact={true} path="/user/profile" component={ProfileWrapper} />

            <Route exact={true} path="/user/settings" component={SettingsWrapper} />

            <Route exact={true} path="/user/notification" component={NotificationsWrapper} />

            <Route component={NoContentFound} />

          </Switch>

        </Route>

        <Route exact={true} path="/calendar" component={CalenderComponent} />

        <Route exact={true} path="/dashboard" component={DashboardWrapper} />

        <Route exact={true} path="/projects">
          <ProjectWrapper>
            <ProjectListWrapper/>
          </ProjectWrapper>
        </Route>

        <Route exact={true} path="/project/:id">
          <ProjectWrapper>
            <ProjectItemWrapper/>
          </ProjectWrapper>
        </Route>


        {/* <ProjectWrapper>
          <Route exact={true} path="/projects" component={ProjectListWrapper} />
          <Route exact={true} path="/project/:id" component={ProjectItemWrapper} />
        </ProjectWrapper> */}

        <Route component={NoContentFound} />

      </Switch>
    </Content>
  );
};
