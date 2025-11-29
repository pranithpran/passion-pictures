import React from 'react';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (newUrl: string) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded p-8 max-w-md text-center">
         <p>AI Editing is currently disabled in this version.</p>
         <button onClick={onClose} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ImageEditor;