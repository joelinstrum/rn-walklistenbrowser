import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Header, WebBrowserNative } from "./components";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1 }}>
          <LinearGradient colors={["#8e2de2", "#4a00e0"]} style={{ flex: 1 }}>
            <Header />
            <WebBrowserNative />
            <StatusBar style="auto" />
          </LinearGradient>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
});
