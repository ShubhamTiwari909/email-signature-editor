"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InitialTemplate from "../InitialTemplate";
import pretty from "pretty";
import DragAndDrop from "@/components/HtmlEditor/DragAndDrop";
import Editor from "@/components/HtmlEditor/Editor";
import Preview from "@/components/HtmlEditor/Preview";
import { injectScriptToTemplate } from "@/lib/utils";

const HTMLFileEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [iframeContent, setIframeContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("File");

  const query = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const setHtmlMarkUp = (content: string) => {
      const prettiedMarkup = pretty(content, {
        ocd: true,
      });
      setHtmlContent(prettiedMarkup);
      setIframeContent(prettiedMarkup);
    };

    if (query.has("htmlContent")) {
      const content = query.get("htmlContent") as string;
      setHtmlMarkUp(content);
    } else {
      setHtmlMarkUp(injectScriptToTemplate(InitialTemplate()));
    }
    router.replace("/htmleditor");
  }, []);

  const handleChange = (value: string) => {
    setHtmlContent(value);
    setIframeContent(value);
  };

  return (
    <section className="container mx-auto pb-10">
      <div className="py-4">
        <h1 className="text-center flex-1 text-3xl font-bold">
          Tailwind CSS EDITOR
        </h1>
      </div>
      <DragAndDrop
        fileName={fileName}
        setHtmlContent={setHtmlContent}
        setIframeContent={setIframeContent}
        setFileName={setFileName}
      />
      <div className="flex items-start gap-6">
        <Editor htmlContent={htmlContent} handleChange={handleChange} />
        <Preview
          iframeContent={iframeContent}
          htmlContent={htmlContent}
          fileName={fileName}
        />
      </div>
    </section>
  );
};

export default HTMLFileEditor;
