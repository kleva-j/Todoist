import React from 'react';
import { Progress, Avatar } from 'antd';
import styles from './style.module.less';

export const TaskItem = ({ title, assignee, toggleModal }) => {

  return (
    <li className={styles['Taskitem']} onClick={() => toggleModal({ title, assignee })}>
      <div>
        <p>{title}</p>
      </div>
        
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
        <div style={{ width: 170 }}>
          <Progress percent={30} size="small" showInfo={false} />
        </div>
        {assignee.slice(0, 2).map(({img_url}, index) => (<Avatar src={img_url} key={index} style={{ height: 20, width: 20 }} /> ))}
      </div>
    </li>
  );
};
