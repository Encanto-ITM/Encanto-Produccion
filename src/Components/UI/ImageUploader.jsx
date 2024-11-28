import React, { useState } from 'react';

export default function ImageUploader({ onImageChange }) {
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input">
        <div className="relative w-32 h-32">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full h-full object-cover rounded-full border-2 border-gray-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full border-2 border-gray-300">
              <span className="text-gray-500">+</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
