import create from "zustand";
import { AbilityUnion, GetAllCharatersRequest } from "./characterType";

export type Limit = GetAllCharatersRequest["limit"];

type SelectedCharacter = {
  name: string;
  abilities: Map<AbilityUnion, number>;
  thumbnail: string;
};

interface CharacterStore {
  limit: Limit;
  setLimit: (limit: Limit) => void;
  name: string;
  setName: (name: string) => void;
  tags: Array<string>;
  setTags: (tags: Array<string>) => void;
  resetStore: () => void;
  selectedID: number | null;
  setSelectedID: (id: number | null) => void;
  selectedCharacters: Array<SelectedCharacter>;
  setSelectedCharacters: (character: SelectedCharacter) => void;
  removeCharacterFromTeam: (name: string) => void;
  getAverageTeamValue: (key: AbilityUnion) => number;
  checkIsInTeam: (name: string) => boolean;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  limit: 40,
  setLimit: (limit) => set({ limit, name: "" }),
  name: "",
  setName: (name) => set({ name }),
  tags: [],
  setTags: (tags) => set({ tags }),
  resetStore: () => set({ limit: 40, name: "", tags: [] }),
  selectedID: null,
  setSelectedID: (id) => set({ selectedID: id }),
  selectedCharacters: [],
  setSelectedCharacters: (character) => {
    const { selectedCharacters } = get();

    if (selectedCharacters.length === 5) {
      return;
    }

    const newArr = [...selectedCharacters, character];
    return set({ selectedCharacters: newArr });
  },
  removeCharacterFromTeam: (name) => {
    const { selectedCharacters } = get();
    const newVal = selectedCharacters.filter((char) => char.name !== name);

    return set({ selectedCharacters: newVal });
  },
  getAverageTeamValue: (key) => {
    const { selectedCharacters } = get();
    const val = selectedCharacters
      .map((char) => char.abilities.get(key))
      .reduce((prev, curr) => (prev || 0) + (curr || 0), 0);

    if (val && val > 0) {
      return +(val / selectedCharacters.length).toFixed(2);
    }

    return 0;
  },
  checkIsInTeam: (name) => {
    const { selectedCharacters } = get();
    const isInTeam = selectedCharacters.some((char) => char.name === name);

    return isInTeam;
  },
}));
