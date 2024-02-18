import ky from "ky";

export default function firstAPI() {
  const baseURL = "https://frc-api.firstinspires.org/v3.0/";
  const authKey =
    "Basic " + btoa(process.env.FRC_USERNAME + ":" + process.env.FRC_PASSWORD);
  const api = ky.create({
    prefixUrl: baseURL,
    headers: {
      Authorization: authKey,
    },
  });
  return api;
}
