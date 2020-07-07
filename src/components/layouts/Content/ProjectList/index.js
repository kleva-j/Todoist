import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import styles from "./style.module.less";
import { EmptyContent } from "./EmptyContent";
import { CardItem } from "./CardView/CardItem";
import { ListItem } from "./ListView/ListItem";
import { selectProject } from "../../../../selectors/projects";
import { ProjectPageHeader } from "./PageHeader/ProjectPageHeader";

export const ProjectListContainer = ({
  state: { isCardView },
  handleViewClick,
}) => {
  const projectList = useSelector(selectProject);
  const projects = projectList ? Object.values(projectList) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: 25 }}
    >
      <ProjectPageHeader isCardView={isCardView} handleClick={handleViewClick}>
        {projects && projects.length >= 1 ? (
          isCardView ? (
            <div className={styles["Carditem-container"]}>
              {projects.map(({ id, title, description, img_src }) => (
                <CardItem
                  key={id}
                  id={id}
                  title={title}
                  imgSrc={img_src}
                  description={description}
                />
              ))}
            </div>
          ) : (
            <ListItem listData={projects} />
          )
        ) : (
          <EmptyContent />
        )}
      </ProjectPageHeader>
    </motion.div>
  );
};
