import React from 'react';
import { Typography, Input, Icon } from 'antd';
import { useSelector } from 'react-redux';

import styles from './style.module.less';
import { TaskContainerWrapper } from './TaskContainer/wrapper';
import { CustomModal as Modal } from '../../../../Reuseables/Modals';
import { TaskItemModal } from '../../../../Reuseables/Modals/TaskItem';

const { Title } = Typography;
const { Search } = Input;

export const Content = (props) => {
  const { photoURL, uid, displayName } = useSelector(state => state.firebase.auth);
  const {
    tasks, toggleTaskModal, project,
    handleSearch, handleOk, handleCancel,
    state: { taskMenus, modalIsVisible, modal },
  } = props;
  
  return (
    <div className={styles['Content-container']} id="task">
      <div className={styles['Taskbar-container']}>
        <Title level={4}>TASKS BOARD</Title>
        <Search
          placeholder="Search here..."
          style={{ width: '450px' }}
          loading={false}
          onSearch={handleSearch}
        />
        <Icon type="setting" className={styles['Settings-icon']} />
      </div>

      <div className={styles['Task-content']}>
        {
          taskMenus
            .map((item, index) => (
              <TaskContainerWrapper
                key={index}
                title={item}
                listitems={tasks[item]}
                toggleModal={toggleTaskModal}
                user={{
                  uid, user_name: displayName, photoURL
                }}
                project={project}
              />
            ))
        }
      </div>
      {
        modalIsVisible
          && 
        (
          <Modal
            isVisible={modalIsVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={700}
            footer={null}
          >
            <TaskItemModal photoURL={photoURL} taskItemProps={modal} />
          </Modal>
        )
      }
    </div>
  );
};
