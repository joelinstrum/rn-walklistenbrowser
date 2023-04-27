import AsyncStorage from "@react-native-async-storage/async-storage";

const useBrowserHistory = () => {
  const getUrlHistory = async () => {
    let retval = [];
    return new Promise(async (complete) => {
      const urls = await AsyncStorage.getItem("@WalkListen:urls");
      if (urls && urls.length) {
        retval = JSON.parse(urls);
      }
      complete(retval);
    });
  };

  const saveUrlToHistory = async (url) => {
    const urlArray = await getUrlHistory();
    urlArray.push(url);
    const arr = [...new Set(urlArray)];
    await AsyncStorage.setItem("@WalkListen:urls", JSON.stringify(arr));
  };

  const matchUrlWithHistory = async (url) => {
    return new Promise(async (complete) => {
      const history = await getUrlHistory();
      const filteredHistory = history
        .filter((item) => item.toLowerCase().includes(url.toLowerCase()))
        .sort((a, b) => a.length - b.length);
      complete(filteredHistory);
    });
  };

  const deleteUrlFromHistory = async (url) => {
    return new Promise(async (complete) => {
      const urlArray = await getUrlHistory();
      const index = urlArray.findIndex((item) => item === url);
      if (index !== -1) {
        // Remove the item from the array
        urlArray.splice(index, 1);
        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem(
          "@WalkListen:urls",
          JSON.stringify(urlArray)
        );
        complete();
      }
    });
  };

  return {
    deleteUrlFromHistory,
    saveUrlToHistory,
    matchUrlWithHistory,
  };
};

export default useBrowserHistory;
