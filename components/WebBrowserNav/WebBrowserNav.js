import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const WebBrowserNav = ({
  webViewgoback,
  webViewNext,
  webViewHome,
  webSettings,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity onPress={webViewgoback}>
        <AntDesign name="caretleft" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={webViewHome}>
        <Entypo name="home" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={webSettings}>
        <AntDesign name="setting" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={webViewNext}>
        <AntDesign name="caretright" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "#000",
    height: 56,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 50,
    color: "#fff",
  },
});

export default WebBrowserNav;
