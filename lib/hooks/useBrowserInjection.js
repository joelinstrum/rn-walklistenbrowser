import { useEffect, useState } from "react";
import * as BrowserScripts from "./browserScripts";

const useBrowserInjection = (url) => {
  const [injectedScript, setInjectedScript] = useState("");

  const onMessage = (event) => {
    console.log(event);
  };

  const inject = () => {
    if (!url) {
      return;
    }
  };

  const scriptIfy = (script) => {
    return script;
  };

  const navChange = () => {
    if (!url) {
      return;
    }
    if (/youtube\.com/.test(url)) {
      setInjectedScript(scriptIfy(BrowserScripts.youTubeSkip));
    } else if (/google\.com/.test(url)) {
      setInjectedScript(`console.log("New injected script for Google")`);
    }
  };

  return {
    onMessage,
    injectedScript,
    navChange,
  };
};

export default useBrowserInjection;
