import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { fetchUserData } from '../Components/hooks/userData';

const Notifications = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

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

  const checkStatusChange = () => {
    if (!appointments || appointments.length === 0) return;

    appointments.forEach((appointment) => {
      if (!isFutureDate(appointment.date)) {
        return;
      }

      let message;
      let toastType;
      let icon;
      let backgroundColor;

      const formattedDate = formatDate(appointment.date);

      if (appointment.status === 'Aceptado') {
        message = `Cita con ${appointment.owner_fullname} para el servicio "${appointment.service_name}" ha sido Aceptada.\nFecha: ${formattedDate}`;
        toastType = toast.success;
        icon = <FaCheckCircle style={{ color: 'white' }} />;
        backgroundColor = '#28a745';
      } else if (appointment.status === 'Cancelado') {
        message = `Cita con ${appointment.owner_fullname} para el servicio "${appointment.service_name}" ha sido Cancelada.\nFecha: ${formattedDate}`;
        toastType = toast.error;
        icon = <FaTimesCircle style={{ color: 'white' }} />;
        backgroundColor = '#dc3545';
      } else {
        return;
      }

      toastType(message, {
        icon,
        autoClose: 7000,
        hideProgressBar: true,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        style: {
          backgroundColor: backgroundColor,
          color: 'white',
          fontSize: '14px',
          padding: '10px',
        },
        bodyStyle: {
          fontSize: '13px',
        },
      });
    });
  };

  const getUserData = async () => {
    const user = await fetchUserData();
    setUser(user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAppointments(user);
    }
  }, [user]);

  useEffect(() => {
    if (appointments.length > 0) {
      checkStatusChange();
    }
  }, [appointments]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Notifications;