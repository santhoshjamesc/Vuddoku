import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import styles from "../styles/gameStyles";

type Props = {
  visible: boolean;
  onStart: () => void;
};

export default function GameRulesModal({ visible, onStart }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.rulesCard}>
          <View style={styles.rulesRedBlock} />

          <Text style={styles.rulesTitle}>VUDDOKU</Text>

          <Text style={styles.rulesHeading}>BEFORE YOU PLAY</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.rulesContent}
          >
            <Rule
              number="01"
              title="SOLVE"
              text="Complete the 9 × 9 Sudoku grid. Every row, column and 3 × 3 box must contain 1–9."
            />

            <Rule
              number="02"
              title="WATCH THE CLOCK"
              text="After you fill 60% of the board, numbers can begin disappearing."
            />

            <Rule
              number="03"
              title="VANISH"
              text="A filled number disappears at the configured interval. This continues until the board falls back to the 60% limit."
            />

            <Rule
              number="04"
              title="FLIP"
              text="The board can flip horizontally or vertically during the game. Pay attention to the new arrangement."
            />

            <Rule
              number="05"
              title="MISTAKES"
              text="You have 4 wrong entries. Your game ends when all 4 mistakes are used."
            />

            <Rule
              number="06"
              title="SCORE"
              text="Finish the puzzle to save your time and mistakes to the local high-score table."
            />
          </ScrollView>

          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onStart}
          >
            <Text style={styles.startButtonText}>START GAME</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

type RuleProps = {
  number: string;
  title: string;
  text: string;
};

function Rule({ number, title, text }: RuleProps) {
  return (
    <View style={styles.ruleRow}>
      <View style={styles.ruleNumber}>
        <Text style={styles.ruleNumberText}>{number}</Text>
      </View>

      <View style={styles.ruleTextContainer}>
        <Text style={styles.ruleTitle}>{title}</Text>

        <Text style={styles.ruleDescription}>{text}</Text>
      </View>
    </View>
  );
}
