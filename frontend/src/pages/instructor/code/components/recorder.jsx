// Recorder.js
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

import { Button } from "../../../../components";
import { Icon } from "@iconify/react";
const Recorder = ({ keyLogs, setKeyLogs, isRecording, setIsRecording }) => {
  const [startTime, setStartTime] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const editorRef = React.useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isRecording) {
        const currentTime = new Date().getTime();
        const timeElapsed = startTime ? currentTime - startTime : 0;
        setKeyLogs((prevLogs) => [
          ...prevLogs,
          { key: event.key, time: timeElapsed },
        ]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startTime]);

  const handleStartRecording = async () => {
    setKeyLogs([]);
    setStartTime(new Date().getTime());
    setIsRecording(true);

    // Start audio recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current);
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    // Stop audio recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", event.changes);
    if (event.changes[0].text == "" && isRecording) {
      const currentTime = new Date().getTime();
      const timeElapsed = startTime ? currentTime - startTime : 0;
      setKeyLogs((prevLogs) => [
        ...prevLogs,
        { key: "Backspace", time: timeElapsed },
      ]);
      // console.log("Backspace pressed");
    }
  }
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full justify-end">
        {isRecording ? (
          <Button
            className="!rounded-full"
            onClick={handleStopRecording}
            variant="outlined"
            color="error"
            size="sm"
          >
            <Icon icon="mdi:record-rec" fontSize={32} />
            Stop Recording
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="!rounded-full"
            size="sm"
            onClick={handleStartRecording}
          >
            <Icon icon="mdi:record" fontSize={32} />
            Start Recording
          </Button>
        )}
      </div>
      <div>
        <Editor
          height="55vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          // value={displayText}
          onChange={handleEditorChange}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
      {!isRecording && keyLogs.length > 0 && (
        <div
          className="cursor-pointer self-center !rounded-full bg-primary/10 p-4 text-primary-dark transition duration-300 ease-in-out hover:bg-primary/20 dark:!text-primary-light"
          // onClick={handlePostRecord}
        >
          <Icon icon="mdi:content-save-outline" fontSize={48} />
        </div>
      )}
      {audioUrl && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-bold">Audio Recording</h2>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default Recorder;
