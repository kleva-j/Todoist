import ProjectComponent from "components/organisms/Projects/Project";
import Error from "next/error";

import {
  ProjectList,
  ProjectType,
  Tablist,
} from "components/organisms/Projects/constants";
import { NextPageContext } from "next";

interface ProjectPageProps {
  id: string;
  notFound?: Boolean;
  currentTab?: string;
  project: ProjectType;
  tabIndex?: string | number;
}

const Project = ({
  id,
  project,
  tabIndex,
  notFound,
  currentTab,
}: ProjectPageProps) => {
  if (notFound) {
    const title = `Project with id of "${id}" does not exist!`;
    return <Error statusCode={404} title={title} />;
  }
  return (
    <ProjectComponent
      project={project}
      currentTab={currentTab}
      currentTabIndex={Number(tabIndex)}
    />
  );
};

Project.getInitialProps = async ({ query }: NextPageContext) => {
  const { id: param } = query;
  const [projectId, currentTab] = param as string[];
  const tab = Object.values(Tablist).find(
    ({ title }) => title.toLowerCase() === currentTab);
  const tabIndex = tab?.index ?? 0;
  const project = ProjectList[Number(projectId)];
  if (!projectId || !project) return { notFound: true, id: projectId };
  return { project, id: projectId, currentTab, tabIndex };
};

export default Project;
