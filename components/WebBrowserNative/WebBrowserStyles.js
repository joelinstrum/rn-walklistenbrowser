import { StyleSheet } from "react-native";
import { getSize } from "../../lib/utils/helpers";

const { width, height } = getSize();
const bottomHeight = 200;

const styles = StyleSheet.create({
  defaultStyle: {
    width: width - 10,
    maxHeight: height - bottomHeight,
    height: height - bottomHeight,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 1)",
    padding: 0,
    position: "relative",
    top: 110,
    left: 5,
    zIndex: 5,
  },
  overlay: {
    position: "absolute",
    top: 110,
    left: 5,
    width: width - 10,
    height: height - bottomHeight,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, .25)",
    backgroundColor: "#000",
    opacity: 0.35,
  },
  buttonContainer: {
    position: "absolute",
    top: height - bottomHeight / 3,
    left: 80,
  },
});

export default styles;
