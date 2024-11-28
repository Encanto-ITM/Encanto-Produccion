import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import UpdatePasswordForm from '../Components/UI/UpdatePasswordForm'; // Importa el formulario

export default function UpdatePassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const { token } = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const email = decodeURIComponent(urlParams.get('email'));

    useEffect(() => {
        if (!token || !email) {
            setErrorMessage('Faltan los parámetros necesarios en la URL.');
            setLoading(false);
        } else {
            setLoading(false);
        }
        console.log('token: ',token);
        console.log('email: ',email);
    }, [token, email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (data) => {
        let formErrors = {};
        if (!data.password) formErrors.password = 'La contraseña es requerida.';
        if (data.password !== data.confirmPassword) formErrors.confirmPassword = 'Las contraseñas no coinciden.';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setSuccessMessage('');
        setErrorMessage('');

        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al restablecer la contraseña');
            }

            const data = await response.json();
            setSuccessMessage(data.message || 'La contraseña ha sido restablecida exitosamente.');
            setFormData({ password: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error en la solicitud de restablecimiento de contraseña:', error);
            setErrors({ password: 'Hubo un error al restablecer la contraseña.' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{errorMessage}</p>
            </div>
        );
    }

    return (
        <section className="flex flex-col md:flex-row w-full h-screen max-w-none overflow-hidden">
            <div className="flex flex-col w-full bg-white gap-4 p-6 place-items-center shadow-lg flex-grow overflow-y-auto">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Restablecer Contraseña</h1>
                <UpdatePasswordForm
                    formData={formData}
                    errors={errors}
                    submitted={submitted}
                    successMessage={successMessage}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <a href="/login?form=signin" className="text-purple hover:underline text-center">
                    Iniciar Sesión
                </a>
            </div>
            <div className="flex w-full max-h-screen overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Update-Password.png"
                    className="w-full h-full object-cover"
                    alt="Restablecer Contraseña"
                    loading="lazy"
                />
            </div>
        </section>
    );
}