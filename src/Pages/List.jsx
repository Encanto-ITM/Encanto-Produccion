import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { fetchUserData } from '../Components/hooks/userData.js';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

export function List() {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [loading, setLoading] = useState(true); 

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

    useEffect(() => {
        if (user) {
            getList();
        }
    }, [user]);

    const getList = async () => {
        if (!user) {
            setMessage('Los datos del usuario no están disponibles.');
            return;
        }
        setLoading(true); 
        try {
            let response;
            if (user.acounttype_id == 3) {
                response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${user.id}/owner`);
            } else {
                response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${user.id}/client`);
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAppointments(data.data);
        } catch (error) {
            console.error(error);
            setMessage('Error al cargar las citas.');
        } finally {
            setLoading(false); 
        }
    };

    const handleAccept = async (appointmentId) => {
        try {
            const appointment = appointments.find(app => app.id == appointmentId);
            const updatedData = {
                service_id: appointment.service_id,
                owner_id: appointment.owner_id,
                applicant: appointment.applicant,
                date: appointment.date,
                status: 'Aceptado',
                total: appointment.total,
                location: appointment.location,
            };

            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al aceptar la cita');
            }

            setMessage('Cita aceptada con éxito.');
            getList(); 
        } catch (error) {
            console.error('Error al aceptar la cita:', error);
            setMessage('Error al aceptar la cita.');
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const appointment = appointments.find(app => app.id == appointmentId);
            const updatedData = {
                service_id: appointment.service_id,
                owner_id: appointment.owner_id,
                applicant: appointment.applicant,
                date: appointment.date,
                status: 'Cancelado',
                total: appointment.total,
                location: appointment.location,
            };

            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al cancelar la cita');
            }

            setMessage('Cita cancelada con éxito.');
            getList(); 
        } catch (error) {
            console.error('Error al cancelar la cita:', error);
            setMessage('Error al cancelar la cita.');
        }
    };

    const filterAppointmentsByStatus = (status) => {
        setSelectedStatus(status);
    };

    const filteredAppointments = selectedStatus
        ? appointments.filter(appointment => appointment.status == selectedStatus)
        : appointments;

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <h2 className="text-2xl font-bold text-center py-4 my-4 border-b">Listado de citas</h2>

            <div className="flex justify-center gap-4">
                <button onClick={() => filterAppointmentsByStatus('Aceptado')} className="hover:text-green">
                    Aprobado
                </button>
                /
                <button onClick={() => filterAppointmentsByStatus('Pendiente')} className="hover:text-yellow">
                    Pendiente
                </button>
                /
                <button onClick={() => filterAppointmentsByStatus('Cancelado')} className="hover:text-red">
                    Cancelado
                </button>
                /
                <button onClick={() => setSelectedStatus('')} className="hover:text-light-gray">
                    Todos
                </button>
            </div>

            
            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="flex justify-center mt-10">
                    <div className="w-full max-w-6xl p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {message && <p className="text-red-500 text-center col-span-3">{message}</p>}
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <div key={appointment.id} className="bg-white shadow-lg rounded-lg p-4 border">
                                        <p className="font-semibold text-center">{appointment.service_name}</p>
                                        <div className='line bg-purple h-1'></div>
                                        <p className="font-semibold">Estado: <span className="font-normal">{appointment.status}</span></p>
                                        <p className="font-semibold">Total: <span className="font-normal">₡{appointment.total}</span></p>
                                        <p className="font-semibold">Detalles: <span className="font-normal">{appointment.location}</span></p>
                                        <p className="font-semibold">Fecha: <span className="font-normal">{appointment.date}</span></p>
                                        <div className="flex gap-4 mt-4">
                                            {user.acounttype_id == 3 && (
                                                <>
                                                <button
                                                    className="text-white bg-green px-4 py-2 rounded hover:scale-105 duration-500"
                                                    onClick={() => handleAccept(appointment.id)}
                                                >
                                                    Aceptar
                                                </button>
                                                <button
                                                    className="text-white bg-red px-4 py-2 rounded hover:scale-105 duration-500"
                                                    onClick={() => handleCancel(appointment.id)}
                                                >
                                                    Cancelar
                                                </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3">No hay citas disponibles en este estado.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-40">
                <Footer />
            </div>
        </div>
    );
}