import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CalenderComponent } from './Calender/calender'
import { ProjectWrapper } from './Wrapper';
// import { NoContentFound } from './NoContent';
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

        <Route exact={true} path="/dashboard" component={DashboardWrapper} />

        <Route path="/settings" component={Settings} />

        <Route path="/project">
          <ProjectWrapper>
            <Switch>

              <Route exact={true} path="/project/all" component={ProjectListWrapper} />

              <Route exact={true} path="/project/:id" component={ProjectItemWrapper} />

              {/* <Route component={NoContentFound} /> */}
              <Redirect to={{ pathname: '/project/all' }} />

            </Switch>
          </ProjectWrapper>
        </Route>

        {/* <Route component={NoContentFound} /> */}
        <Redirect to={{ pathname: '/dashboard' }} />

      </Switch>
    </Content>
  );
};
