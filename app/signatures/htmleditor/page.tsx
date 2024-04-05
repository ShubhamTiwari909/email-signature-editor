"use client";
import React, { useState, useEffect } from "react";
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

  const handleChange = (value: string) => {
    setHtmlContent(value);
    setIframeContent(value);
  };

  return (
    <section className="container mx-auto pb-10">
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
      </div>
    </section>
  );
};

export default HTMLFileEditor;
