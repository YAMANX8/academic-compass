import { useState } from "react";
import Player from "./components/player";
import Recorder from "./components/recorder";
import { useRecordCodeSession } from "../../../apis/cms";
import { toast } from "react-toastify";
import { useParams, useRouter } from "../../../routes/hooks";
import { Icon } from "@iconify/react";

const CodeEditor = () => {
  // const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  // const [events, setEvents] = useState([]);
  const { id } = useParams();
  const router = useRouter();
  console.log(id);
  const [keyLogs, setKeyLogs] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const putData = useRecordCodeSession();
  const handleSaveSession = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("key_presses", JSON.stringify(keyLogs));

    try {
      const response = await putData(id, formData);
      toast.success("Session Recorded Successfully");
      router.back();
      console.log("Session saved successfully", response);
    } catch (error) {
      toast.success("Error");
      console.error("Error saving session", error);
    }
  };
  console.log(keyLogs);
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <Recorder
        keyLogs={keyLogs}
        setKeyLogs={setKeyLogs}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setMediaBlobUrl={setMediaBlobUrl}
        handleSaveSession={handleSaveSession}
      />
      {/* {!isRecording && keyLogs.length > 0 && (
        <div
          className="cursor-pointer self-center !rounded-full bg-primary/10 p-4 text-primary-dark transition duration-300 ease-in-out hover:bg-primary/20 dark:!text-primary-light"
          onClick={handleSaveSession}
        >
          <Icon icon="mdi:content-save-outline" fontSize={48} />
        </div>
      )} */}
      {!isRecording && keyLogs.length > 0 && <Player keyLogs={keyLogs} />}
    </div>
  );
};
export default CodeEditor;
