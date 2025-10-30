import React, { useState, useCallback, useRef } from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Kérjük, válasszon egy képfájlt.');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    } else {
      setPreview(null);
      setFileName('');
      onImageUpload(null);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        // Manually trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName('');
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        id="image-upload"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="Előnézet" className="w-full h-auto max-h-80 object-contain rounded-lg border border-slate-300" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <button
              onClick={handleRemoveImage}
              className="bg-white text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200"
            >
              Kép cseréje
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <ImageIcon className="w-10 h-10 mb-3 text-slate-400" />
            <p className="mb-2 text-sm text-slate-500">
              <span className="font-semibold">Kattintson a feltöltéshez</span> vagy húzza ide a fájlt
            </p>
            <p className="text-xs text-slate-400">PNG, JPG, GIF, WEBP</p>
          </div>
        </label>
      )}
      {fileName && (
        <div className="mt-2 text-sm text-slate-500">
          Kiválasztott fájl: <span className="font-medium">{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;