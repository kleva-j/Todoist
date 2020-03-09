import React from 'react';
import { List, Icon } from 'antd';
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export const ListItem = (props) => {
  const { listData } = props;
  return (
    <List
      itemLayout="vertical"
      // size="large"
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
          actions={[
            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
            <IconText type="message" text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={img_src}
            />
          }
        >
          <List.Item.Meta
            title={<Link to={`/project/${id}`}>{title}</Link>}
            description={description}
          />
          {content}
        </List.Item>
      )}
    />
  );
};
