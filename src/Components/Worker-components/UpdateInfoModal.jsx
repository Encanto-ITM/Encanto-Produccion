import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';

export default function UpdateInfoModal({ open, onClose, worker, onUpdate }) {
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profession, setProfession] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [x, setX] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [headerPhoto, setHeaderPhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [headerPhotoPreview, setHeaderPhotoPreview] = useState(null);

    useEffect(() => {
        if (worker) {
            setAddress(worker.address || '');
            setDescription(worker.description || '');
            setProfession(worker.professions_id || '');
            setFacebook(worker.facebook || '');
            setInstagram(worker.instagram || '');
            setWhatsapp(worker.whatsapp || '');
            setX(worker.x || '');
            setTiktok(worker.tiktok || '');
            setLinkedin(worker.linkedin || '');
        }
    }, [worker, open]);

    const handleFileChange = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('address', address);
        formData.append('description', description);
        formData.append('professions_id', profession);
        formData.append('facebook', facebook);
        formData.append('instagram', instagram);
        formData.append('whatsapp', whatsapp);
        formData.append('x', x);
        formData.append('tiktok', tiktok);
        formData.append('linkedin', linkedin);
        formData.append('_method', 'PUT');  

        if (profilePhoto) formData.append('profilephoto', profilePhoto);
        if (headerPhoto) formData.append('headerphoto', headerPhoto);

        try {
            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/users/${worker.id}`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${responseData.message || 'Error desconocido'}`);
            }

            onUpdate(responseData);
            onClose();
        } catch (error) {
            console.error('Error al actualizar la información:', error);
        }
    };

    

    const professionsMap = {
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

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4" onClick={handleCloseModal}>
                <div className="bg-white text-black max-w-lg w-full rounded-lg relative shadow-lg p-6 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-black text-lg">X</button>
                    <h2 className="text-2xl font-bold mb-4 text-center">Actualizar Información</h2>

                    <div>
                        <label className="block text-sm font-medium text-black">Profesión</label>
                        <select
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        >
                            {Object.entries(professionsMap).map(([id, name]) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Dirección</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Foto de Perfil</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setProfilePhoto, setProfilePhotoPreview)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                        {profilePhotoPreview && (
                            <div className="mt-2">
                                <img src={profilePhotoPreview} alt="Previsualización Foto de Perfil" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Foto de Encabezado</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setHeaderPhoto, setHeaderPhotoPreview)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                        {headerPhotoPreview && (
                            <div className="mt-2">
                                <img src={headerPhotoPreview} alt="Previsualización Foto de Encabezado" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                    </div>

                    {/* Redes sociales */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Facebook</label>
                        <input
                            type="text"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Instagram</label>
                        <input
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Whatsapp</label>
                        <input
                            type="text"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">X</label>
                        <input
                            type="text"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Tiktok</label>
                        <input
                            type="text"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">Linkedin</label>
                        <input
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <GenericButton onClick={handleSave} placeholder="Guardar cambios" className="rounded mt-4 border-2 text-white p-2 hover:scale-105 duration-300" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
