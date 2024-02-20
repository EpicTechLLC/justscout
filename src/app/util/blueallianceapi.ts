import ky from "ky";

export default function blueAllianceAPI() {
  const baseURL = "https://www.thebluealliance.com/api/v3";
  const api = ky.create({
    prefixUrl: baseURL,
    headers: {
      "X-TBA-Auth-Key": process.env.BLUE_ALLIANCE_API_KEY,
    },
  });
  return api;
}
