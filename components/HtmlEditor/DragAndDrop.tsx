import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { injectScriptToTemplate } from "@/lib/utils";

type DragAndDrop = {
  fileName: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
  setIframeContent: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
};

const DragAndDrop = ({
  fileName,
  setHtmlContent,
  setIframeContent,
  setFileName,
}: DragAndDrop) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(injectScriptToTemplate(content));
        setIframeContent(injectScriptToTemplate(content));
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const file = droppedFiles[0];
    handleFileChange(file);
  };

  return (
    <div
      className={`w-full py-4 space-y-4 border-2 border-slate-900 mb-4 ${
        dragging ? "border-solid" : "border-dotted"
      } ${fileName ? "h-28" : "h-20"}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-center items-center">
        <Input
          id="picture"
          type="file"
          accept=".html"
          onChange={(e) => {
            const file = e.target.files?.[0] as File | undefined;
            handleFileChange(file as File);
          }}
        />
        <p className="text-slate-500">
          {dragging ? "Dropping a file..." : "or Drop a file"}
        </p>
      </div>
      {fileName && <p className="text-center">File: {fileName}</p>}
    </div>
  );
};

export default DragAndDrop;
