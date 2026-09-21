import AsyncStorage from "@react-native-async-storage/async-storage";

import { Board } from "./sudoku";

const CURRENT_GAME_KEY = "@vuddoku_current_game";
const SCORES_KEY = "@vuddoku_scores";

export type SavedGame = {
  board: Board;
  elapsedSeconds: number;
  mistakes: number;
  lastFlipAt: number;
  flipCount: number;
  flippedHorizontal: boolean;
  flippedVertical: boolean;
  difficulty: string;
};

export type Score = {
  id: string;
  name: string;
  time: number;
  mistakes: number;
  difficulty: string;
  date: string;
};

export async function saveCurrentGame(game: SavedGame): Promise<void> {
  try {
    await AsyncStorage.setItem(CURRENT_GAME_KEY, JSON.stringify(game));
  } catch (error) {
    console.error("Could not save game:", error);
  }
}

export async function loadCurrentGame(): Promise<SavedGame | null> {
  try {
    const data = await AsyncStorage.getItem(CURRENT_GAME_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Could not load game:", error);
    return null;
  }
}

export async function deleteCurrentGame(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_GAME_KEY);
  } catch (error) {
    console.error("Could not delete game:", error);
  }
}

export async function saveScore(score: Score): Promise<void> {
  try {
    const existing = await getScores();

    const updated = [...existing, score];

    await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Could not save score:", error);
  }
}

export async function getScores(): Promise<Score[]> {
  try {
    const data = await AsyncStorage.getItem(SCORES_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Could not load scores:", error);
    return [];
  }
}
