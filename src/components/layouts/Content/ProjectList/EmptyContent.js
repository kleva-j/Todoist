import React from 'react';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

export const EmptyContent = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        No Project Created Yet.
      </span>
    }
  >
    <Link to={'/projects'}>
      <Button type="primary">Create Now</Button>
    </Link>
  </Empty>
);
