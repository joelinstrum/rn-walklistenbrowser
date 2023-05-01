import { StyleSheet } from "react-native";
import { getSize } from "../../lib/utils/helpers";

const { width, height } = getSize();
const bottomHeight = 200;

const styles = StyleSheet.create({
  defaultStyle: {
    width: width,
    height: height,
    borderWidth: 0,
    padding: 0,
    position: "relative",
    top: 100,
    left: 0,
    zIndex: 5,
  },
  overlay: {
    position: "absolute",
    top: 100,
    left: 0,
    width: width,
    height: height,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, .25)",
    backgroundColor: "#000",
  },
  overlayDark: {
    opacity: 8,
  },
  overlayLight: {
    opacity: 0,
  },
  buttonContainer: {
    position: "absolute",
    top: height - bottomHeight / 1.8,
    left: 80,
    zIndex: 30,
  },
});

export default styles;
