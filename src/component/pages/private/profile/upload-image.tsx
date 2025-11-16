"use client";

import { Camera, HardDriveUpload, X, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  onFileSelect: (file: File | null) => void;
  preview?: string | null;
};

const UploadImage = ({ onFileSelect, preview: initialPreview }: Props) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large – max 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setPreview(null);
    onFileSelect(null);
    setOpen(false);
  };

  return (
    <>
      <div className="inline-block border py-3.5 px-6 rounded-lg border-grey  shadow-lg">
        <div className="flex items-center gap-6">
          <div className="relative size-24  rounded-full bg-grey ">
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-grey ">
                <Camera className="size-8" />
              </div>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute bottom-0 right-0  rounded-full bg-primary p-1.5 text-white shadow-md"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary/90"
          >
            <HardDriveUpload className="size-4" /> Upload New Photo
          </button>
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black ">
                Upload Photo
              </h2>
              <button
                onClick={reset}
                className="rounded-full p-1 bg-red "
                aria-label="Close"
              >
                <X className="size-5 text-white " />
              </button>
            </div>

            <div
              className="cursor-pointer rounded-lg border-2 border-dashed border-grey  p-6 text-center transition-colors hover:border-primary/50"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <div className="space-y-3">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="mx-auto max-h-48 rounded-lg object-cover shadow-sm"
                  />
                  <p className="text-sm text-grey ">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="mx-auto size-10 text-grey " />
                  <p className="text-sm font-medium text-grey ">
                    Drag & drop or click to browse
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>

            {preview && (
              <p className="mt-2 text-center text-xs text-grey ">
                JPG, PNG, GIF – max 5 MB
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-lg border border-grey bg-gray-500   px-4 py-2 font-medium text-white  hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={!preview}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-white shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
