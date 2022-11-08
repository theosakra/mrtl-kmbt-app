import { useQuery, UseQueryOptions } from "react-query";
import { getAllCharaters, getCharacterByID } from "./characterService";
import {
  Character,
  GetAllCharatersRequest,
  GetCharacterByIDRequest,
} from "./characterType";

export const useGetAllCharacters = (
  payload: GetAllCharatersRequest,
  options?: UseQueryOptions<
    Array<Character>,
    unknown,
    Array<Character>,
    Array<string | GetAllCharatersRequest>
  >
) => {
  return useQuery(
    ["all-characters", payload],
    () => getAllCharaters(payload),
    options
  );
};

export const useGetCharacterByID = (
  payload: GetCharacterByIDRequest,
  options: UseQueryOptions<
    Character,
    unknown,
    Character,
    Array<string | GetCharacterByIDRequest>
  >
) => {
  return useQuery(
    ["character-by-id", payload],
    () => getCharacterByID(payload),
    options
  );
};
