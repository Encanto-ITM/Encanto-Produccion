import React, { useState } from 'react';
import SignInputs from './SignInputs';
import GenericButton from './GenericButton';

export function ResetPasswordForm() {
    const [formData, setFormData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (data) => {
        let formErrors = {};
        if (!data.email) formErrors.email = "El correo electrónico es requerido.";
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setSuccessMessage('');

        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/password/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el correo de recuperación');
            }

            const data = await response.json();
            setSuccessMessage(data.message || 'Se ha enviado un correo de recuperación.');
            setFormData({ email: '' }); 
        } catch (error) {
            console.error('Error en la solicitud de recuperación de contraseña:', error);
            setErrors({ email: 'Correo de recuperación incorrecto.' });
        }
    };

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
                <div className='w-3/4 flex flex-col gap-6'>
                    <SignInputs
                        placeholder="Correo electrónico"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                    {submitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <GenericButton
                    type="button"
                    onClick={handleSubmit}
                    placeholder="Restablecer Contraseña"
                    className='mt-2 h-12'
                />
                <a href="/login?form=signin" className="text-black hover:underline text-center">
                    Iniciar Sesión
                </a>
            </div>
            <div className="flex w-full max-h-screen overflow-hidden flex-grow hidden md:block">
                <img
                    src="/img/Reset-Password.png"
                    className="w-full h-full object-cover"
                    alt="Reset Password"
                    loading="lazy"
                />
            </div>
        </section>
    );
}