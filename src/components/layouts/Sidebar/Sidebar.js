import React from 'react';
import { Layout, Menu, Icon, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './style.module.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const SidebarComponent = ({ collapsed }) => {

  const projectList = useSelector(state => state.firestore.data?.projects);
  
  const projectTitles = projectList && Object.values(projectList)
    .map(project => ({
      id: project.id,  
      title: project.title
    }));

  return (
    <Sider
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width='270px'
      className={styles['Sidebar_sider']}
    >
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" className={styles['Sidebar_menu']}>

        <Menu.Item key="1">
          <Icon type="appstore" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
          <span>Dashboard</span>
          <Link to="/dashboard" />
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="layout" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
              <span>Projects</span>
            </span>
          }
        >
          {projectTitles && projectTitles.map(
            ({ title, id }, index) => (<Menu.Item key={index+4}>
              <Link to={`/project/${id}`}>{title}</Link>
            </Menu.Item>)
          )}
        </SubMenu>

        <Menu.Item key="50">
          <Divider />
        </Menu.Item>

        <Menu.Item key="9">
          <Icon type="bell" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
          <span>Notifications</span>
          <Link to="/user/notification" />
        </Menu.Item>

        <Menu.Item key="8">
          <Icon type="setting" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
          <span>Settings</span>
          <Link to="/user/settings" />
        </Menu.Item>

      </Menu>
    </Sider>
  );
};

