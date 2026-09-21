import { StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.paper,
    overflow: "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 25,
    paddingBottom: 20,
  },

  // BAUHAUS SHAPES

  redRectangle: {
    position: "absolute",
    width: 115,
    height: 48,
    backgroundColor: COLORS.red,
    right: -28,
    top: 42,
    transform: [{ rotate: "-12deg" }],
  },

  blueCircle: {
    position: "absolute",
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: COLORS.blue,
    left: -48,
    bottom: 35,
  },

  yellowSquare: {
    position: "absolute",
    width: 48,
    height: 48,
    backgroundColor: COLORS.yellow,
    right: 18,
    bottom: 90,
    transform: [{ rotate: "18deg" }],
  },

  // LOGO

  logoSection: {
    marginTop: 35,
    marginBottom: 38,
  },

  miniGrid: {
    width: 72,
    height: 72,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 4,
    borderColor: COLORS.black,
    marginBottom: 18,
  },

  gridCell: {
    width: "33.333%",
    height: "33.333%",
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

  gridCellRed: {
    backgroundColor: COLORS.red,
  },

  gridCellBlue: {
    backgroundColor: COLORS.blue,
  },

  gridNumber: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },

  logoTextContainer: {
    alignItems: "flex-start",
  },

  logo: {
    fontSize: 53,
    lineHeight: 58,
    fontWeight: "900",
    letterSpacing: -3,
    color: COLORS.black,
  },

  logoUnderline: {
    width: 95,
    height: 8,
    backgroundColor: COLORS.yellow,
    marginTop: 8,
    marginBottom: 10,
  },

  logoSub: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.5,
    color: COLORS.black,
  },

  // MENU

  menu: {
    gap: 15,
  },

  button: {
    height: 64,
    borderWidth: 4,
    borderColor: COLORS.black,
    justifyContent: "center",
    paddingHorizontal: 20,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },

  buttonText: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // FOOTER

  bottom: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
  },

  numberBox: {
    width: 43,
    height: 43,
    backgroundColor: COLORS.blue,
    borderWidth: 3,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

  numberBoxRed: {
    width: 43,
    height: 43,
    backgroundColor: COLORS.red,
    borderWidth: 3,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },

  number: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
  },

  bottomText: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 2,
    color: COLORS.black,
  },
});

export default styles;
