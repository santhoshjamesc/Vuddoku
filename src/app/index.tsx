import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/colors";
import AboutScreen from "../screens/AboutScreen";
import HighScoresScreen from "../screens/HighScoresScreen";
import NewGameScreen from "../screens/NewGameScreen";
import { loadCurrentGame, SavedGame } from "../utils/gameStorage";
import { exitApp } from "../utils/exitApp";
import styles from "../styles/menuStyles";

type Screen = "menu" | "newGame" | "continue" | "highScores" | "about";

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
  const [savedGame, setSavedGame] = useState<SavedGame | null>(null);

  const checkSavedGame = useCallback(async () => {
    try {
      const game = await loadCurrentGame();
      setSavedGame(game);
      setHasSavedGame(!!game);
    } catch (error) {
      console.log("Failed to load saved game:", error);
      setSavedGame(null);
      setHasSavedGame(false);
    }
  }, []);

  const continueGame = async () => {
    try {
      const game = await loadCurrentGame();

      if (!game) {
        return;
      }

      setSavedGame(game);
      setScreen("continue");
    } catch (error) {
      console.log("Failed to continue game:", error);
    }
  };

  const newGame = () => {
    setScreen("newGame");
  };

  const highScores = () => {
    setScreen("highScores");
  };

  const about = () => {
    setScreen("about");
  };

  const settings = () => {
    Alert.alert("SETTINGS", "Settings are coming soon.");
  };

  const goToMenu = useCallback(() => {
    setScreen("menu");
    checkSavedGame();
  }, [checkSavedGame]);

  useEffect(() => {
    // Loads persisted state from AsyncStorage on mount - not derivable during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkSavedGame();
  }, [checkSavedGame]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (screen !== "menu") {
          goToMenu();
          return true;
        }

        return false;
      },
    );

    return () => subscription.remove();
  }, [screen, goToMenu]);

  /*
   * NEW GAME
   */
  if (screen === "newGame") {
    return <NewGameScreen onExit={goToMenu} />;
  }

  /*
   * CONTINUE
   */
  if (screen === "continue" && savedGame) {
    return <NewGameScreen initialGame={savedGame} onExit={goToMenu} />;
  }

  /*
   * HIGH SCORES
   */
  if (screen === "highScores") {
    return <HighScoresScreen onExit={goToMenu} />;
  }

  /*
   * ABOUT
   */
  if (screen === "about") {
    return <AboutScreen onExit={goToMenu} />;
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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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

            <MenuButton
              title="NEW GAME"
              color={COLORS.red}
              onPress={newGame}
            />

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

            <MenuButton
              title="ABOUT"
              color={COLORS.white}
              textColor={COLORS.black}
              onPress={about}
            />

            <MenuButton title="EXIT" color={COLORS.grey} onPress={exitApp} />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
