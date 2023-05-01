import AsyncStorage from "@react-native-async-storage/async-storage";

const useBrowserSettings = () => {
  const getSettings = async () => {
    let retval = {};
    return new Promise(async (complete) => {
      const settings = await AsyncStorage.getItem("@WalkListen:settings");
      if (settings) {
        retval = JSON.parse(settings);
      }
      if (!retval.hasOwnProperty("showSlider")) {
        retval.showSlider = true;
      }
      if (!retval.hasOwnProperty("autoSkipAds")) {
        retval.autoSkipAds = true;
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
