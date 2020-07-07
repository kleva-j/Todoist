import React, { useState } from "react";
import { Modal } from "antd";

export const UseModal = ({ successCb, cancelCb, ...rest }) => {
  const [state, setState] = useState({ isVisible: false, loading: false });
  const toggleVisibleState = (visibleState) =>
    setState((iState) => ({
      ...iState,
      isVisible: visibleState || !iState.isVisible,
    }));
  const setLoading = (isLoading) =>
    setState((iState) => ({
      ...iState,
      loading: isLoading || !iState.loading,
    }));
  const handleSuccess = (callback) => {
    if (callback) callback();
    toggleVisibleState(false);
  };
  const handleCancel = (callback) => {
    if (callback) callback();
    toggleVisibleState(false);
  };

  const { loading, isVisible } = state;

  const config = {
    width: 500,
    title: "",
    visible: isVisible,
    onOk: () => handleSuccess(successCb),
    onCancel: () => handleCancel(cancelCb),
    ...rest,
  };

  const ModalH = React.memo(({ children }) => (
    <Modal {...config}>{children || <></>}</Modal>
  ));

  return [
    ModalH,
    {
      loading,
      isVisible,
      setLoading,
      toggleVisibleState,
    },
  ];
};
