import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { Button } from "../../../../../components";
import { useUploadVideo } from "../../../../../apis/cms";
import { useCmsContext } from "../../../../../context/hooks/use-cms-context";
const Video = ({ id }) => {
  const { video, handleUploadVideo, handleReplaceVideo } = useCmsContext();
  const onDrop = async (acceptedFiles) => {
    await handleUploadVideo(id, acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !!video,
  });

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} />
      {video ? (
        <div className="flex gap-4 p-2">
          <video className="aspect-video w-64" controls src={video} />
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-sm font-normal text-dark">
              Video Name: [VIDEO_NAME]
            </p>
            <p className="text-sm font-normal text-dark">
              Duration: [VIDEO_DURATION]
            </p>
            <p className="text-sm font-normal text-dark">
              Upload Date: [VIDEO_UPLOAD_DATE]
            </p>
          </div>
          <div className="mt-auto">
            <Button variant="soft" size="sm" onClick={handleReplaceVideo}>
              <Icon icon="mdi:file-replace-outline" />
              Replace
            </Button>
          </div>
        </div>
      ) : (
        <div className="m-auto flex h-[320px] w-[512px] cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-accent-lighter bg-white transition-colors duration-300 hover:border-primary">
          <Icon
            icon="mdi:video"
            fontSize={160}
            className="text-accent-lighter"
          />
          <p className={`text-center text-sm font-normal text-gray-400`}>
            Drop your video here, or browse from your computer
          </p>
        </div>
      )}
    </div>
  );
};

export default Video;
