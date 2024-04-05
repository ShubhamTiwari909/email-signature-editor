import React from "react";
import DownloadButton from "../DownloadButton";
import { Card } from "@/components/ui/card";

const Preview = ({
  iframeContent,
  htmlContent,
  setHtmlContent,
  fileName,
}: {
  iframeContent: string;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
}) => {
  return (
    <Card className="w-1/2">
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
      <DownloadButton
        buttonType="button"
        htmlContent={htmlContent}
        fileName={fileName}
      />
    </Card>
  );
};

export default Preview;
