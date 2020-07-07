import React, { memo } from "react";
import { Icon } from "antd";
import { motion } from "framer-motion";

import { CreateWrapper } from "./CreateProject/wrapper";
import { SEOHeader } from "../../../Reuseables/Header";
import { UseModal } from "../../../../hooks/UseModal";
import styles from "./style.module.less";

export const Dashboard = memo((props) => {
  const { goToProjects } = props;

  const [ModalH, { toggleVisibleState }] = UseModal({
    title: <h2>New project</h2>,
    footer: null,
    width: 700,
    bodyStyle: {
      paddingTop: 0,
    },
    maskClosable: false,
  });

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles["Dashboard_container"]}
    >
      <SEOHeader
        pageTitle="Dashboard"
        pageDesc="Taskaider dashboard page"
        currentURL="/dashboard"
      />
      <div className={styles["Blue_container"]}></div>
      <article className={styles["Dashboard_article"]}>
        <main className={styles["FlexButton_container"]}>
          <button
            className={styles["Create_project"]}
            onClick={() => toggleVisibleState(true)}
          >
            <Icon type="plus" style={{ fontSize: "20px" }} />
            New Project
          </button>
          <button className={styles["Goto_project"]} onClick={goToProjects}>
            Go to Projects
          </button>
        </main>
        <main className={styles["Flex_container"]}>
          <aside className={styles["Article_item"]}></aside>
          <aside className={styles["Article_item"]}></aside>
        </main>
      </article>

      <ModalH>
        <CreateWrapper toggleModal={toggleVisibleState} />
      </ModalH>
    </motion.section>
  );
});
