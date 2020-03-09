import React from 'react';
import { PageHeader, Button, Descriptions, Tag } from 'antd';

export const ProjectContainer = ({ history }) => {

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <PageHeader
        ghost={false}
        onBack={() => history.push('/projects')}
        title={<h4>SHOPLINK</h4>}
        tags={<Tag color="blue">Running</Tag>}
        subTitle="Project"
        extra={[
          <Button key="3" type="primary" ghost>+ Add Contributor</Button>,
          <Button key="1" type="danger" ghost>
            Delete Project
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created by">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Number of tasks">
            <a href="#task">35</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Contributors/Collaborators">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
}
