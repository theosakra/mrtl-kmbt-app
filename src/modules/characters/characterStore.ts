import create from "zustand";
import { GetAllCharatersRequest } from "./characterType";

type Limit = GetAllCharatersRequest["limit"];

interface CharacterStore {
  limit: Limit;
  setLimit: (limit: Limit) => void;
  name: string;
  setName: (name: string) => void;
  tags: Array<string>;
  setTags: (tags: Array<string>) => void;
  resetStore: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  limit: 40,
  setLimit: (limit) => set({ limit, name: "" }),
  name: "",
  setName: (name) => set({ name }),
  tags: [],
  setTags: (tags) => set({ tags }),
  resetStore: () => set({ limit: 40, name: "", tags: [] }),
}));
