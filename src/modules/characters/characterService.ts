import { BASE_URL } from "../../shared/constant";
import { fetcher } from "../../shared/fetcher";
import { Character } from "../../types";
import { GetAllCharatersRequest } from "./characterType";

export const getAllCharaters = (payload: GetAllCharatersRequest) => {
  // this should be handled by backend
  if (payload.tags?.length) {
    const tagNames = payload.tags.map((tag) => `q=${tag}`).join("&");
    return fetcher<Array<Character>>(`${BASE_URL}?${tagNames}`);
  }

  if (payload.name) {
    return fetcher<Array<Character>>(`${BASE_URL}?name_like=${payload.name}`);
  }

  if (payload.limit === "all") {
    return fetcher<Array<Character>>(BASE_URL);
  }

  return fetcher<Array<Character>>(
    `${BASE_URL}?_page=${payload.page}&_limit=${payload.limit}`
  );
};
