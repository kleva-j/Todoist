import React from "react";
import { Modal } from "antd";

export const CustomModal = ({
  width = 500,
  isVisible,
  children,
  title,
  handleOk,
  handleCancel,
  ...rest
}) => {
  return (
    <Modal
      width={width}
      title={title}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      {...rest}
    >
      {children}
    </Modal>
  );
};
