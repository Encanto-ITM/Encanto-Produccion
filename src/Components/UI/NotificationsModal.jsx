import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { fetchUserData } from '../hooks/userData';

export default function NotificationsModal({ open, onClose }) {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [isExiting, setIsExiting] = useState(false); 
  const navigate = useNavigate();

  const fetchAppointments = async (user) => {
    const response = await fetch(`https://tulookapiv2.vercel.app/api/api/appointments/${user.id}/client`);
    const data = await response.json();
    setAppointments(data.data || []);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-CR', {
      day: '2-digit', month: '2-digit',
      year: 'numeric', hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isFutureDate = (dateString) => {
    const appointmentDate = new Date(dateString);
    const currentDate = new Date();
    return appointmentDate >= currentDate;
  };

  const getUserData = async () => {
    const user = await fetchUserData();
    setUser(user);
  };

  useEffect(() => {
    if (open) {
      getUserData();
    }
  }, [open]);

  useEffect(() => {
    if (user) {
      fetchAppointments(user);
    }
  }, [user]);

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 500);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOrders = () => {
    navigate(`/list/${user.id}`);
    closeModal();
  };

  const futureAppointments = appointments
    .filter((appointment) => isFutureDate(appointment.date))
    .filter((appointment) => appointment.status !== 'Pendiente');

  if (!futureAppointments || futureAppointments.length === 0) return null;

  return (
    <Modal open={open} onClose={closeModal}>
      <Box className="fixed inset-0 flex items-start justify-end p-4 pt-20" onClick={handleCloseModal}>
        <Grow in={open && !isExiting} timeout={500}>
          <div className='bg-white text-black max-w-lg w-full rounded-lg relative shadow-lg overflow-y-auto' style={{ maxHeight: '90vh', backgroundColor: '#f3f4f6' }}>
            <div className="p-6 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-black text-lg">X</button>

              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mt-4">Notificaciones</h2>
                <div className="mt-4 space-y-4">
                  {futureAppointments.map((appointment, index) => (
                    <div key={appointment.id} className="bg-white shadow-lg rounded-lg p-4 border">
                      <div className="flex items-center justify-end space-x-4">
                        <p className="text-sm font-bold">{appointment.service_name}</p>
                        <p className="text-sm">{appointment.owner_fullname}</p>
                        <p className="text-sm">{formatDate(appointment.date)}</p>
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-bold flex items-center ${appointment.status === 'Aceptado' ? 'text-green' : appointment.status === 'Cancelado' ? 'text-red' : ''}`}>
                            {appointment.status === 'Aceptado' ? (
                              <svg
                                className="mr-2 w-10 h-10 text-green"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 12l2 2l4-4" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            ) : appointment.status === 'Cancelado' ? (
                              <svg
                                className="mr-2 w-5 h-5 text-red"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fillRule="evenodd" clipRule="evenodd" d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            ) : null}
                            {appointment.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='bg-purple p-6 rounded-b-lg shadow-md flex items-center justify-center'>
              <button 
                className="btn-edit text-white w-full max-w-xs text-center p-4 rounded-lg border-2 border-white" 
                onClick={handleOrders}
              >
                <span className="block">Órdenes</span>
                <svg 
                  className="svg mt-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  stroke="#ffffff"
                  width="24" 
                  height="24"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 5.49939C10.7857 5.49939 9.65119 5.83167 8.68004 6.40982C7.75056 6.96316 6.97046 7.74197 6.41557 8.67041L6.33669 8.81256L8.97987 8.05464L9.39332 9.49654L4.28753 10.9606L2.92432 6.20674L4.3662 5.79326L5.02392 8.08686L5.11519 7.92239L5.12101 7.9126C5.80399 6.76541 6.76552 5.80389 7.91273 5.12093C9.10954 4.40843 10.5082 3.99939 12 3.99939C16.4186 3.99939 20.0006 7.58138 20.0006 12C20.0006 16.4186 16.4186 20.0006 12 20.0006C9.75159 20.0006 7.71868 19.0721 6.2661 17.5796L7.34105 16.5334C8.5229 17.7478 10.1729 18.5006 12 18.5006C15.5902 18.5006 18.5006 15.5902 18.5006 12C18.5006 8.40981 15.5902 5.49939 12 5.49939Z" fill="#ffffff"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.25 12.3086V8H12.75V11.6873L15.5016 14.4389L14.441 15.4995L11.25 12.3086Z" fill="#ffffff"></path>
                </svg>
              </button>
            </div>
          </div>
        </Grow>
      </Box>
    </Modal>
  );
}