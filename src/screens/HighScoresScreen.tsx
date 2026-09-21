import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/gameStyles";
import { getScores, Score } from "../utils/gameStorage";

type Props = {
  onExit: () => void;
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export default function HighScoresScreen({ onExit }: Props) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    getScores().then((loaded) => {
      const sorted = [...loaded].sort((a, b) => a.time - b.time);
      setScores(sorted);
    });
  }, []);

  return (
    <SafeAreaView style={styles.scoresSafeArea}>
      <View style={styles.scoresContainer}>
        <View style={styles.scoresHeader}>
          <Pressable onPress={onExit} hitSlop={10} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>‹ MENU</Text>
          </Pressable>

          <Text style={styles.scoresTitle}>HIGH SCORES</Text>
        </View>

        {scores.length === 0 ? (
          <Text style={styles.scoresEmptyText}>
            NO SCORES YET.{"\n"}FINISH A GAME TO SET ONE.
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {scores.map((score, index) => (
              <View key={score.id} style={styles.scoreRow}>
                <Text style={styles.scoreRank}>{index + 1}</Text>

                <View style={{ flex: 1 }}>
                  <Text style={styles.scoreName}>{score.name}</Text>
                  <Text style={styles.scoreDifficulty}>
                    {score.difficulty}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.scoreTime}>
                    {formatTime(score.time)}
                  </Text>
                  <Text style={styles.scoreMistakes}>
                    {score.mistakes}/4 MISTAKES
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
