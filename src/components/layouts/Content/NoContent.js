import React from 'react';
import { Result, Button } from 'antd';

export const NoContentFound = ({ history }) => {
  
  return (
    <Result
      status="404"
      title="404"
      style={{ margin: '0 auto' }}
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => history.push('/project/all')}>Back to Projects</Button>}
    />
  );
}
