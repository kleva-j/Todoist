import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { ProjectContainer } from './ProjectContainer/ProjectContainer';
import { ProjectListContainer } from './ProjectList';
import { NoContentFound } from './NoContent';
// import ProjectListSuspense from './ProjectList/loadable';
// import ProjectSuspense from './ProjectContainer/loadable';

const { Content } = Layout;

export const Container = () => {
  
  return (
    <Content>
      <Switch>
        <Route exact={true} path="/projects" component={ProjectListContainer} />
        <Route exact={true} path="/project/:id" component={ProjectContainer} />
        {/* <Route exact={true} path="/projects" component={ProjectListSuspense} /> */}
        {/* <Route exact={true} path="/project/:id" component={ProjectSuspense} /> */}
        <Route component={NoContentFound} />
      </Switch>
    </Content>
  );
}
