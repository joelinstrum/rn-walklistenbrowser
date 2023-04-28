import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { getSize } from "../../lib/utils/helpers";

const { width, height } = getSize();

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
    height: 65,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    position: "absolute",
    top: height - 120,
    zIndex: 25,
    width: width,
  },
  icon: {
    fontSize: 50,
    color: "#fff",
  },
});

export default WebBrowserNav;
