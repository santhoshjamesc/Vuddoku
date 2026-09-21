import { Alert, BackHandler, Platform } from "react-native";

// Android allows a programmatic exit. iOS has no supported API for an app to
// quit itself (Apple guidelines forbid it), and "closing" a web tab can only
// be triggered by the user - so those platforms get an explanatory prompt.
export function exitApp(): void {
  if (Platform.OS === "android") {
    Alert.alert("EXIT VUDDOKU", "Are you sure you want to exit?", [
      { text: "CANCEL", style: "cancel" },
      {
        text: "EXIT",
        style: "destructive",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return;
  }

  if (Platform.OS === "web") {
    Alert.alert("EXIT VUDDOKU", "Close this browser tab to exit.");
    return;
  }

  Alert.alert("EXIT VUDDOKU", "Press the Home button to exit the app.");
}
