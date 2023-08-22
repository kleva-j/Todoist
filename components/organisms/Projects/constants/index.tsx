export interface ProjectType {
  id: string;
  title: string;
  desc: string;
}

export type ProjectListType = Record<number, ProjectType>;

export const ProjectList: ProjectListType = {
  0: {
    id: "0",
    title: "NPS Satisfaction Survey",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  1: {
    id: "1",
    title: "Innovation Project Bubble",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  2: {
    id: "2",
    title: "Team Spirit Project",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  3: {
    id: "3",
    title: "User Research",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  4: {
    id: "4",
    title: "User Experience Design",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  5: {
    id: "5",
    title: "Personal Project",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  6: {
    id: "6",
    title: "App development process",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
  7: {
    id: "7",
    title: "Data Collection",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magnam?",
  },
};

export const Tablist = {
  0: {
    index: 0,
    title: "Overview",
    component: "",
  },
  1: {
    index: 1,
    title: "Tasks",
    component: "",
  },
  2: {
    index: 2,
    title: "Milestones",
    component: "",
  },
  3: {
    index: 3,
    title: "Messages",
    component: "",
  },
  4: {
    index: 4,
    title: "Files",
    component: "",
  },
  5: {
    index: 5,
    title: "Time",
    component: "",
  },
  6: {
    index: 6,
    title: "Comment",
    component: "",
  },
  7: {
    index: 7,
    title: "People",
    component: "",
  },
};
