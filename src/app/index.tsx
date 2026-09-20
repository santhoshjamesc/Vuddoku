import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StatusBar, Text, View } from "react-native";

import NewGameScreen from "../screens/NewGameScreen";
import { loadCurrentGame } from "../utils/gameStorage";
import styles from "./styles";

const COLORS = {
  paper: "#F2E8D5",
  black: "#111111",
  red: "#D7262E",
  blue: "#1746D1",
  yellow: "#F4C430",
  white: "#FFFFFF",
};

type Screen = "menu" | "newGame" | "continue";

type MenuButtonProps = {
  title: string;
  color: string;
  textColor?: string;
  onPress: () => void;
  disabled?: boolean;
};

const MenuButton = ({
  title,
  color,
  textColor = COLORS.white,
  onPress,
  disabled = false,
}: MenuButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled ? "#B8B0A2" : color,
          transform: [{ translateY: pressed && !disabled ? 5 : 0 }],
          opacity: disabled ? 0.55 : 1,
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

const MiniGrid = () => {
  return (
    <View style={styles.miniGrid}>
      {Array.from({ length: 9 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.gridCell,
            index === 4 && styles.gridCellRed,
            index === 7 && styles.gridCellBlue,
          ]}
        >
          {index === 4 && <Text style={styles.gridNumber}>9</Text>}
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    checkSavedGame();
  }, []);

  const checkSavedGame = async () => {
    try {
      const savedGame = await loadCurrentGame();
      setHasSavedGame(!!savedGame);
    } catch (error) {
      console.log("Failed to load saved game:", error);
      setHasSavedGame(false);
    }
  };

  const continueGame = async () => {
    try {
      const savedGame = await loadCurrentGame();

      if (!savedGame) {
        return;
      }

      setScreen("continue");
    } catch (error) {
      console.log("Failed to continue game:", error);
    }
  };

  const newGame = () => {
    setScreen("newGame");
  };

  const highScores = () => {
    console.log("High Scores");
  };

  const settings = () => {
    console.log("Settings");
  };

  const goToMenu = () => {
    setScreen("menu");
    checkSavedGame();
  };

  /*
   * NEW GAME
   */
  if (screen === "newGame") {
    return <NewGameScreen onExit={goToMenu} />;
  }

  /*
   * CONTINUE
   *
   * The NewGameScreen should receive the saved game here.
   * If your current NewGameScreen does not yet support
   * `initialGame`, add that prop to it.
   */
  if (screen === "continue") {
    return <NewGameScreen initialGame={undefined} onExit={goToMenu} />;
  }

  /*
   * MAIN MENU
   */
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.paper} />

      <View style={styles.container}>
        {/* Bauhaus shapes */}
        <View style={styles.redRectangle} />
        <View style={styles.blueCircle} />
        <View style={styles.yellowSquare} />

        {/* Logo */}
        <View style={styles.logoSection}>
          <MiniGrid />

          <View style={styles.logoTextContainer}>
            <Text style={styles.logo}>VUDDOKU</Text>

            <View style={styles.logoUnderline} />

            <Text style={styles.logoSub}>LOGIC / ORDER / PLAY</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          <MenuButton
            title="CONTINUE"
            color={COLORS.blue}
            onPress={continueGame}
            disabled={!hasSavedGame}
          />

          <MenuButton title="NEW GAME" color={COLORS.red} onPress={newGame} />

          <MenuButton
            title="HIGH SCORES"
            color={COLORS.yellow}
            textColor={COLORS.black}
            onPress={highScores}
          />

          <MenuButton
            title="SETTINGS"
            color={COLORS.black}
            onPress={settings}
          />
        </View>

        {/* Footer */}
        <View style={styles.bottom}>
          <View style={styles.numberBox}>
            <Text style={styles.number}>9</Text>
          </View>

          <Text style={styles.bottomText}>
            ONE GRID{"\n"}
            NINE NUMBERS
          </Text>

          <View style={styles.numberBoxRed}>
            <Text style={styles.number}>81</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
