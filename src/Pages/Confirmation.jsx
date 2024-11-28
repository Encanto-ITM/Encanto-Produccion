import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'; 
import dayjs from 'dayjs';
import { fetchUserData } from '../Components/hooks/userData.js';
import { useState, useEffect } from 'react';

export function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { service, selectedTime } = location.state || {};
    console.log('Datos recibidos en location.state:', location.state);
    console.log('SelectedTime:', selectedTime);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(null); 
    const formattedDate = selectedTime 
    ? (selectedTime.$d ? dayjs(selectedTime.$d).format('YYYY-MM-DD HH:mm:ss') : dayjs(selectedTime).format('YYYY-MM-DD HH:mm:ss')) 
    : 'Fecha no disponible';
   

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchUserData();
                setUser(userData);
            } catch (error) {
                setMessage('Error al obtener los datos del usuario.');
            }
        };
        
        getUserData();
    }, []);
    
    const handleOrder = async () => {
        if (!user) {
            setMessage('Los datos del usuario no están disponibles.');
            return;
        }
        console.log('Datos del usuario:', user);
        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: service.id,
                    owner_id: service.owner_id,
                    applicant: user.id, 
                    date: formattedDate, 
                    total: service.price,
                    location: service.details,
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
    
            const data = await response.json();
            setSubmitted(true); 
            navigate(`/list/${user.id}`); 
            
        } catch (error) {
            setMessage('Error al completar la reserva. Intente nuevamente.'); 
        }
    };

    return (
        <div>
            <Nav />
            <div className="p-4 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-center">Confirmación de Reserva</h1>
                
                {service ? (
                    <div className="mt-4 border p-4 rounded-lg shadow-lg">
                        <p className="font-semibold text-center">{service.name}</p>
                            <div className='line bg-purple h-1'></div>
                            <p>Servicio: {service.name || 'No disponible'}</p>
                <p>Duración: {service.aprox_time || 'No disponible'}</p>
                <p>Total: ₡{service.price || 'No disponible'}</p>
                <p>Consideraciones: {service.considerations || 'No disponible'}</p>
                <p>Detalles: {service.details || 'No disponible'}</p>
                <p>Fecha: {formattedDate || 'No disponible'}</p>
                                    
                    </div>
                ) : (
                    <p>No hay información de servicio disponible.</p>
                )}

                {message && (
                    <div className="mt-4 text-center text-red-600">
                        {message}
                    </div>
                )}
                <div className="flex justify-center mt-6 mb-20">
                <button class="button" onClick={handleOrder} disabled={submitted}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                        <span class="lable">Completar</span>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
