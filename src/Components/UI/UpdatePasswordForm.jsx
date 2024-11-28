import React, { useState } from 'react';
import SignInputs from './SignInputs'; // Suponiendo que tienes este componente
import GenericButton from './GenericButton'; // Y este también
import { Eye, EyeOff } from 'lucide-react'; // Importar iconos de visibilidad

export default function UpdatePasswordForm({
    formData,
    errors,
    submitted,
    successMessage,
    handleChange,
    handleSubmit,
}) {
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la nueva contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de contraseña
    const [passwordError, setPasswordError] = useState(null); // Estado para el mensaje de error de contraseñas no coinciden

    const handleSubmitWithValidation = (e) => {
        e.preventDefault();

        // Verificamos si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Las contraseñas no coinciden.");
            setTimeout(() => {
                setPasswordError(null); // Limpiar el mensaje de error después de 5 segundos
            }, 5000);
            return;
        }

        // Si las contraseñas coinciden, continuamos con el envío del formulario
        handleSubmit(e);
    };

    return (
        <div className="w-3/4 flex flex-col gap-6">
            {/* Campo para nueva contraseña */}
            <div className="relative flex flex-col">
                <SignInputs
                    placeholder="Nueva Contraseña"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    value={formData.password}
                />
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    {showPassword ? <Eye /> : <EyeOff />}
                </div>
            </div>
            {submitted && errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p> // Mensaje de error en rojo
            )}

            {/* Campo para confirmar la nueva contraseña */}
            <div className="relative flex flex-col">
                <SignInputs
                    placeholder="Confirmar Contraseña"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                </div>
            </div>
            {submitted && errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p> // Mensaje de error en rojo
            )}

            {/* Mostrar el error si las contraseñas no coinciden */}
            {passwordError && (
                <p style={{ color: 'red', fontSize: '0.975rem' }}>{passwordError}</p> // Error en rojo con estilo en línea
            )}

            {/* Mensaje de éxito */}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            {/* Botón para enviar el formulario */}
            <GenericButton
                type="button"
                onClick={handleSubmitWithValidation}
                placeholder="Restablecer Contraseña"
                className="mt-2 h-12"
            />
        </div>
    );
}