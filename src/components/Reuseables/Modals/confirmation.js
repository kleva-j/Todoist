import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const ConfirmModal = ({
  title='Are you sure delete this?',
  icon=<ExclamationCircleOutlined />,
  content='',
  ok={ text: 'Yes', type: 'danger' },
  cancel={ text: 'No' },
  successCb = () => console.log('Ok'),
  cancelCb = () => {},
}) => () => {
  return confirm({
    title,
    icon, content,
    okText: ok.text,
    okType: ok.type,
    cancelText: cancel.text,
    onOk: successCb,
    onCancel: cancelCb
  });
};
