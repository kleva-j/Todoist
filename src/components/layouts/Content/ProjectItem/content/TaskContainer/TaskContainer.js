import React from 'react';
import { Icon, Popover, Input } from 'antd';
import styles from '../style.module.less';
import { TaskItem } from '../taskitem';

export const TaskContainer = (props) => {
  const {
    setPopover, handleOnEnter,
    state: { isPopoverVisible },
    title, listitems, toggleModal,
  } = props;

  const inputRef = React.useRef(null);

  return (
    <div className={styles['Taskcontent-container']}>
      <h3>{title}</h3>
      <ul style={{ paddingBottom: isPopoverVisible ? '120px' : '50px'}}>
        {
          listitems.map(({ id, title, assignee }) => (<TaskItem id={id} title={title} key={id} assignee={assignee} toggleModal={toggleModal} />))
        }
        <Popover
          title={''}
          placement="top"
          trigger="click"
          visible={isPopoverVisible}
          onVisibleChange={setPopover}
          content={
            <Input
              type="text"
              ref={inputRef}
              style={{ width: 260 }}
              placeholder="Enter title"
              onPressEnter={
                () => handleOnEnter({ title: inputRef.current.state.value, stage: title })
              }
            />
          }
        >
          <li className={styles['Add-card']}>
            <Icon type='plus' />
            {' '}
            Add another card
          </li>
        </Popover>
      </ul>
    </div>
  );
};
