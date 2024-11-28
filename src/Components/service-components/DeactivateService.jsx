import React from 'react';
import Modal from '@mui/material/Modal';

export function DeactivateService({ service, isOpen, onClose, onConfirm }) {
    if (!service) return null;

    const handleToggleActive = async () => {
        const newStatus = service.is_active === 1 ? 2 : 1; 
        try {
            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_active: newStatus }), 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedService = await response.json();
            onConfirm(updatedService); 
            onClose(); 
        } catch (error) {
            console.error('Error al actualizar el estado del servicio:', error);
        }
    };

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4" onClick={handleCloseModal}>
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
                    <h2 className="text-xl font-bold mb-4">{service.is_active === 1 ? 'Desactivar Servicio' : 'Activar Servicio'}</h2>
                    <p className="mb-2"><strong>Nombre del Servicio:</strong> {service.name}</p>
                    <p className="mb-2"><strong>Propietario:</strong> {service.owner_id}</p>
                    <p className="mb-2"><strong>Precio:</strong> ${service.price}</p>
                    <p className="mb-2"><strong>Estado Actual:</strong> {service.is_active === 2 ? "Desactivado" : "Activo"}</p>
                    <p className="mb-2"><strong>Detalles:</strong> {service.details}</p>

                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={handleToggleActive} 
                            className={`${service.is_active === 1 ? 'bg-red' : 'bg-green'} text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 mr-2`}
                        >
                            {service.is_active === 1 ? 'Confirmar Desactivación' : 'Confirmar Activación'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
