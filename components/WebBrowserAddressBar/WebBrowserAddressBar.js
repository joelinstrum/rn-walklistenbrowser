import React, { useRef, useEffect } from "react";
import { getSize } from "../../lib/utils/helpers";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
} from "react-native";

const { width } = getSize();

const WebBrowserAddressBar = ({ url, updateUrl, textOnChange, reset }) => {
  const [text, setText] = React.useState(url);
  const textRef = useRef(null);

  const onChangeText = (newText) => {
    setText(newText);
    if (textOnChange) {
      textOnChange(newText);
    }
  };

  useEffect(() => {
    setText(url);
  }, [reset]);

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangeText(newText)}
          value={text}
          selectionColor="#aaa"
          selectionTextColor="#fff"
          cursorColor="#000066"
          returnKeyType="go"
          onSubmitEditing={() => updateUrl(text)}
          selectTextOnFocus
          ref={textRef}
          textContentType="URL"
          accessibilityLabel="url"
        />
        <Pressable style={styles.button} onTouchEnd={() => updateUrl(text)}>
          <Text style={styles.text}>Go</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 1,
    width: width - 45,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    border: 2,
    borderColor: "blue",
    height: 100,
    width: width,
  },
  view: {
    display: "flex",
    width: width,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    elevation: 3,
    backgroundColor: "#333",
    width: 42,
    height: 42,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default WebBrowserAddressBar;
