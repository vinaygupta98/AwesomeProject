import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Complete from "./Complete";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <Complete />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10395E",
    alignItems: "center",
    justifyContent: "center",
  },
});
