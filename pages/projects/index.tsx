import { ProjectList, ProjectType } from 'components/organisms/Projects/constants';
import { ProjectDashboard } from "components/organisms/Projects";

export interface ProjectsPageProps {
  projects: ProjectType[]
}

const Projects = ({ projects }: ProjectsPageProps) => {
  return <ProjectDashboard projects={projects}  />;
};

Projects.getInitialProps = async () => {
  return { projects: Object.values(ProjectList) };
};

export default Projects;
