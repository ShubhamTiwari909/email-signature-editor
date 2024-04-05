"use client";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({
  htmlContent,
  handleChange,
}: {
  htmlContent: string;
  handleChange: (value: string) => void;
}) => {

  return (
    <AceEditor
      mode="html"
      theme="twilight" // Set the theme here
      fontSize={14}
      lineHeight={18}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={htmlContent}
      onChange={(newValue) => {
        handleChange(newValue);
      }}
      name="HTML-EDITOR"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      style={{
        width: "550px",
        height: "500px",
      }}
    />
  );
};

export default Editor;
