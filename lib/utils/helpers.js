import { Dimensions } from "react-native";

export const getSize = () => {
  return {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };
};

export const getCurrentTimestamp = () => {
  return Date.now();
};
