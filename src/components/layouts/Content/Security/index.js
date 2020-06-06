import React from 'react';
import { Divider, Button, Modal } from 'antd';

import { useUser } from '../../../../contexts/UserContext';
import styles from './style.module.less';

export const SecurityComponent = (props) => {
  const { handleCancel, handleReset, setModalVisibility,
    state: { confirmLoading, isModalVisible }
  } = props;
  const { email } = useUser();
  return (
    <section className={styles["Security_container"]}>
      
      <article className={styles["Article"]}>
        <h2>Password Reset</h2>
        <Divider style={{ margin: 0 }} />
        <p className={styles["Paragraph"]}>
          Choose your security settings and how you want it implemented.
        </p>
        <div>
          <Button type="danger" onClick={() => setModalVisibility(true)}>Request Password Reset</Button>
          <Modal
            title={<h3>Please confirm request to reset password!.</h3> }
            visible={isModalVisible}
            onOk={handleReset(email)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            closable={false}
            okText="Confirm"
          >
            <p>After comfirmation, a mail to reset your password would be sent to your registered email</p>
          </Modal>
        </div>
      </article>
      
    </section>
  );
};
