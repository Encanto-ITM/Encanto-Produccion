import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GenericButton from '../UI/GenericButton';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import UpdateInfoModal from './UpdateInfoModal';
import NewServiceModal from './NewServiceModal';
import { fetchUserData } from '../hooks/userData';
import LoadingSpinner from '../UI/LoadingSpinner';

export function WorkerInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
    const [workerData, setWorkerData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { worker } = location.state || {};

    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchUserData();
            setCurrentUser(user);
            setIsLoading(false);
        };

        getUserData();

        if (worker) {
            setWorkerData(worker);
        }
    }, [worker]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openNewServiceModal = () => setIsNewServiceModalOpen(true);
    const closeNewServiceModal = () => setIsNewServiceModalOpen(false);

    const handleUpdate = (updatedInfo) => {
        setWorkerData(prevData => ({ ...prevData, ...updatedInfo }));
        closeModal();
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!workerData) {
        return <p>No worker data found</p>;
    }

    const isOwner = currentUser && currentUser.id === workerData.id;

    const professionsMap = {
        1: 'Admin',
        2: 'Usuario',
        3: 'Estilista',
        4: 'Manicura',
        5: 'Pedicura',
        6: 'Peluquero',
        7: 'Barbero',
        8: 'Cuidador de piel',
        9: 'Depiladora',
        10: 'Maquilladora',
    };

    return (
        <div className="bg-gray-200 p-6 rounded-lg mt-4 shadow-md w-full mx-auto">
            <h3 className="text-xl font-bold mb-6">Informacion de colaborador</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <div className="mb-6">
                        <p className="text-lg font-semibold">Profesión</p>
                        <div className="mt-2">
                            <span className="bg-purple text-white px-4 py-2 rounded-full">
                                {professionsMap[workerData.professions_id] || 'Profession not found'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 w-full max-w-full md:w-[600px]">
                        <p className="text-lg font-semibold">Descripción</p>
                        <p className="mt-2 bg-gray-100 rounded-lg text-base font-medium text-gray-700 p-4">
                            {workerData.description}
                        </p>
                    </div>
                    <div className="mt-10 w-full max-w-full md:w-[600px]">
                        <p className="text-lg font-semibold">Dirección</p>
                            <p className="mt-2 bg-gray-100 rounded-lg text-base font-medium text-gray-700 p-4">
                                {workerData.address}
                            </p>
                    </div>
                </div>

                <div>
                    
                    <div>
                        <p className="text-lg font-semibold">Redes Sociales</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaFacebookF />
                                </div>
                                {workerData.facebook ? (
                                    <a
                                        href={`https://www.facebook.com/${workerData.facebook}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 "
                                    >
                                        {workerData.facebook}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaWhatsapp />
                                </div>
                                {workerData.whatsapp ? (
                                    <a
                                        href={`https://wa.me/${workerData.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 "
                                    >
                                        {workerData.whatsapp}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaInstagram />
                                </div>
                                {workerData.instagram ? (
                                    <a
                                        href={`https://www.instagram.com/${workerData.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 "
                                    >
                                        {workerData.instagram}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaTwitter />
                                </div>
                                {workerData.x ? (
                                    <a
                                        href={`https://twitter.com/${workerData.x}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 "
                                    >
                                        {workerData.x}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaTiktok />
                                </div>
                                {workerData.tiktok ? (
                                    <a
                                        href={`https://www.tiktok.com/@${workerData.tiktok}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 "
                                    >
                                        {workerData.tiktok}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-purple text-white p-2 rounded-md">
                                    <FaLinkedinIn />
                                </div>
                                {workerData.linkedin ? (
                                    <a
                                        href={`https://www.linkedin.com/in/${workerData.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600"
                                    >
                                        {workerData.linkedin}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No registrado</span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-end">
                <div className="flex justify-start mt-6 w-[300px] gap-4">
                    {isOwner && (
                        <>
                            <GenericButton onClick={openModal} placeholder="Actualizar" />
                            <button
                                onClick={openNewServiceModal}
                                className="font-bold flex items-center justify-center bg-white text-black  p-2 h-10 rounded-md transition-transform duration-300 transform hover:scale-105"
                            >
                                Nuevo Servicio
                            </button>
                        </>
                    )}
                </div>
            </div>

            <UpdateInfoModal
                open={isModalOpen}
                onClose={closeModal}
                worker={workerData}
                onUpdate={handleUpdate}
            />
            <NewServiceModal
                open={isNewServiceModalOpen}
                onClose={closeNewServiceModal}
                worker={workerData}
            />
        </div>
    );
}
