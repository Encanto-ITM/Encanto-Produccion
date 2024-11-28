import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="loader"></div> 
            <p className="text-lg text-gray-600">Cargando...</p>
        </div>
    );
};

export default Loading;