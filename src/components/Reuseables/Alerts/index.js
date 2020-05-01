import React from "react";
import { Alert } from "antd";

export const CustomAlert = ({
  type,
  message,
  description,
  afterClose,
  ...rest
}) => {
  return (
    <Alert
      type={type}
      message={message}
      description={description}
      style={{
        position: "absolute",
        width: "100%",
        top: "-110px",
      }}
      closable
      afterClose={afterClose}
      {...rest}
    />
  );
};
