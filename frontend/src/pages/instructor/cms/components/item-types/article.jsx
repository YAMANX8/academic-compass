import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Article = () => {
  const [value, setValue] = useState("");
  return (
    // <div className="container mx-auto mt-10">
    <ReactQuill
      value={value}
      onChange={setValue}
      className="rounded-lg bg-white"
    />
    /* <div className="mt-5 rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-bold">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div> */
    // </div>
  );
};

export default Article;
