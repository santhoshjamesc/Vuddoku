import { useCallback, useEffect, useRef, useState } from "react";

import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";

import GameRulesModal from "../components/GameRulesModal";
import NameModal from "../components/NameModal";

import styles from "../styles/gameStyles";

import {
    Board,
    countFilledCells,
    countUserFilledCells,
    generateSudoku,
    isBoardComplete,
    removeRandomUserNumber,
    setCellValue,
} from "../utils/sudoku";

import {
    deleteCurrentGame,
    saveCurrentGame,
    saveScore,
} from "../utils/gameStorage";

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

export const DIFFICULTIES: Record<string, DifficultyConfig> = {
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
  difficulty?: keyof typeof DIFFICULTIES;
};

type FlipDirection = "none" | "horizontal" | "vertical";

export default function NewGameScreen({ difficulty = "medium" }: Props) {
  const config = DIFFICULTIES[difficulty];

  const [board, setBoard] = useState<Board>(() =>
    generateSudoku(config.puzzleRemoval),
  );

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [mistakes, setMistakes] = useState(0);

  const [showRules, setShowRules] = useState(true);

  const [showNameModal, setShowNameModal] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);

  const [flipDirection, setFlipDirection] = useState<FlipDirection>("none");

  const [flipCount, setFlipCount] = useState(0);

  const lastFlipAt = useRef(0);

  const gameOver = mistakes >= config.maxMistakes;

  const filledPercentage = countFilledCells(board) / 81;

  const userFilledPercentage = countUserFilledCells(board) / 81;

  // ------------------------------------
  // START
  // ------------------------------------

  const startGame = useCallback(() => {
    setShowRules(false);
    setGameStarted(true);
  }, []);

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

    setBoard((previousBoard: any) => {
      const currentPercentage = countFilledCells(previousBoard) / 81;

      if (currentPercentage <= config.vanishMinimumPercent) {
        return previousBoard;
      }

      return removeRandomUserNumber(previousBoard);
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

    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

    setFlipDirection(direction);
    setFlipCount((previous) => previous + 1);
  }, [elapsedSeconds, gameStarted, gameOver, config]);

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
        difficulty,
      });
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [
    board,
    elapsedSeconds,
    mistakes,
    flipCount,
    difficulty,
    gameStarted,
    gameOver,
    showNameModal,
  ]);

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

      if (nextMistakes >= config.maxMistakes) {
        Alert.alert("GAME OVER", "You used all 4 mistakes.");
      }

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
    let visualRow = row;
    let visualCol = col;

    if (flipDirection === "vertical") {
      visualRow = 8 - row;
    }

    if (flipDirection === "horizontal") {
      visualCol = 8 - col;
    }

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
        {/* HEADER */}
        {/* -------------------------------- */}

        <View style={styles.gameHeader}>
          <View>
            <Text style={styles.gameSmallTitle}>VUDDOKU</Text>

            <Text style={styles.difficultyText}>{config.name}</Text>
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

              const isRed =
                !cell.given && cell.value !== 0 && cell.value !== cell.solution;

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
                  {cell.value !== 0 && (
                    <Text
                      style={[
                        styles.cellNumber,
                        cell.given && styles.givenNumber,
                        cell.userFilled && styles.userNumber,
                        isRed && styles.wrongNumber,
                      ]}
                    >
                      {cell.value}
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
              <Text style={styles.numberButtonText}>{number}</Text>
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

          {flipDirection !== "none" && (
            <Text style={styles.flipText}>BOARD FLIPPED</Text>
          )}
        </View>

        {/* -------------------------------- */}
        {/* RULES */}
        {/* -------------------------------- */}

        <GameRulesModal visible={showRules} onStart={startGame} />

        {/* -------------------------------- */}
        {/* SCORE NAME */}
        {/* -------------------------------- */}

        <NameModal
          visible={showNameModal}
          time={elapsedSeconds}
          mistakes={mistakes}
          onSave={handleSaveScore}
        />
      </View>
    </SafeAreaView>
  );
}
