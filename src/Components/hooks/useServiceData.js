import { useState, useEffect } from 'react';

export const useServiceData = (serviceId) => {
    const [serviceData, setServiceData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${serviceId}`);
                const data = await response.json();
                console.log("Datos recibidos de la API:", data); 
                setServiceData(data); 
            } catch (err) {
                console.error("Error fetching service data:", err);
                setError('Error fetching service data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceData();
    }, [serviceId]);

    return { serviceData, error, loading };
};
