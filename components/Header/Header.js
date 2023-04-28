import { StyleSheet, View, Text, Image } from "react-native";
import { getSize } from "../../lib/utils/helpers";

const { width, height } = getSize();

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../assets/audio-browser-icon.png")}
        style={styles.headerImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.headerTextTitle}>Virtual Cover Browser</Text>
        <Text style={styles.headerSubtitle}>
          Prevents accidental clicks while listening with your phone in
          wallk-mode
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: width,
    height: 100,
    paddingTop: 30,
    top: 0,
    left: 0,
    backgroundColor: "#000",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  headerTextTitle: {
    fontSize: 18,
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#ddd",
  },
});

export default Header;
