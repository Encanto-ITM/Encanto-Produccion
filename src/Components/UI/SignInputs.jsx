import React, { useState, useRef, useEffect } from 'react';

export default function SignInputs({ type, name, value, onChange, placeholder, className = "" }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); 

  const handleLabelClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (value) {
      setIsFocused(true); 
    }
  }, [value]);

  return (
    <div className="relative flex flex-col items-center">
      <input 
        ref={inputRef} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`border-2 border-black text-center w-full h-12 rounded-md shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent ${className}`} 
        placeholder=" " 
      />
      <label
        onClick={handleLabelClick} 
        className={`absolute top-6 transition-transform duration-500 ${isFocused || value ? '-translate-y-5 scale-75 top-2' : 'top-1/2 transform -translate-y-1/2 scale-100 cursor-pointer'}`}
      >
        {placeholder}
      </label>
      <style>{`
        input:focus + label,
        input:not(:placeholder-shown) + label {
          transform: translate(0px, -55px) scale(0.85);
        }
      `}</style>
    </div>  
  );
}
