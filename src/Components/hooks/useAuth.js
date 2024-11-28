import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); 
    }, []);

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            window.location.href = '/'; 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return { isAuthenticated, logout };
};
