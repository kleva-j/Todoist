import React from "react";
import { ProjectItemHeader } from "./header/PageHeader";

import { Sidebar } from "./sidebar";
import styles from "./style.module.less";
import { ContentWrapper } from "./content/wrapper";

export const ProjectItem = (props) => {
  const { project, tasks, handleBack, id } = props;

  const {
    title,
    creator_name: name,
    created_on,
    contributors,
    description,
    creator_id,
    content,
    status,
  } = project || {};

  const date = new Date(created_on?.seconds * 1000).toUTCString();
  return (
    <div className={styles["ProjectItem-container"]}>
      <div>
        <ProjectItemHeader
          {...{
            id,
            name,
            date,
            title,
            status,
            description,
            content,
            creator_id,
            contributors: contributors || [],
            task: tasks?.length,
            handleBack,
            loading: !!!project,
          }}
        />
        <ContentWrapper tasks={tasks} project={{ id, title, description }} />
      </div>

      <Sidebar />
    </div>
  );
};
