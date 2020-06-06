import React from 'react';
import { Modal, Icon } from 'antd';

const { confirm } = Modal;

export const ConfirmModal = ({
  title='Are you sure delete this?',
  icon=<Icon type="exclamation-circle-o" />,
  content='',
  ok={ text: 'Yes', type: 'danger' },
  cancel={ text: 'No' },
  successCb = () => console.log('Ok'),
  cancelCb = () => {},
  ...rest
}) => () => {
  return confirm({
    title,
    icon, content,
    okText: ok.text,
    okType: ok.type,
    cancelText: cancel.text,
    onOk: successCb,
    onCancel: cancelCb,
    ...rest
  });
};
