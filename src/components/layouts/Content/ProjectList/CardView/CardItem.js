import React from 'react';
import { Card, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export const CardItem = (props) => {
  const { id, imgSrc, title } = props;
  const styles = { minWidth: 210, maxWidth: 300 };
  
  return (
    <Col>
      <Card
        hoverable
        style={styles}
        cover={
          <img
            alt="random"
            src={imgSrc}
          />
        }
      >
        <Meta
          title={<Link to={`/project/${id}`}>{title}</Link>}
        />
      </Card>
    </Col>
  );
};
