import { useState, useRef, useEffect } from "react";
import { useBrowserHistory, useBrowserSettings } from "../../lib/hooks";
import {
  EnableButton,
  WebBrowserNav,
  WebBrowserAddressBar,
  WebBrowserAutoComplete,
  WebBrowserSettings,
} from "../../components";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./WebBrowserStyles";

const HOME = "https://m.youtube.com";

const WebBrowserNative = () => {
  const [itemOnTop, setItemOnTop] = useState("webview");
  const { getSettings } = useBrowserSettings();
  const [url, setUrl] = useState();
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showWebBrowserSettings, setShowWebBrowserSettings] = useState(false);
  const [addressBarText, setAddressBarText] = useState();
  const { saveUrlToHistory } = useBrowserHistory();
  const [resetAddress, setResetAddress] = useState();

  useEffect(() => {
    const init = async () => {
      const settings = await getSettings();
      const homePage = settings?.homePage || HOME;
      setUrl(homePage);
      setAddressBarText(homePage);
    };
    init();
  }, []);

  const onSlideComplete = (toggled) => {
    setItemOnTop(toggled ? "overlay" : "webview");
  };

  const webviewRef = useRef(null);

  const webViewgoback = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const webViewNext = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

  const webViewHome = () => {
    setAddressBarText(HOME);
    setUrl(HOME);
    setTimeout(() => {
      setResetAddress(Date.now());
    }, 100);
  };

  const updateUrl = async (url, saveToUrl = true) => {
    let decodedUrl = decodeURIComponent(url);
    setAddressBarText(decodedUrl.toLowerCase());
    setUrl(decodedUrl);
    addressCancel();
    if (saveToUrl) {
      saveUrlToHistory(decodedUrl.toLowerCase());
    }
    setTimeout(() => {
      setResetAddress(Date.now());
    }, 100);
  };

  const addressOnChange = (text) => {
    setAddressBarText(text);
    if (text !== url && text.length) {
      setShowAutoComplete(true);
    } else {
      addressCancel();
    }
  };

  const addressCancel = () => {
    setAddressBarText(url);
    setShowAutoComplete(false);
  };

  const addressReset = () => {
    addressCancel();
    setResetAddress(Date.now());
  };

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <View
        style={{
          ...styles.overlay,
          ...{ zIndex: itemOnTop === "webview" ? 1 : 10 },
        }}
      >
        <Text>Overlay</Text>
      </View>
      <View style={styles.defaultStyle}>
        <View style={{ flex: 1 }}>
          {showWebBrowserSettings && (
            <WebBrowserSettings
              showSettings={showWebBrowserSettings}
              updateDisplaySettings={() => setShowWebBrowserSettings(false)}
            />
          )}
          <WebBrowserAddressBar
            url={url}
            updateUrl={updateUrl}
            textOnChange={addressOnChange}
            reset={resetAddress}
          />
          <WebBrowserAutoComplete
            show={showAutoComplete}
            text={addressBarText}
            onSelect={(url) => updateUrl(url, false)}
            onCancel={addressReset}
          />
          <WebView
            source={{ uri: url }}
            originWhitelist={["*"]}
            react-native-webview={true}
            automaticallyAdjustContentInsets={true}
            ref={webviewRef}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
          />
          <WebBrowserNav
            webViewgoback={webViewgoback}
            webViewNext={webViewNext}
            webViewHome={webViewHome}
            webSettings={() => setShowWebBrowserSettings(true)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <EnableButton
          title="Protect Browser"
          onSlideComplete={onSlideComplete}
        />
      </View>
    </SafeAreaView>
  );
};

export default WebBrowserNative;
