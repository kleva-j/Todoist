import React from 'react';
import { PageHeader, Descriptions, Tag, Skeleton, Avatar, Button, Icon } from 'antd';
import styles from './style.module.less';
import { ConfirmModal } from '../../../../Reuseables/Modals/confirmation';

const ConfirmDelete = ConfirmModal({
  title: 'Are you sure you want to delete this Project',
  ok: { text: 'Delete', type: 'danger' },
  cancel: { text: 'Cancel' }
});

export const ProjectItemHeader = (props) => {
  const { handleBack, title, tasks, status, name, date, contributors, loading=false } = props;
  const crtb = contributors.map(item => item.display_pic);
  
  return (
    <div className={styles['Pageheader-container']}>
      <Skeleton loading={loading} active>
        <PageHeader
          ghost={false}
          onBack={handleBack}
          title={<h4>{String(title).toUpperCase()}</h4>}
          tags={<Tag color="blue">{status}</Tag>}
          subTitle="Project"
          extra={[
            <Button key="1" className={styles['Delete-button']} onClick={ConfirmDelete}>
              Delete
              <Icon type="delete" title="Delete Project" />
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Created by">{name}</Descriptions.Item>
            <Descriptions.Item label="Number of tasks">
              <a href="#task">{tasks}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Created On">{date}</Descriptions.Item>
            <Descriptions.Item label="Expected to Complete">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Contributors/Collaborators">

              {crtb.slice(0, 4).map((item, index) => (
                <Avatar src={item} key={index} style={{ height: 20, width: 20 }} />
              ))}
              <Icon type="plus-circle-o" style={{ color: '#1890FF', opacity: .5, fontSize: 20 }} />

            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Skeleton>
    </div>
  );
};
