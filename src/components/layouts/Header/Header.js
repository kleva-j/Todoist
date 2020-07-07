import React from 'react';
import { Link } from 'react-router-dom';
import { withHandlers } from 'recompose';
import { useSelector } from 'react-redux';
import { Layout, Icon, Avatar, Dropdown, Menu } from 'antd';

import styles from './style.module.less';
import { FirebaseApp } from '../../../services';

const { Header } = Layout;

export const HeaderComponent = withHandlers({
  handleLogOut: () => () => {
    FirebaseApp.analytics.logEvent('logout');
    return FirebaseApp.logoutUser();
  }
})((props) => {
  const { toggle, collapsed, handleLogOut } = props;
  const { photoURL } = useSelector(state => state.firebase.auth)
  
  const DropdownMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/user/profile">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/user/settings">
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/help">
          Help
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="" onClick={handleLogOut}>
          Signout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles['Header_container']}>
      <div className={styles['Header_content']}>
        <div>
          <span className={styles['logo_container']}>
            <Icon type="code" className={styles['logo']} />
            <h2 className={styles['logo_name']}>TASKAIDER</h2>
          </span>
          <Icon
            className={styles['trigger']}
            type={collapsed ? 'align-left' : 'align-right'}
            onClick={toggle}
          />
        </div>
        <div>
          <Dropdown overlay={DropdownMenu} placement="bottomLeft">
            <Avatar icon="user" src={photoURL} />
          </Dropdown>
        </div>
      </div>
    </Header>
  )
});
