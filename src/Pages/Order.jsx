import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import ServiceCard from '../Components/UI/ServiceCard.jsx';
import { Calendario } from '../Components/UI/Calendario.jsx';
import { useCart } from '../Components/Cart/CartContext';
import { NavLanding } from "../Components/landing-components/NavLanding";
import LoginModal from '../Components/UI/LoginModal.jsx';

export function Order() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');
    const [isValidDate, setIsValidDate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cartSuccessMessage, setCartSuccessMessage] = useState('');

    const warningMessageRef = useRef(null);

    const { addToCart } = useCart();
    const currentDateTime = new Date();

    const closeModal = () => setIsModalVisible(false);
    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${id}/`);
                if (!response.ok) {
                    throw new Error('No existe un servicio para esta categoría');
                }
                const data = await response.json();
                setService(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        setIsLoggedIn(!!email);
    }, []);

    const handleOrder = () => {
        if (isLoggedIn) {
            if (service && isValidDate) {
                navigate(`/confirmation/${service.id}`, { state: { service, selectedTime } });
                setWarningMessage('');
            } else {
                setWarningMessage('Por favor, seleccione una fecha y hora válidas.');
            }
        } else {
            setIsModalVisible(true);
        }
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            if (service && isValidDate && selectedTime) {
                
                const formattedDate = formatDateToMySQLFormat(selectedTime);

                const serviceWithDetails = {
                    ...service,
                    selectedTime: formattedDate,  
                    service_id: service.id,
                    date: formattedDate,  
                };

                addToCart(serviceWithDetails);
                setCartSuccessMessage('Servicio agregado al carrito exitosamente.');
                setTimeout(() => setCartSuccessMessage(''), 3000);
                setWarningMessage('');
            } else {
                setWarningMessage('Por favor, seleccione una fecha y hora válidas.');
            }
        } else {
            setIsModalVisible(true); 
        }
    };


    const formatDateToMySQLFormat = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleDateChange = (newValue) => {
        setSelectedTime(newValue);

        const selectedDateTime = new Date(newValue);
        selectedDateTime.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const threeMonthsLater = new Date(currentDate);
        threeMonthsLater.setMonth(currentDate.getMonth() + 3);
        threeMonthsLater.setHours(0, 0, 0, 0);

        if (selectedDateTime > currentDate && selectedDateTime <= threeMonthsLater) {
            setIsValidDate(true);
            setWarningMessage('');
        } else if (selectedDateTime <= currentDate) {
            setIsValidDate(false);
            setWarningMessage('No se pueden seleccionar fechas pasadas.');
            setSelectedTime(null);
        } else if (selectedDateTime > threeMonthsLater) {
            setIsValidDate(false);
            setWarningMessage('La cita solo se puede agendar hasta 3 meses en el futuro.');
            setSelectedTime(null);
        }
    };

    useEffect(() => {
        if (warningMessageRef.current && warningMessage !== '') {
            warningMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [warningMessage]);

    const handleLoginRedirect = () => {
        setIsModalVisible(false);
        navigate('/login');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {isLoggedIn ? <Nav /> : <NavLanding />}
            <div className='flex flex-col items-center p-4 max-w-6xl mx-auto'>
                <div className="text-center w-full p-4 font-bold">
                    <h1 className="text-2xl md:text-4xl text-gray-800 mb-4">
                        Reserva tu cita para obtener <br />
                        una <span className="text-purple font-extrabold">Belleza</span> brillante
                    </h1>
                </div>

                {loading && <p className="text-center text-gray-600">Cargando servicio...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}

                {service && (
                    <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
                        <div className="w-full md:w-1/2 flex flex-col items-center">

                            <Calendario onTimeSelect={handleDateChange} />

                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-md w-full mb-4">
                                <h2 className='text-purple text-xl font-semibold'>Costo del servicio</h2>
                                <h2 className="text-purple text-lg text-center">₡{service.price}</h2>
                            </div>
                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-md w-full">
                                <h2 className='text-purple text-xl font-semibold'>Detalles a tomar en cuenta</h2>
                                <h2 className="text-purple text-lg text-center">{service.details}</h2>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            <div className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-md w-full mt-2">
                                <h2 className='text-purple text-xl font-semibold'>Consideraciones</h2>
                                <h2 className="text-purple text-lg text-center">{service.considerations}</h2>
                            </div>
                            <ServiceCard serviceName={service.name} imgName="identificador" />
                            <ServiceCard serviceName={service.aprox_time} imgName="identificador" />
                        </div>
                    </div>
                )}
                {warningMessage && (
                    <p ref={warningMessageRef} className="text-center text-red mb-4">{warningMessage}</p>
                )}
                {cartSuccessMessage && (
                    <p className="text-center text-green-500 mb-4">{cartSuccessMessage}</p>
                )}
                <div className="flex justify-center mt-6 mb-20 gap-4 flex-wrap">
                    <button
                        className={`button ${!isValidDate ? 'opacity-50 cursor-not-allowed hover:scale-105 duration-500' : ''}`}
                        onClick={handleOrder}
                        disabled={!isValidDate || loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" className="svg-icon">
                            <g stroke-width="2" stroke-linecap="round" stroke="#fff">
                                <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                                <path d="m8 3v4"></path>
                                <path d="m16 3v4"></path>
                                <path d="m4 11h16"></path>
                            </g>
                        </svg>
                        <span className="lable">Completar</span>
                    </button>

                    <button
                        className={`cartBtn button ${!isValidDate ? 'opacity-50 cursor-not-allowed hover:scale-105 duration-500' : ''}`}
                        onClick={handleAddToCart}
                        disabled={!isValidDate || loading}
                    >
                        <svg
                            className="cart"
                            fill="white"
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 640 512"
                            className="product"
                        >
                            <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                        </svg>

                        <span className="label">Agregar al Carrito</span>
                    </button>

                </div>
            </div>

            <Footer />
            {isModalVisible && (
                <LoginModal
                    onLoginRedirect={handleLoginRedirect}
                    onCancelClick={closeModal}
                />
            )}
        </>
    );
}
