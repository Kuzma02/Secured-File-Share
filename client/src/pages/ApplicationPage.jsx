import React, { useState } from "react";
import { ApplicationTabs, PageHeader, UploadForm } from "../components";

const ApplicationPage = () => {
  const [progress, setProgress] = useState(50);

  return (
    <>
      <PageHeader title="Send File Page" path="Home > Send File Page" />
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-blue-500">Uploading</strong> File And{" "}
        <strong className="text-blue-500">Share</strong> It
      </h2>
      <UploadForm progress={progress} />
    </>
  );
};

export default ApplicationPage;
