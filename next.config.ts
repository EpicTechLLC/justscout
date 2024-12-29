import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const currentYear = new Date().getFullYear();
    return [
      {
        source: "/profiles",
        destination: "/profiles/teams/0",
        permanent: true,
      },
      {
        source: "/profiles/teams",
        destination: "/profiles/teams/0",
        permanent: true,
      },
      {
        source: "/profiles/team/:id", // Matches /team/[id]
        destination: `/profiles/team/:id/${currentYear}`, // Embed the current year
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
