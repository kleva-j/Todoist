export const siteConfig = {
  name: "Todoist",
  description: "Ai-powered task management app.",
  url: "https://todoist.vercel.app",
  navigations: {
    links: {
      home: {
        name: "Home",
        href: "/",
      },
      "sign-in": {
        name: "Sign in",
        href: "/auth/sign-in",
      },
      "sign-up": {
        name: "Sign up",
        href: "/auth/sign-up",
      },
      dashboard: {
        name: "Dashboard",
        href: "/dashboard",
      },
    },
  },
};

export const placeholderImage = (str: string) => {
  return `https://placehold.co/400x600/EEE/31343C?font=monaco&text=${encodeURI(
    str
  )}`;
};
