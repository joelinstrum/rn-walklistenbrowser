import Voice from "@react-native-voice/voice";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { EnableButton } from "./components";

// import Voice, {
//   SpeechRecognizedEvent,
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from "@react-native-voice/voice";

const Voice = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechResults, setSpeechResults] = useState([]);
  const [showVoiceButton, setShowVoiceButton] = useState(false);

  useEffect(() => {
    const init = async () => {
      await Audio.requestPermissionsAsync();
      setShowVoiceButton(true);
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    };
    init();
  }, []);

  const onSlide = async (toggle) => {
    setVoiceEnabled(toggle);
    toggle ? startSpeechToText() : stopSpeechToText();
  };

  const startSpeechToText = async () => {
    try {
      await Voice.start("en-US");
      console.log("Voice started");
    } catch (e) {
      console.log("Voice is broken");
      console.error(e);
    }
  };

  const stopSpeechToText = async () => {
    if (Voice) {
      await Voice.stop();
    }
  };

  const onSpeechResults = (results) => {
    if (results) {
      setSpeechResults(results.value);
    }
  };

  const onSpeechError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Walk & Listen {voiceEnabled.toString()}</Text>
      {showVoiceButton && <EnableButton onSlideComplete={onSlide} />}
      <View>
        {speechResults.map((result, index) => (
          <Text key={index}>{result}</Text>
        ))}
      </View>
    </View>
  );
};

export default Voice;
