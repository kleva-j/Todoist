import React from 'react';
import { ProjectItemHeader } from './header/PageHeader';
import { Sidebar } from './sidebar';
import { ContentWrapper } from './content/wrapper'
import styles from './style.module.less';

export const ProjectItem = (props) => {
  const { data: { project, tasks: taskItems }, handleBack } = props;
  const {
    description, tasks, creator_id, content, id,
    status, title, creator_name, timeline, date, contributors
  } = project;

  return (
    <div className={styles['ProjectItem-container']}>

      <div>
        <ProjectItemHeader
          status={status} contributors={contributors} title={title}
          tasks={tasks.length} date={date} description={description} name={creator_name}
          handleBack={handleBack} creator_id={creator_id} content={content}
        />
        <ContentWrapper tasks={taskItems} project={{ id }} />
      </div>
      
      <Sidebar timeline={timeline} />
      
    </div>
  );
}
