import { Camera, HardDriveUpload } from "lucide-react";
import React from "react";

const UploadImage = () => {
  return (
    <div className="inline-block border py-3.5 px-6 rounded-lg border-grey shadow-lg ">
      <div className=" flex items-center gap-6 ">
        <div className="size-24 bg-red-200 rounded-full relative">
          <span className="absolute bottom-0 right-0 bg-primary p-1 rounded-full text-white">
            <Camera />
          </span>
        </div>
        <button
          type="button"
          className="bg-primary py-2.5 px-4 flex items-center gap-2  rounded-lg text-white"
        >
          <HardDriveUpload className="size-4" /> Upload New Photo
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
