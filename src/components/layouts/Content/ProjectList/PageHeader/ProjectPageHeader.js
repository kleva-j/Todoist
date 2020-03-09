import React from 'react';
import { PageHeader, Icon } from 'antd';
import { CustomDatePicker } from '../../../../Reuseables/Datepicker';
import styles from './style.module.less';

export const ProjectPageHeader = ({ isCardView, children, handleClick }) => {
  
  return (
    <PageHeader
      ghost={false}
      title={<h4>PROJECTS</h4>}
      style={{ background: 'inherit' }}
      extra={[
        <CustomDatePicker key="3" />,
        <Icon
          key="2"
          type="appstore"
          onClick={handleClick}
          style={{ fontSize: 22, cursor: 'pointer' }}
          className={isCardView && styles['ViewClass']}
        />,
        <Icon
          key="1"
          type="unordered-list"
          onClick={handleClick}
          style={{ fontSize: 22, cursor: 'pointer' }}
          className={!isCardView && styles['ViewClass']}
        />,
      ]}
    >{children}</PageHeader>
  );
};
