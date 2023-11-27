export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/activity.svg",
    route: "/notification",
    label: "Notification",
  },
  // {
  //   imgURL: "/assets/create.svg",
  //   route: "/create-thread",
  //   label: "Create Thread",
  // },
  // {
  //   imgURL: "/assets/community.svg",
  //   route: "/communities",
  //   label: "Communities",
  // },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

export const dashboardSidebarLinks = [
  {
    imgURL: "/assets/users.svg",
    route: "/dashboard/users",
    label: "User Management",
  },
  {
    imgURL: "/assets/post.svg",
    route: "/dashboard/post",
    label: "Post Management",
  },
];
