import React, { useRef } from 'react';

const EditInput = ({ label, id, value, onChange, error }) => {
  const inputRef = useRef(null);

  const handleLabelClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="relative mb-4">
      <input
        ref={inputRef}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        required
        className={`text-white p-2 border-2 rounded-md bg-transparent transition duration-500 focus:border-blueviolet focus:outline-none ${
          error ? 'border-red-500' : 'border-white'
        }`}
      />
      <label
        htmlFor={id}
        onClick={handleLabelClick}
        className="absolute top-0 left-0 translate-x-2 translate-y-2 text-white transition-transform duration-500 transform scale-100 cursor-pointer"
      >
        {label}
      </label>
      {error && (
        <p className="text-white text-sm mt-1 text-center">{error}</p>
      )}
      <style jsx>{`
        input:focus + label,
        input:valid + label {
          transform: translate(0px, -20px) scale(0.8);
          padding-left: 10px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default EditInput;
