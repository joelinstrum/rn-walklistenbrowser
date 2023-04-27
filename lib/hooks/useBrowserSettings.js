import AsyncStorage from "@react-native-async-storage/async-storage";

const useBrowserSettings = () => {
  const getSettings = async () => {
    let retval = [];
    return new Promise(async (complete) => {
      const urls = await AsyncStorage.getItem("@WalkListen:settings");
      if (urls && urls.length) {
        retval = JSON.parse(urls);
      }
      complete(retval);
    });
  };

  const saveSettings = async (updatedSettings) => {
    return new Promise(async (complete) => {
      await AsyncStorage.setItem(
        "@WalkListen:settings",
        JSON.stringify(updatedSettings)
      );
      complete();
    });
  };

  return {
    getSettings,
    saveSettings,
  };
};

export default useBrowserSettings;
