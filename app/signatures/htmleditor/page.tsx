"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { initialData } from "@/store/store";
import WellReceivedSignatures from "@/app/SignatureHTML/WellReceivedSignatures";
import pretty from "pretty";
import DragAndDrop from "@/app/(components)/HtmlEditor/DragAndDrop";
import Editor from "@/app/(components)/HtmlEditor/Editor";
import Preview from "@/app/(components)/HtmlEditor/Preview";

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
      const data = initialData["wr"];
      setHtmlMarkUp(WellReceivedSignatures(data));
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
        <h1 className="text-center flex-1 text-3xl font-bold">HTML EDITOR</h1>
      </div>
      <DragAndDrop
        fileName={fileName}
        setHtmlContent={setHtmlContent}
        setIframeContent={setIframeContent}
        setFileName={setFileName}
      />
      <div className="flex justify-between items-start gap-6">
        <Editor htmlContent={htmlContent} handleChange={handleChange} />
        <Preview
          iframeContent={iframeContent}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          fileName={fileName}
        />
      </div>
    </section>
  );
};

export default HTMLFileEditor;
