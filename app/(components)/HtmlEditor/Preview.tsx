import React from "react";
import { handleDownload } from "@/util";

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
        onClick={() => handleDownload(htmlContent, fileName)}
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
  );
};

export default Preview;
