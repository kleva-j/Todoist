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
          <Icon type="schedule" style={{ fontSize: '24px' }} />
          <span>Inbox</span>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" style={{ fontSize: '24px' }} />
              <span>Projects</span>
            </span>
          }
        >
          {projectTitles && projectTitles.map(
            ({ title, id }, index) => (<Menu.Item key={index+2}>
              <Link to={`/project/${id}`}>{title}</Link>
            </Menu.Item>)
          )}
        </SubMenu>

        <Menu.Item key="50">
          <Divider />
        </Menu.Item>

        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="team" style={{ fontSize: '24px' }} />
              <span>Team</span>
            </span>
          }
        >
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="7">Team 2</Menu.Item>
        </SubMenu>

      </Menu>
    </Sider>
  );
};

