import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onCancelClick }) => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-80">
                <h3 className="text-lg font-bold text-center mb-4">No estás logueado</h3>
                <p className="text-center mb-4">Para completar la acción, por favor inicia sesión.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-purple text-white px-4 py-2 rounded-md  hover:scale-105 transition-colors duration-500"
                        onClick={handleGoToLogin}
                    >
                        Ir al Login
                    </button>

                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:scale-105 transition-colors duration-500"
                        onClick={onCancelClick}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
