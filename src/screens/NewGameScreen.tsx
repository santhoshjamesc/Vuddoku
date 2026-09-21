import { useCallback, useEffect, useRef, useState } from "react";

import { Alert, BackHandler, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameOverModal from "../components/GameOverModal";
import GameRulesModal from "../components/GameRulesModal";
import NameModal from "../components/NameModal";

import { NUMBER_COLORS } from "../constants/colors";
import styles from "../styles/gameStyles";

import {
    Board,
    countFilledCells,
    generateSudoku,
    isBoardComplete,
    removeRandomUserNumber,
    setCellValue,
} from "../utils/sudoku";

import {
    deleteCurrentGame,
    saveCurrentGame,
    saveScore,
    SavedGame,
} from "../utils/gameStorage";

import { vibrateNumberVanish, warnBoardFlip } from "../utils/haptics";

export type DifficultyConfig = {
  name: string;

  puzzleRemoval: number;

  vanishEnabled: boolean;

  vanishStartPercent: number;

  vanishIntervalSeconds: number;

  vanishMinimumPercent: number;

  flipEnabled: boolean;

  flipIntervalSeconds: number;

  maxMistakes: number;
};

export type DifficultyKey = "easy" | "medium" | "hard";

export const DIFFICULTIES: Record<DifficultyKey, DifficultyConfig> = {
  easy: {
    name: "EASY",

    puzzleRemoval: 0.42,

    vanishEnabled: true,
    vanishStartPercent: 0.6,
    vanishIntervalSeconds: 60,
    vanishMinimumPercent: 0.6,

    flipEnabled: true,
    flipIntervalSeconds: 180,

    maxMistakes: 4,
  },

  medium: {
    name: "MEDIUM",

    puzzleRemoval: 0.48,

    vanishEnabled: true,
    vanishStartPercent: 0.6,
    vanishIntervalSeconds: 40,
    vanishMinimumPercent: 0.6,

    flipEnabled: true,
    flipIntervalSeconds: 120,

    maxMistakes: 4,
  },

  hard: {
    name: "HARD",

    puzzleRemoval: 0.52,

    vanishEnabled: true,
    vanishStartPercent: 0.6,
    vanishIntervalSeconds: 30,
    vanishMinimumPercent: 0.6,

    flipEnabled: true,
    flipIntervalSeconds: 90,

    maxMistakes: 4,
  },
};

type Props = {
  difficulty?: DifficultyKey;
  initialGame?: SavedGame;
  onExit: () => void;
};

export default function NewGameScreen({
  difficulty = "medium",
  initialGame,
  onExit,
}: Props) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyKey>(
    (initialGame?.difficulty as DifficultyKey) ?? difficulty,
  );

  const config = DIFFICULTIES[selectedDifficulty];

  const [board, setBoard] = useState<Board>(() =>
    initialGame ? initialGame.board : generateSudoku(config.puzzleRemoval),
  );

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [elapsedSeconds, setElapsedSeconds] = useState(
    initialGame?.elapsedSeconds ?? 0,
  );

  const [mistakes, setMistakes] = useState(initialGame?.mistakes ?? 0);

  const [showRules, setShowRules] = useState(!initialGame);

  const [showNameModal, setShowNameModal] = useState(false);

  const [gameStarted, setGameStarted] = useState(!!initialGame);

  const [flipped, setFlipped] = useState({
    horizontal: initialGame?.flippedHorizontal ?? false,
    vertical: initialGame?.flippedVertical ?? false,
  });

  const [flipWarningVisible, setFlipWarningVisible] = useState(false);

  const [flipCount, setFlipCount] = useState(initialGame?.flipCount ?? 0);

  const [wrongCell, setWrongCell] = useState<{
    row: number;
    col: number;
    value: number;
  } | null>(null);

  const lastFlipAt = useRef(initialGame?.lastFlipAt ?? 0);
  const lastVanishAt = useRef(0);
  const flipWarningTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const wrongCellTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gameOver = mistakes >= config.maxMistakes;

  const filledPercentage = countFilledCells(board) / 81;

  // ------------------------------------
  // START
  // ------------------------------------

  const startGame = useCallback(() => {
    setShowRules(false);
    setGameStarted(true);
  }, []);

  const handleSelectDifficulty = useCallback(
    (key: DifficultyKey) => {
      if (gameStarted) {
        return;
      }

      setSelectedDifficulty(key);
      setBoard(generateSudoku(DIFFICULTIES[key].puzzleRemoval));
      setSelectedCell(null);
    },
    [gameStarted],
  );

  // ------------------------------------
  // EXIT CONFIRMATION
  // ------------------------------------

  const confirmExit = useCallback(() => {
    if (!gameStarted || gameOver) {
      onExit();
      return;
    }

    Alert.alert(
      "LEAVE GAME?",
      "Your progress is saved, but the timer and board effects will stop for now.",
      [
        { text: "CANCEL", style: "cancel" },
        { text: "LEAVE", style: "destructive", onPress: onExit },
      ],
    );
  }, [gameStarted, gameOver, onExit]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        confirmExit();
        return true;
      },
    );

    return () => subscription.remove();
  }, [confirmExit]);

  // ------------------------------------
  // TIMER
  // ------------------------------------

  useEffect(() => {
    if (!gameStarted || gameOver || showNameModal) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, showNameModal]);

  // ------------------------------------
  // VANISH NUMBERS
  // ------------------------------------

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    if (!config.vanishEnabled) {
      return;
    }

    if (filledPercentage < config.vanishStartPercent) {
      return;
    }

    if (filledPercentage <= config.vanishMinimumPercent) {
      return;
    }

    if (
      elapsedSeconds === 0 ||
      elapsedSeconds % config.vanishIntervalSeconds !== 0
    ) {
      return;
    }

    if (lastVanishAt.current === elapsedSeconds) {
      return;
    }

    lastVanishAt.current = elapsedSeconds;

    setBoard((previousBoard) => {
      const beforeCount = countFilledCells(previousBoard);

      if (beforeCount / 81 <= config.vanishMinimumPercent) {
        return previousBoard;
      }

      const nextBoard = removeRandomUserNumber(previousBoard);

      if (countFilledCells(nextBoard) < beforeCount) {
        vibrateNumberVanish();
      }

      return nextBoard;
    });
  }, [elapsedSeconds, filledPercentage, gameStarted, gameOver, config]);

  // ------------------------------------
  // BOARD FLIPPING
  // ------------------------------------

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    if (!config.flipEnabled) {
      return;
    }

    if (
      elapsedSeconds === 0 ||
      elapsedSeconds % config.flipIntervalSeconds !== 0
    ) {
      return;
    }

    if (lastFlipAt.current === elapsedSeconds) {
      return;
    }

    lastFlipAt.current = elapsedSeconds;

    const axis = Math.random() > 0.5 ? "horizontal" : "vertical";

    setFlipped((previous) => ({
      ...previous,
      [axis]: !previous[axis],
    }));

    setFlipCount((previous) => previous + 1);

    warnBoardFlip();

    setFlipWarningVisible(true);

    if (flipWarningTimeout.current) {
      clearTimeout(flipWarningTimeout.current);
    }

    flipWarningTimeout.current = setTimeout(() => {
      setFlipWarningVisible(false);
    }, 2600);
  }, [elapsedSeconds, gameStarted, gameOver, config]);

  useEffect(() => {
    return () => {
      if (flipWarningTimeout.current) {
        clearTimeout(flipWarningTimeout.current);
      }

      if (wrongCellTimeout.current) {
        clearTimeout(wrongCellTimeout.current);
      }
    };
  }, []);

  // ------------------------------------
  // SAVE CURRENT GAME
  // ------------------------------------

  useEffect(() => {
    if (!gameStarted || gameOver || showNameModal) {
      return;
    }

    const saveTimer = setTimeout(() => {
      saveCurrentGame({
        board,
        elapsedSeconds,
        mistakes,
        lastFlipAt: lastFlipAt.current,
        flipCount,
        flippedHorizontal: flipped.horizontal,
        flippedVertical: flipped.vertical,
        difficulty: selectedDifficulty,
      });
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [
    board,
    elapsedSeconds,
    mistakes,
    flipCount,
    flipped,
    selectedDifficulty,
    gameStarted,
    gameOver,
    showNameModal,
  ]);

  // ------------------------------------
  // GAME OVER CLEANUP
  // ------------------------------------

  useEffect(() => {
    if (gameOver) {
      deleteCurrentGame();
    }
  }, [gameOver]);

  // ------------------------------------
  // NUMBER INPUT
  // ------------------------------------

  const handleNumberPress = (number: number) => {
    if (!selectedCell || gameOver) {
      return;
    }

    const { row, col } = selectedCell;

    const cell = board[row][col];

    if (cell.given) {
      return;
    }

    if (number !== cell.solution) {
      const nextMistakes = mistakes + 1;

      setMistakes(nextMistakes);

      setWrongCell({ row, col, value: number });

      if (wrongCellTimeout.current) {
        clearTimeout(wrongCellTimeout.current);
      }

      wrongCellTimeout.current = setTimeout(() => {
        setWrongCell(null);
      }, 700);

      return;
    }

    const nextBoard = setCellValue(board, row, col, number);

    setBoard(nextBoard);

    if (isBoardComplete(nextBoard)) {
      finishGame(nextBoard);
    }
  };

  // ------------------------------------
  // FINISH
  // ------------------------------------

  const finishGame = (completedBoard: Board) => {
    setBoard(completedBoard);
    setGameStarted(false);
    setShowNameModal(true);

    deleteCurrentGame();
  };

  const handleSaveScore = async (name: string) => {
    await saveScore({
      id: `${Date.now()}`,
      name,
      time: elapsedSeconds,
      mistakes,
      difficulty: config.name,
      date: new Date().toISOString(),
    });

    setShowNameModal(false);
    onExit();
  };

  // ------------------------------------
  // FORMAT TIME
  // ------------------------------------

  const minutes = Math.floor(elapsedSeconds / 60);

  const seconds = elapsedSeconds % 60;

  const formattedTime =
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}`;

  // ------------------------------------
  // BOARD COORDINATES
  // ------------------------------------

  const getVisualPosition = (row: number, col: number) => {
    const visualRow = flipped.vertical ? 8 - row : row;
    const visualCol = flipped.horizontal ? 8 - col : col;

    return {
      row: visualRow,
      col: visualCol,
    };
  };

  const cells = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push({
        row,
        col,
        cell: board[row][col],
      });
    }
  }

  return (
    <SafeAreaView style={styles.gameSafeArea}>
      <View style={styles.gameContainer}>
        {/* -------------------------------- */}
        {/* FLIP WARNING */}
        {/* -------------------------------- */}

        {flipWarningVisible && (
          <View style={styles.flipWarningBanner}>
            <Text style={styles.flipWarningText}>⚠ BOARD FLIPPED!</Text>
          </View>
        )}

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <View style={styles.gameHeader}>
          <View style={styles.headerLeft}>
            <Pressable
              onPress={confirmExit}
              hitSlop={10}
              style={styles.exitButton}
            >
              <Text style={styles.exitButtonText}>‹ MENU</Text>
            </Pressable>

            <View>
              <Text style={styles.gameSmallTitle}>VUDDOKU</Text>

              <Text style={styles.difficultyText}>{config.name}</Text>
            </View>
          </View>

          <View style={styles.timerBox}>
            <Text style={styles.timerLabel}>TIME</Text>

            <Text style={styles.timerText}>{formattedTime}</Text>
          </View>
        </View>

        {/* -------------------------------- */}
        {/* GAME INFO */}
        {/* -------------------------------- */}

        <View style={styles.gameInfo}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>MISTAKES</Text>

            <Text style={styles.infoValue}>
              {mistakes}/{config.maxMistakes}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>FILLED</Text>

            <Text style={styles.infoValue}>
              {Math.round(filledPercentage * 100)}%
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>FLIPS</Text>

            <Text style={styles.infoValue}>{flipCount}</Text>
          </View>
        </View>

        {/* -------------------------------- */}
        {/* SUDOKU BOARD */}
        {/* -------------------------------- */}

        <View style={styles.boardWrapper}>
          <View style={styles.board}>
            {cells.map(({ row, col, cell }) => {
              const position = getVisualPosition(row, col);

              const selected =
                selectedCell?.row === row && selectedCell?.col === col;

              const isWrongPreview =
                wrongCell?.row === row && wrongCell?.col === col;

              const displayValue = isWrongPreview
                ? wrongCell.value
                : cell.value;

              return (
                <Pressable
                  key={`${row}-${col}`}
                  onPress={() =>
                    setSelectedCell({
                      row,
                      col,
                    })
                  }
                  style={[
                    styles.cell,
                    position.col % 3 === 0 && styles.leftBoxBorder,
                    position.row % 3 === 0 && styles.topBoxBorder,
                    position.col === 8 && styles.rightBoxBorder,
                    position.row === 8 && styles.bottomBoxBorder,
                    selected && styles.selectedCell,
                  ]}
                >
                  {displayValue !== 0 && (
                    <Text
                      style={[
                        styles.cellNumber,
                        { color: NUMBER_COLORS[displayValue] },
                        cell.given && styles.givenNumber,
                        cell.userFilled && styles.userNumber,
                        isWrongPreview && styles.wrongNumber,
                      ]}
                    >
                      {displayValue}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* -------------------------------- */}
        {/* NUMBER PAD */}
        {/* -------------------------------- */}

        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <Pressable
              key={number}
              onPress={() => handleNumberPress(number)}
              style={({ pressed }) => [
                styles.numberButton,
                pressed && styles.numberButtonPressed,
              ]}
            >
              <Text
                style={[
                  styles.numberButtonText,
                  { color: NUMBER_COLORS[number] },
                ]}
              >
                {number}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* -------------------------------- */}
        {/* STATUS */}
        {/* -------------------------------- */}

        <View style={styles.statusBar}>
          {filledPercentage >= config.vanishStartPercent && (
            <Text style={styles.warningText}>NUMBERS CAN VANISH</Text>
          )}
        </View>

        {/* -------------------------------- */}
        {/* RULES */}
        {/* -------------------------------- */}

        <GameRulesModal
          visible={showRules}
          difficulty={selectedDifficulty}
          onSelectDifficulty={handleSelectDifficulty}
          onStart={startGame}
        />

        {/* -------------------------------- */}
        {/* SCORE NAME */}
        {/* -------------------------------- */}

        <NameModal
          visible={showNameModal}
          time={elapsedSeconds}
          mistakes={mistakes}
          maxMistakes={config.maxMistakes}
          onSave={handleSaveScore}
        />

        {/* -------------------------------- */}
        {/* GAME OVER */}
        {/* -------------------------------- */}

        <GameOverModal
          visible={gameOver}
          maxMistakes={config.maxMistakes}
          onExit={onExit}
        />
      </View>
    </SafeAreaView>
  );
}
