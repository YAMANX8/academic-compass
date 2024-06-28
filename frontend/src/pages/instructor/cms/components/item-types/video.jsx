import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { Button } from "../../../../../components";
const Video = () => {
  const [video, setVideo] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideo(file);

    const formData = new FormData();
    formData.append("video", file);
    console.log(file);
    // TODO: here I will call the api
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
          <video
            className="aspect-video w-64"
            controls
            src={URL.createObjectURL(video)}
          />
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-sm font-normal text-dark">
              Video Name: {video.name}
            </p>
            <p className="text-sm font-normal text-dark">Duration: [NUMBER]</p>
            <p className="text-sm font-normal text-dark">Upload Date: [TIME]</p>
          </div>
          <div className="mt-auto">
            <Button variant="soft" size="sm" onClick={() => setVideo(null)}>
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
