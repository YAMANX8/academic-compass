import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { Button } from "../../../../../components";
import { useUploadVideo } from "../../../../../apis/cms";
const Video = ({ id, video, setVideo }) => {
  const handleUploadVideo = useUploadVideo();
  // const [video, setVideo] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideo(file);

    const formData = new FormData();
    formData.append("video", file);
    console.log(file);
    // TODO: here I will call the api
    try {
      const res = await handleUploadVideo(id, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !!video.length > 0,
  });

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} />
      {video.length > 0 ? (
        <div className="flex gap-4 p-2">
          <video
            className="aspect-video w-64"
            controls
            src={typeof video == "file" ? URL.createObjectURL(video) : video}
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
