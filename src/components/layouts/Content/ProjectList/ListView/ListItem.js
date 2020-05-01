import React from 'react';
import { Skeleton, List, Icon } from 'antd';
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export const ListItem = ({ listData, loading=false }) => {

  return (
    <List
      itemLayout="vertical"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}

      renderItem={({ id, title, description, img_src, content }) => (
        <List.Item
          key={title}
          actions={!loading &&[
            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
            <IconText type="message" text="2" key="list-vertical-message" />,
          ]}
          extra={
            !loading &&
            (<img
              width={272}
              alt="logo"
              src={img_src}
            />)
          }
        >

          <Skeleton loading={loading} active avatar>
            <List.Item.Meta
              title={<Link to={`/project/${id}`}>{title}</Link>}
              description={description}
            />
            {content}
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
