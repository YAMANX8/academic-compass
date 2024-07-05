import { useState } from "react";
import Player from "./components/player";
import Recorder from "./components/recorder";

const CodeEditor = () => {
  // const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  // const [events, setEvents] = useState([]);
  const [keyLogs, setKeyLogs] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  console.log(keyLogs);
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Recorder
        keyLogs={keyLogs}
        setKeyLogs={setKeyLogs}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      />
      {!isRecording && keyLogs.length > 0 && <Player keyLogs={keyLogs} />}
    </div>
  );
};
export default CodeEditor;
