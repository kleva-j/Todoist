import React from "react";
import { Icon } from "antd";

import { CreateWrapper } from "./CreateProject/wrapper";
import { CustomModal as Modal } from "../../../Reuseables/Modals";
import styles from "./style.module.less";

export const Dashboard = (props) => {
  console.log(props)
  const {
    state: { modalIsVisible },
    handleCancel,
    handleOk,
    toggleCreateModal,
    goToProjects
  } = props;

  return (
    <section className={styles["Dashboard_container"]}>
      <div className={styles["Blue_container"]}></div>
      <article className={styles["Dashboard_article"]}>
        <main className={styles["FlexButton_container"]}>
          <button
            className={styles["Create_project"]}
            onClick={toggleCreateModal}
          >
            <Icon type="plus" style={{ fontSize: "20px" }} />
            New Project
          </button>
          <button
            className={styles["Goto_project"]}
            onClick={goToProjects}
          >
            Go to Projects
          </button>
        </main>
        <main className={styles["Flex_container"]}>
          <aside className={styles["Article_item"]}></aside>
          <aside className={styles["Article_item"]}></aside>
        </main>
      </article>
      {modalIsVisible && (
        <Modal
          title={<h2>New project</h2>}
          isVisible={modalIsVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          width={800}
          footer={null}
          bodyStyle={{
            paddingTop: 0,
          }}
          maskClosable={false}
        >
          <CreateWrapper />
        </Modal>
      )}
    </section>
  );
};
