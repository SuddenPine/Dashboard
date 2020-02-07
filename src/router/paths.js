/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: "",
    // Relative to /src/views
    view: "Dashboard"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    view: "UserProfile"
  },
  {
    path: "/monitor",
    name: "Monitor",
    view: "Monitor"
  },
  {
    path: "/league",
    name: "League",
    view: "League"
  },
  {
    path: "/icons",
    view: "Icons"
  },
  {
    path: "/maps",
    view: "Maps"
  },
  {
    path: "/notifications",
    view: "Notifications"
  },
  {
    path: "/upgrade",
    name: "Upgrade to PRO",
    view: "Upgrade"
  }
];
