import { Data } from "../../types/movie";

export const sortByKey = (key: string) => (a: Data, b: Data) => {
  if (key.toString() === "release_date") {
    return a?.release_date > b?.release_date ? 1 : -1;
  }

  return b?.vote_average - a?.vote_average;
};
