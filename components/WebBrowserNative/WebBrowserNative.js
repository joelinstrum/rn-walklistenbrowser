import { useState, useRef, useEffect } from "react";
import {
  useBrowserHistory,
  useBrowserInjection,
  useBrowserSettings,
} from "../../lib/hooks";
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
  const [injectable, setInectable] = useState(true);
  const { getSettings } = useBrowserSettings();
  const [url, setUrl] = useState();
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showWebBrowserSettings, setShowWebBrowserSettings] = useState(false);
  const [addressBarText, setAddressBarText] = useState();
  const { saveUrlToHistory } = useBrowserHistory();
  const [resetAddress, setResetAddress] = useState();
  const [showSlider, setShowSlider] = useState(true);
  const [settings, setSettings] = useState(null);
  const { onMessage, injectedScript, navChange } = useBrowserInjection(url);

  useEffect(() => {
    const init = async () => {
      const _settings = await getSettings();
      setSettings(_settings);
    };
    init();
  }, []);

  useEffect(() => {
    const homePage = settings?.homePage || HOME;
    if (settings) {
      setAddressBarText(homePage);
      setShowSlider(settings?.showSlider);
    }
    if (settings && !url && !addressBarText) {
      setUrl(homePage);
    }
  }, [settings]);

  updateBrowserSettings = (toggle) => {
    if (toggle) {
      setShowWebBrowserSettings(true);
      setShowSlider(false);
    } else {
      const init = async () => {
        const _settings = await getSettings();
        setSettings(_settings);
        setShowWebBrowserSettings(false);
      };
      init();
    }
  };

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

  useEffect(() => {
    if (settings && settings.hasOwnProperty("autoSkipAds")) {
      setInectable(settings.autoSkipAds);
    }
  }, [settings?.autoSkipAds]);

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <View
        style={{
          ...styles.overlay,
          ...{ zIndex: itemOnTop === "webview" ? 1 : 10 },
          ...{ opacity: settings?.useDarkCover !== false ? 0.4 : 0 },
        }}
      >
        <Text>Overlay</Text>
      </View>
      <View style={styles.defaultStyle}>
        <View style={{ flex: 1 }}>
          {showWebBrowserSettings && (
            <WebBrowserSettings
              showSettings={showWebBrowserSettings}
              updateDisplaySettings={() => updateBrowserSettings(false)}
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
            javaScriptEnabledAndroid={true}
            onMessage={onMessage}
            injectedJavaScript={injectable ? injectedScript : null}
            onNavigationStateChange={navChange}
          />
          <WebBrowserNav
            webViewgoback={webViewgoback}
            webViewNext={webViewNext}
            webViewHome={webViewHome}
            webSettings={() => updateBrowserSettings(true)}
          />
        </View>
      </View>
      {showSlider && (
        <View style={styles.buttonContainer}>
          <EnableButton
            title="Slide for walk mode"
            onSlideComplete={onSlideComplete}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WebBrowserNative;
