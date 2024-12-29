export const JustScoutRoutes = {
  home: { name: "Home", path: "/" },
  profiles: {
    name: "Profiles",
    path: "/profiles",
    subpaths: {
      teams: { name: "Teams", path: "/profiles/teams" },
	  team: { name: "Team", path: "/profiles/team" },
    },
  },
};
