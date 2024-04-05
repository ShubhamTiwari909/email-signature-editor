"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import InitialTemplate from "../InitialTemplate";
import pretty from "pretty";
import DragAndDrop from "@/app/(components)/HtmlEditor/DragAndDrop";
import Editor from "@/app/(components)/HtmlEditor/Editor";
import Preview from "@/app/(components)/HtmlEditor/Preview";
import { injectScriptToTemplate } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const HTMLFileEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [iframeContent, setIframeContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

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
    router.replace("/signatures/htmleditor");
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(content);
        setIframeContent(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleChange = (value: string) => {
    setHtmlContent(value);
    setIframeContent(value);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "Signature.html";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <section className="container mx-auto">
      <div className="py-4">
        <Button variant="primary" className="absolute top-2 left-2">
          <Link href="/">Back to homepage</Link>
        </Button>
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
        <div className="w-1/2">
          <iframe
            title="HTML Preview"
            srcDoc={iframeContent}
            onLoad={(event) => {
              let iframeDocument = (event.target as HTMLIFrameElement)
                ?.contentDocument;
              const iframeContentWindow = (event.target as HTMLIFrameElement)
                ?.contentWindow;
              if (iframeDocument) {
                iframeDocument.designMode = "on";
              }
              iframeContentWindow?.document?.addEventListener("input", () => {
                const updatedContent =
                  iframeContentWindow?.document.documentElement.outerHTML;
                setHtmlContent(updatedContent);
              });
            }}
            className="border border-sky-400 w-full h-96 pt-8 pl-8 mb-4 p-2 bg-white rounded-lg overflow-hidden"
          />
          <button
            onClick={handleDownload}
            className="flex gap-x-2 items-center bg-sky-400 text-white rounded-lg px-4 py-2"
          >
            <svg
              className="w-5 h-5"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
                fill="currentColor"
              ></path>
            </svg>
            Download
          </button>
        </div>
      </div>
    </section>
  );
};

export default HTMLFileEditor;
