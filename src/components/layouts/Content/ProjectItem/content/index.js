import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Typography, Input, Icon } from 'antd';

import styles from './style.module.less';
import { TaskContainerWrapper } from './TaskContainer/wrapper';
import { CustomModal as Modal } from '../../../../Reuseables/Modals';
import { TaskItemModal } from '../../../../Reuseables/Modals/TaskItem';
import { SEOHeader } from '../../../../Reuseables/Header';

const { Title } = Typography;
const { Search } = Input;

export const Content = (props) => {
  const { photoURL, uid, displayName } = useSelector(state => state.firebase.auth);
  const {
    tasks, toggleTaskModal, project,
    handleSearch, handleOk, handleCancel,
    state: { taskMenus, modalIsVisible, modal },
    handleTaskUpdate, loadingUpdate
  } = props;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles['Content-container']} id="task">
      <SEOHeader pageTitle={`${project.title}`} pageDesc={`${project.description}`} currentURL={`/project/${project.id}`} />
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
            <TaskItemModal photoURL={photoURL} taskItemProps={modal} updateTask={handleTaskUpdate('update')} isLoading={loadingUpdate} />
          </Modal>
        )
      }
    </motion.div>
  );
};
