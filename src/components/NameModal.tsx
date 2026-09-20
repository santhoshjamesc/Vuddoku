import { useState } from "react";

import { Modal, Pressable, Text, TextInput, View } from "react-native";

import styles from "../styles/gameStyles";

type Props = {
  visible: boolean;
  time: number;
  mistakes: number;
  onSave: (name: string) => void;
};

export default function NameModal({ visible, time, mistakes, onSave }: Props) {
  const [name, setName] = useState("");

  const handleSave = () => {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    onSave(cleanName);
    setName("");
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.nameCard}>
          <View style={styles.nameYellowBlock} />

          <Text style={styles.finishedText}>GRID COMPLETE</Text>

          <Text style={styles.finishedTitle}>WELL DONE.</Text>

          <View style={styles.resultRow}>
            <View>
              <Text style={styles.resultLabel}>TIME</Text>

              <Text style={styles.resultValue}>
                {minutes}:{seconds.toString().padStart(2, "0")}
              </Text>
            </View>

            <View>
              <Text style={styles.resultLabel}>MISTAKES</Text>

              <Text style={styles.resultValue}>{mistakes}/4</Text>
            </View>
          </View>

          <Text style={styles.nameLabel}>ENTER YOUR NAME</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="PLAYER"
            placeholderTextColor="#777"
            maxLength={16}
            autoCapitalize="characters"
            style={styles.nameInput}
          />

          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.saveButtonText}>SAVE SCORE</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
