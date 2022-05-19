import { NavigationLayer } from "./Interface";
import { Routing } from "./Routes";
import {
  FiTrendingUp,
  FiSettings,
  FiCompass,
  FiHome,
  FiStar,
} from "react-icons/fi";

export const NavigationLayers: NavigationLayer = {
  title: "Overview",
  items: [
    {
      title: "Overview",
      icon: FiHome,
      path: Routing.home,
      exact: true,
    },
    {
      title: "activity",
      icon: FiStar,
      path: Routing.activity,
      exact: true,
    },
    {
      title: "schedule",
      icon: FiCompass,
      path: Routing.schedule,
      exact: true,
    },
    {
      title: "Messages",
      icon: FiCompass,
      path: Routing.messages,
      exact: true,
    },
    {
      title: "Report",
      icon: FiStar,
      path: Routing.report,
      exact: true,
    },
    {
      title: "Projects",
      icon: FiStar,
      items: [
        {
          title: "Overview",
          path: Routing.projects.overview,
          exact: true,
        },
      ],
    },
    {
      title: "Settings",
      icon: FiSettings,
      items: [
        {
          title: "Profile",
          path: Routing.settings.profile,
          exact: true,
        },
        {
          title: "Notification",
          path: Routing.settings.notification,
        },
        {
          title: "Personal Information",
          path: Routing.settings.personal_info,
        },
      ],
    },
  ],
};

// Dashboard, Projects, Teams, Calendar.
// messages projects, activities teams 
