import { AbilityUnion } from "../modules/characters/characterType";

export const BASE_URL = "http://localhost:3001/characters";

// this should be coming from BE as both enum and value
export const CHARACTER_TAGS = [
  "monster",
  "melee",
  "human",
  "ninja",
  "agile",
  "god",
  "aerial",
  "strong",
  "grappling",
  "defend",
  "attack",
  "block",
  "mercenary",
  "demon",
  "robot",
  "magic",
  "ranged",
  "alien",
  "ghost",
  "grapple",
  "animal",
];

export const ABILITY_NAME: Array<AbilityUnion> = [
  "Mobility",
  "Technique",
  "Survivability",
  "Power",
  "Energy",
];
