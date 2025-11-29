import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  multiline?: boolean;
  label?: string;
  placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  className = '', 
  tag: Tag = 'p', 
  multiline = false,
  label,
  placeholder
}) => {
  const { isEditing } = useContent();
  const [tempValue, setTempValue] = useState(value);

  // Update internal state if prop changes
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isEditing) {
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  return (
    <div className="relative group border border-dashed border-gold-400 p-2 rounded hover:bg-white/90 transition-all">
      {label && <span className="absolute -top-3 left-2 bg-gold-400 text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm z-10">{label}</span>}
      
      {multiline ? (
        <textarea 
          value={tempValue}
          onChange={(e) => {
            setTempValue(e.target.value);
            onSave(e.target.value);
          }}
          className={`w-full bg-transparent p-1 outline-none min-h-[100px] resize-y ${className}`}
          placeholder={placeholder}
        />
      ) : (
        <input 
          type="text"
          value={tempValue}
          onChange={(e) => {
            setTempValue(e.target.value);
            onSave(e.target.value);
          }}
          className={`w-full bg-transparent p-1 outline-none ${className}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default EditableText;
