import { useState, useEffect } from "react";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";
import { getSize } from "../../lib/utils/helpers";
import { useBrowserSettings } from "../../lib/hooks";

const { width, height } = getSize();

const WebBrowserSettings = ({ showSettings, updateDisplaySettings }) => {
  const display = !!showSettings;
  const [settings, setSettings] = useState({});
  const [uneditedSettings, setUneditedSettings] = useState();
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const { getSettings, saveSettings } = useBrowserSettings();
  const [message, setMessage] = useState("");

  const onPressSave = async () => {
    setMessage("updating...");
    await saveSettings(settings);
    setUneditedSettings(settings);
    setMessage("Settings updated");
    setSaveButtonEnabled(false);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const onPressClose = () => {
    updateDisplaySettings();
  };

  const updateHomepage = (newValue) => {
    setSettings({ ...settings, homePage: newValue });
  };

  useEffect(() => {
    const initSettings = async () => {
      const currentSettings = await getSettings();
      setSettings(currentSettings);
      setUneditedSettings(currentSettings);
    };
    initSettings();
  }, []);

  useEffect(() => {
    if (uneditedSettings) {
      if (uneditedSettings?.homePage !== settings?.homePage) {
        setSaveButtonEnabled(true);
      } else {
        setSaveButtonEnabled(false);
      }
    }
  }, [uneditedSettings, settings]);

  return (
    <View
      style={[
        styles.container,
        display ? styles.showContainer : styles.hideContainer,
      ]}
    >
      <Text style={styles.title}>Browser Settings</Text>
      <View>
        <Text>Home page:</Text>
        <TextInput
          placeholder="Your preferred home page"
          value={settings?.homePage || "https://fubar.com"}
          style={styles.input}
          onChangeText={updateHomepage}
        />
      </View>

      <View>
        <Text style={styles.msgText}>{message}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.saveButton,
            saveButtonEnabled
              ? styles.saveButtonEnabled
              : styles.saveButtonDisabled,
          ]}
          onPress={saveButtonEnabled ? onPressSave : () => {}}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.closeButton} onPress={onPressClose}>
          <Text style={styles.closeButtonText}>Close</Text>
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
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#ccc",
    height: 40,
    padding: 3,
    marginBottom: 5,
    width: 300,
  },
  showContainer: {
    opacity: 1,
    top: 0,
    zIndex: 20,
  },
  hideContainer: {
    opacity: 0,
    top: -10000,
    zIndex: 0,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: width - 10,
  },
  saveButton: {
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginRight: 10,
  },
  saveButtonEnabled: {
    backgroundColor: "#008000",
  },
  saveButtonDisabled: {
    backgroundColor: "#7e947e",
  },
  closeButton: {
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "orange",
  },
  saveButtonText: {
    color: "#fff",
  },
  closeButtonText: {
    color: "#fff",
  },
  msgText: {
    height: 40,
    fontSize: 20,
  },
  title: {
    height: 40,
  },
});

export default WebBrowserSettings;
