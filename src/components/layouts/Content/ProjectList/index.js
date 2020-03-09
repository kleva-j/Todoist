import React, { useState } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import { CardItem } from './CardView/CardItem';
import { ProjectPageHeader } from './PageHeader/ProjectPageHeader'
import { ListItem } from './ListView/ListItem';

export const ProjectListContainer = () => {
  const [state, setState] = useState({
    defaultView: 'cardview',
    isCardView: true
  });

  const { uid } = useSelector(state => state.firebase.auth);

  useFirestoreConnect([{
    collection: 'projects',
    where: ['creator_id', '==', `${uid}`]
  }]);

  const projectList = useSelector(state => state.firestore.data?.projects);
  
  const projects = projectList ? Object.values(projectList) : [];

  const { isCardView } = state;

  const handleViewClick = () => setState({ ...state, isCardView: !isCardView });

  return (
    <div style={{ padding: 25 }}>
      <ProjectPageHeader isCardView={isCardView} handleClick={handleViewClick}>
        {
          (projects && projects.length >= 1) ?
            (
              isCardView ? 
                (
                  <Row type="flex" gutter={[24, 32]}>
                    {projects.map(({ id, title, description, img_src }) => (
                      <CardItem key={id} id={id} title={title} imgSrc={img_src} description={description} />
                    ))}
                  </Row>
                ) : (
                  <ListItem listData={projects} />
                )
            ) :

            (<p>No project created yet.</p>)
        }
      </ProjectPageHeader>
    </div>
  );
};
