import React, {useState } from "react";
import DownloadButton from "../DownloadButton";
import { Card } from "@/components/ui/card";

const Preview = ({
  iframeContent,
  htmlContent,
  fileName,
}: {
  iframeContent: string;
  htmlContent: string;
  fileName: string;
}) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const prevIframeContentRef = React.useRef(iframeContent);
  const [mobile, setMobile] = useState(false);

  React.useEffect(() => {
    if (iframeRef.current && prevIframeContentRef.current !== iframeContent) {
      prevIframeContentRef.current = iframeContent;
      const iframeDocument = iframeRef.current.contentDocument;
      const iframeContentWindow = iframeRef.current.contentWindow;
      if (iframeDocument && iframeContentWindow) {
        iframeDocument.open();
        iframeDocument.write(iframeContent);
        iframeDocument.close();
        const yPos =
          iframeContentWindow.scrollY ||
          iframeDocument.documentElement.scrollTop;
        iframeContentWindow.scrollTo(0, yPos);
      }
    }
  }, [iframeContent]);

  return (
    <Card className="w-[780px]">
      <div className="flex justify-end pr-4">
        <button onClick={() => setMobile(!mobile)}>
          {mobile ? "Tablet" : "Mobile"}
        </button>
      </div>
      <iframe
        title="HTML Preview"
        ref={iframeRef}
        srcDoc={iframeContent}
        className={`border border-sky-400 w-[${
          mobile ? "375px" : "780px"
        }] h-96 mb-4 bg-white rounded-lg overflow-hidden`}
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
