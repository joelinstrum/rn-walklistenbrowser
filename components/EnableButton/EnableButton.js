import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import SlideButton from "rn-slide-button";

const EnableButton = ({ onSlideComplete, title }) => {
  const [enabled, setToggle] = useState(false);

  useEffect(() => {
    onSlideComplete(enabled);
  }, [enabled]);

  return (
    <SlideButton
      title={title}
      containerStyle={enabled ? styles.buttonActive : styles.buttonInactive}
      underlayStyle={enabled ? styles.underlayActive : styles.underlayInactive}
      width={300}
      onReachedToStart={() => setToggle(false)}
      onReachedToEnd={() => setToggle(true)}
      animation={true}
      titleStyle={enabled ? styles.titleActive : styles.titleInactive}
    />
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: "orange",
  },
  buttonInactive: {
    backgroundColor: "#dbd5ba",
    color: "#000",
  },
  underlayActive: {
    backgroundColor: "transparent",
  },
  underlayInactive: {
    backgroundColor: "#dbd5ba",
    color: "#000",
  },
  titleActive: {
    color: "#fff",
  },
  titleInactive: {
    color: "#333",
  },
});

export default EnableButton;
