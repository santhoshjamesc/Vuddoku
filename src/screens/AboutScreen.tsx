import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/gameStyles";

type Props = {
  onExit: () => void;
};

export default function AboutScreen({ onExit }: Props) {
  return (
    <SafeAreaView style={styles.scoresSafeArea}>
      <View style={styles.scoresContainer}>
        <View style={styles.scoresHeader}>
          <Pressable onPress={onExit} hitSlop={10} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>‹ MENU</Text>
          </Pressable>

          <Text style={styles.scoresTitle}>ABOUT</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutHeading}>A LETTER FROM THE DEVELOPER</Text>

            <Text style={styles.aboutParagraph}>Hey there,</Text>

            <Text style={styles.aboutParagraph}>
              I&rsquo;m Santhosh James, the developer behind Vuddoku. I built
              this game because I wanted a Sudoku that never lets you get too
              comfortable — numbers vanish, the board flips, and every second
              counts.
            </Text>

            <Text style={styles.aboutParagraph}>
              It started as a small side project and turned into something I
              genuinely enjoy playing myself, mistakes and all. I hope it
              gives you the same mix of focus and mild panic that it gave me
              while building it.
            </Text>

            <Text style={styles.aboutParagraph}>
              Thanks for playing. If you enjoy the chaos as much as I enjoyed
              building it, that&rsquo;s all I could ask for.
            </Text>

            <Text style={styles.aboutParagraph}>Keep solving,</Text>

            <Text style={styles.aboutSignatureName}>Santhosh James</Text>
            <Text style={styles.aboutSignatureRole}>Developer, Vuddoku</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
