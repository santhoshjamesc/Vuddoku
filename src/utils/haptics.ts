import * as Haptics from "expo-haptics";

// A short tactile pulse for when a filled number disappears from the board.
export async function vibrateNumberVanish(): Promise<void> {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {
    // Haptics can be unavailable (e.g. some web browsers/devices) - safe to ignore.
  }
}

// A warning-style pulse for when the board flips and the player needs to take notice.
export async function warnBoardFlip(): Promise<void> {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch {
    // Haptics can be unavailable (e.g. some web browsers/devices) - safe to ignore.
  }
}
