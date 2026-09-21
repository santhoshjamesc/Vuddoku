import { Modal, Pressable, Text, View } from "react-native";

import styles from "../styles/gameStyles";

type Props = {
  visible: boolean;
  maxMistakes: number;
  onExit: () => void;
};

export default function GameOverModal({ visible, maxMistakes, onExit }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.gameOverCard}>
          <View style={styles.gameOverRedBlock} />

          <Text style={styles.finishedText}>GAME OVER</Text>

          <Text style={styles.gameOverTitle}>OUT OF LIVES.</Text>

          <View style={styles.resultRow}>
            <View>
              <Text style={styles.resultLabel}>MISTAKES</Text>

              <Text style={styles.resultValue}>
                {maxMistakes}/{maxMistakes}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onExit}
            style={({ pressed }) => [
              styles.menuButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.menuButtonText}>BACK TO MENU</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
