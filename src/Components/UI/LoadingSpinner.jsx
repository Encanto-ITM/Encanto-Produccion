import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple border-solid"></div>
      <p className="mt-4 text-lg text-gray-700 font-semibold">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
