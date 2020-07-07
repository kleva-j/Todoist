import React from 'react';
import { Timeline, Icon, Skeleton } from 'antd';
import styles from './style.module.less'

export const Sidebar = ({ loading=false }) => {

  return (
    <div className={styles['Sidebar-container']}>
      <Skeleton loading={loading} active>
        <Timeline mode='left'>
          <Timeline.Item label="2015-09-01">Created a services</Timeline.Item>
          <Timeline.Item label="2015-09-01 09:12:11">Solved initial network problems</Timeline.Item>
          <Timeline.Item>Technical testing</Timeline.Item>
          <Timeline.Item color="red" label="2015-09-01 09:12:11" dot={<Icon type='calendar' style={{ fontSize: '16px' }} />}>Network problems occured</Timeline.Item>
          <Timeline.Item color="green" label="2015-09-01 09:12:11" dot={<Icon type='calendar' style={{ fontSize: '16px' }} />}>Network problems being solved</Timeline.Item>
          <Timeline.Item color="green" label="2018-09-01 09:12:11" dot={<Icon type='user' style={{ fontSize: '16px' }} />}>New user joined the project</Timeline.Item>
          <Timeline.Item>Technical testing</Timeline.Item>
        </Timeline>
      </Skeleton>
    </div> 
  );
};
