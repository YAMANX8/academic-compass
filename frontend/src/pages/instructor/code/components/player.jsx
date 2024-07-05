import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

function Player({ keyLogs }) {
  const [displayText, setDisplayText] = useState("");
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (!keyLogs.length) return;

    const timers = [];

    keyLogs.forEach((log) => {
      const timeDiff = log.time;

      const timer = setTimeout(() => {
        const editor = editorRef.current;

        // if (log.key === "Enter") {
        //   editor.trigger("keyboard", "type", { text: "\n" });
        // } else if (log.key === "Tab") {
        //   editor.trigger("keyboard", "type", { text: "\t" });
        // } else if (log.key.length === 1) {
        //   editor.trigger("keyboard", "type", { text: log.key });
        // } else {
        //   setDisplayText((prevText) => prevText + log.key);
        // }
        if (log.key === "Enter") {
          editor.trigger("keyboard", "type", { text: "\n" });
        } else if (log.key === "Tab") {
          editor.trigger("keyboard", "type", { text: "\t" });
        } else if (log.key === "Backspace") {
          const position = editor.getPosition();
          const range = new monaco.Range(
            position.lineNumber,
            position.column - 1,
            position.lineNumber,
            position.column,
          );
          editor.executeEdits("", [
            { range, text: "", forceMoveMarkers: true },
          ]);
        } else if (log.key === "ArrowDown") {
          editor.trigger("keyboard", "cursorDown", {});
        } else if (log.key === "ArrowUp") {
          editor.trigger("keyboard", "cursorUp", {});
        } else if (log.key === "ArrowLeft") {
          editor.trigger("keyboard", "cursorLeft", {});
        } else if (log.key === "ArrowRight") {
          editor.trigger("keyboard", "cursorRight", {});
        } else if (log.key.length === 1) {
          editor.trigger("keyboard", "type", { text: log.key });
        }
      }, timeDiff);

      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [keyLogs]);

  // console.log(displayText);
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h3>Preview</h3>
      <Editor
        height="55vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={displayText}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        language=""
      />
    </div>
  );
}

export default Player;
