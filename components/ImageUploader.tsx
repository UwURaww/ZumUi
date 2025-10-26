
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-300">1. Upload Design</h2>
      <div
        onClick={onAreaClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative group border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all duration-300 h-64 flex items-center justify-center text-center
          ${isDragging ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-600 hover:border-indigo-600 hover:bg-gray-700/50'}
          ${imagePreview ? 'border-solid' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="UI Preview" className="max-h-full max-w-full object-contain rounded-md" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <span className="text-white font-semibold">Click or drop to replace</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <UploadIcon />
            <span className="font-semibold">Click to upload or drag & drop</span>
            <span className="text-xs">PNG, JPG or WEBP (Transparent PNG recommended)</span>
          </div>
        )}
      </div>
    </div>
  );
};
