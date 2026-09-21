import { StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";

const styles = StyleSheet.create({
  // =====================================
  // GAME
  // =====================================

  gameSafeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  gameContainer: {
    flex: 1,
    backgroundColor: COLORS.paper,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },

  // =====================================
  // HEADER
  // =====================================

  gameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  exitButton: {
    height: 32,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  exitButtonText: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.black,
  },

  gameSmallTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -1,
    color: COLORS.black,
  },

  difficultyText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 2,
    color: COLORS.red,
  },

  timerBox: {
    backgroundColor: COLORS.black,
    borderWidth: 3,
    borderColor: COLORS.black,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 90,
  },

  timerLabel: {
    color: COLORS.yellow,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 2,
  },

  timerText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // =====================================
  // INFO
  // =====================================

  gameInfo: {
    flexDirection: "row",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: 8,
    marginBottom: 14,
  },

  infoBlock: {
    flex: 1,
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: COLORS.black,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
    color: COLORS.black,
  },

  // =====================================
  // BOARD
  // =====================================

  boardWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  board: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: 390,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 4,
    borderColor: COLORS.black,
    backgroundColor: COLORS.paper,
  },

  cell: {
    width: "11.111%",
    height: "11.111%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },

  leftBoxBorder: {
    borderLeftWidth: 3,
  },

  topBoxBorder: {
    borderTopWidth: 3,
  },

  rightBoxBorder: {
    borderRightWidth: 3,
  },

  bottomBoxBorder: {
    borderBottomWidth: 3,
  },

  selectedCell: {
    backgroundColor: COLORS.yellow,
  },

  cellNumber: {
    fontSize: 22,
    fontWeight: "700",
  },

  givenNumber: {
    fontWeight: "900",
  },

  userNumber: {
    fontWeight: "700",
    fontStyle: "italic",
  },

  wrongNumber: {
    color: COLORS.red,
    fontStyle: "normal",
  },

  // =====================================
  // NUMBER PAD
  // =====================================

  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    marginTop: 15,
  },

  numberButton: {
    width: 50,
    height: 45,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

  numberButtonPressed: {
    backgroundColor: COLORS.yellow,
    transform: [
      {
        translateY: 3,
      },
    ],
  },

  numberButtonText: {
    fontSize: 20,
    fontWeight: "900",
  },

  // =====================================
  // STATUS
  // =====================================

  statusBar: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  warningText: {
    color: COLORS.red,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
  },

  flipWarningBanner: {
    position: "absolute",
    top: 6,
    alignSelf: "center",
    backgroundColor: COLORS.black,
    borderWidth: 3,
    borderColor: COLORS.yellow,
    paddingHorizontal: 14,
    paddingVertical: 8,
    zIndex: 10,
  },

  flipWarningText: {
    color: COLORS.yellow,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  // =====================================
  // MODAL
  // =====================================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 17, 17, 0.72)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  rulesCard: {
    width: "100%",
    maxHeight: "88%",
    backgroundColor: COLORS.paper,
    borderWidth: 5,
    borderColor: COLORS.black,
    padding: 22,
    position: "relative",
  },

  rulesRedBlock: {
    position: "absolute",
    width: 70,
    height: 25,
    backgroundColor: COLORS.red,
    right: -5,
    top: -5,
    transform: [
      {
        rotate: "8deg",
      },
    ],
  },

  rulesTitle: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
    color: COLORS.black,
  },

  rulesHeading: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
    color: COLORS.blue,
    marginTop: 4,
    marginBottom: 18,
  },

  rulesContent: {
    paddingBottom: 10,
  },

  difficultyRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },

  difficultyButton: {
    flex: 1,
    height: 44,
    borderWidth: 3,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  difficultyButtonActive: {
    backgroundColor: COLORS.yellow,
  },

  difficultyButtonText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLORS.black,
  },

  ruleRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  ruleNumber: {
    width: 37,
    height: 37,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  ruleNumberText: {
    color: COLORS.yellow,
    fontSize: 11,
    fontWeight: "900",
  },

  ruleTextContainer: {
    flex: 1,
  },

  ruleTitle: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLORS.black,
    marginBottom: 3,
  },

  ruleDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.black,
  },

  startButton: {
    height: 58,
    backgroundColor: COLORS.red,
    borderWidth: 4,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },

  startButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
  },

  buttonPressed: {
    transform: [
      {
        translateY: 3,
      },
    ],
  },

  // =====================================
  // NAME / SCORE MODAL
  // =====================================

  nameCard: {
    width: "100%",
    backgroundColor: COLORS.paper,
    borderWidth: 5,
    borderColor: COLORS.black,
    padding: 24,
    position: "relative",
  },

  nameYellowBlock: {
    position: "absolute",
    width: 65,
    height: 65,
    backgroundColor: COLORS.yellow,
    right: -20,
    top: -20,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  finishedText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    color: COLORS.blue,
  },

  finishedTitle: {
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -2,
    color: COLORS.black,
    marginTop: 4,
    marginBottom: 22,
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: 12,
    marginBottom: 22,
  },

  resultLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
    color: COLORS.black,
  },

  resultValue: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.red,
    marginTop: 3,
  },

  nameLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 7,
  },

  nameInput: {
    height: 55,
    borderWidth: 4,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.black,
    marginBottom: 14,
  },

  saveButton: {
    height: 57,
    backgroundColor: COLORS.blue,
    borderWidth: 4,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },

  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // =====================================
  // GAME OVER MODAL
  // =====================================

  gameOverCard: {
    width: "100%",
    backgroundColor: COLORS.paper,
    borderWidth: 5,
    borderColor: COLORS.black,
    padding: 24,
    position: "relative",
  },

  gameOverRedBlock: {
    position: "absolute",
    width: 65,
    height: 65,
    backgroundColor: COLORS.red,
    right: -20,
    top: -20,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  gameOverTitle: {
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -2,
    color: COLORS.red,
    marginTop: 4,
    marginBottom: 22,
  },

  menuButton: {
    height: 57,
    backgroundColor: COLORS.black,
    borderWidth: 4,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },

  menuButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // =====================================
  // HIGH SCORES
  // =====================================

  scoresSafeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  scoresContainer: {
    flex: 1,
    backgroundColor: COLORS.paper,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  scoresHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  scoresTitle: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
    color: COLORS.black,
  },

  scoresEmptyText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.grey,
    marginTop: 30,
    textAlign: "center",
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: 12,
    gap: 10,
  },

  scoreRank: {
    width: 28,
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.red,
  },

  scoreName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.black,
  },

  scoreDifficulty: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLORS.blue,
    marginTop: 2,
  },

  scoreTime: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.black,
  },

  scoreMistakes: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.grey,
    marginTop: 2,
  },

  // =====================================
  // ABOUT
  // =====================================

  aboutCard: {
    borderWidth: 4,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    padding: 18,
    marginTop: 4,
    marginBottom: 24,
  },

  aboutHeading: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    color: COLORS.blue,
    marginBottom: 16,
  },

  aboutParagraph: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.black,
    marginBottom: 14,
  },

  aboutSignatureName: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.black,
    marginTop: 2,
  },

  aboutSignatureRole: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: COLORS.red,
    marginTop: 2,
  },
});

export default styles;
