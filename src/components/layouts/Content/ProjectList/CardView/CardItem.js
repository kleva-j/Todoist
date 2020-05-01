import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const { Meta } = Card;

export const CardItem = connect(null, { push })((props) => {
  const { id, imgSrc, title } = props;
  const styles = { minWidth: 210, maxWidth: 300 };
  
  return (
    <Link to={`/project/${id}`}
      onClick={() => props.push(`/project/${id}`)}
    >
      <Card
        hoverable
        style={styles}
        cover={<img alt="random" src={imgSrc} />}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
});
