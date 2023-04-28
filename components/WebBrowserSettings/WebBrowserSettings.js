import { useState, useEffect } from "react";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";
import CheckBox from "expo-checkbox";
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

  const onPressCheckbox = (toggled) => {
    setSettings({ ...settings, showSlider: toggled });
  };

  const updateHomepage = (newValue) => {
    setSettings({ ...settings, homePage: newValue });
  };

  useEffect(() => {
    const initSettings = async () => {
      const currentSettings = await getSettings();
      const initialShowSliderValue = currentSettings?.showSlider ?? true;
      setSettings({ ...currentSettings, showSlider: initialShowSliderValue });
      setUneditedSettings(currentSettings);
    };
    initSettings();
  }, []);

  useEffect(() => {
    if (uneditedSettings) {
      if (
        uneditedSettings.homePage !== settings.homePage ||
        uneditedSettings.showSlider !== settings.showSlider
      ) {
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

      <View style={[styles.settingContainer]}>
        <Text style={styles.labelText}>Home page:</Text>
        <TextInput
          placeholder="Your preferred home page"
          value={settings?.homePage || "https://m.youtube.com"}
          style={styles.input}
          onChangeText={updateHomepage}
        />
      </View>

      <View style={[styles.settingContainer]}>
        <Text style={styles.labelText}>Show walk mode slider:</Text>
        <CheckBox onValueChange={onPressCheckbox} value={settings.showSlider} />
      </View>

      <View style={[styles.settingContainer]}>
        <Text style={styles.msgText}>{message}</Text>
      </View>

      <View style={[styles.settingContainer]}>
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
    width: width,
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
    zIndex: 100,
  },
  hideContainer: {
    opacity: 0,
    top: -10000,
    zIndex: 0,
  },
  settingContainer: {
    display: "flex",
    flexDirection: "row",
    width: width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
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
    fontSize: 16,
    color: "green",
  },
  title: {
    height: 40,
  },
  labelText: {
    marginRight: 5,
  },
});

export default WebBrowserSettings;
