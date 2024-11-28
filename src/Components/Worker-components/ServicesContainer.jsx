import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

export default function ServicesContainer({ ownerId }) {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${ownerId}/owner`);
                
                if (response.status === 404) {
                    setError('No posee servicios.');
                    setServices([]); 
                    return;
                } else if (!response.ok) {
                    throw new Error('Error fetching services');
                }

                const data = await response.json();
                setServices(data.data || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError('Error fetching services. Please try again later.');
            }
        };

        fetchServices();
    }, [ownerId]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-center text-xl font-semibold text-purple">{error}</p>
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-center text-xl font-semibold text-purple-700">No posee servicios.</p>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto h-[48rem] hidenscroll">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map(service => (
                    <div key={service.id} className="flex-shrink-0">
                        <ServicesCard service={service} />
                    </div>
                ))}
            </div>
        </div>
    );
}
