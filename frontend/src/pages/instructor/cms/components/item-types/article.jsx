import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCmsContext } from "../../../../../context/hooks/use-cms-context";

const Article = () => {
  const { article, handleChangeArticle } = useCmsContext();
  const [value, setValue] = useState(article);

 
  const handleChange = (newValue) => {
    setValue(newValue);
    handleChangeArticle(newValue);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      className="bg-white dark:bg-black"
    />
  );
};

export default Article;
