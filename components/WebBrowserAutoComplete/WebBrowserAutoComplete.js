import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { getSize } from "../../lib/utils/helpers";
import { useBrowserHistory } from "../../lib/hooks";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width, height } = getSize();

const WebBrowserAutoComplete = ({ show, text, onSelect, onCancel }) => {
  const display = !!show;
  const [urlsMatched, setUrlsMatched] = useState([]);
  const { matchUrlWithHistory, deleteUrlFromHistory } = useBrowserHistory();

  useEffect(() => {
    if (text) {
      const getUrls = async () => {
        const urls = await matchUrlWithHistory(text);
        setUrlsMatched(urls);
      };
      getUrls();
    }
  }, [text]);

  const deleteItem = (url, index) => {
    deleteUrlFromHistory(url);
    const updatedUrls = [...urlsMatched];
    updatedUrls.splice(index, 1);
    setUrlsMatched(updatedUrls);
  };

  return (
    <View
      style={[
        styles.container,
        display ? styles.showContainer : styles.hideContainer,
      ]}
    >
      {!!urlsMatched && urlsMatched.length
        ? urlsMatched.map((url, index) => (
            <View key={url} style={styles.resultTextContainer}>
              <Pressable onPress={() => onSelect(url)}>
                <Text style={styles.left}>{url}</Text>
              </Pressable>
              <Pressable onPress={() => deleteItem(url, index)}>
                <View style={styles.right}>
                  <AntDesign name="close" />
                </View>
              </Pressable>
            </View>
          ))
        : null}
      <View style={styles.closeContainer}>
        <Pressable onPress={onCancel}>
          <Text>CLOSE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    width: width - 20,
    backgroundColor: "#fff",
    minWidth: width - 10,
    minHeight: 50,
    height: height,
    padding: 5,
    borderColor: "red",
    borderSize: 10,
  },
  showContainer: {
    opacity: 1,
    top: 50,
    zIndex: 20,
  },
  hideContainer: {
    opacity: 0,
    top: -10000,
    zIndex: 0,
  },
  resultTextContainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: width - 10,
  },
  left: {
    backgroundColor: "#b6d1fc",
    width: width - 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    paddingLeft: 5,
    marginRight: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  right: {
    width: 30,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 20,
    marginTop: -4,
  },
  closeContainer: {
    position: "absolute",
    top: 450,
    height: 50,
    width: width,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dedede",
    color: "#333",
  },
});

export default WebBrowserAutoComplete;
