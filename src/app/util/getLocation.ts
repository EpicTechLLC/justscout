import { ITeam } from "../types/ITeam";

const validateData = (value: unknown) => {
  if (value === null || value === undefined) {
    return false;
  } else return true;
};

export default function getLocation(
  city: string,
  stateProv: string,
  country: string
) {
  if (validateData(city) && validateData(stateProv) && validateData(country)) {
    return city + ", " + stateProv + ", " + country;
  } else {
    return "--";
  }
}
