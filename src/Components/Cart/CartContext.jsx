import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { fetchUserData } from '../hooks/userData';

const CartContext = createContext();

const initialState = {
    cart: [],
    history: [],
    services: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'SET_SERVICES':
            return { ...state, services: action.payload };
        case 'ADD_TO_CART':
            return { 
                ...state, 
                cart: [...state.cart, action.payload], 
                history: [...state.history, { timestamp: new Date(), type: 'ADD', item: action.payload }] 
            };
        case 'REMOVE_FROM_CART':
            return { 
                ...state, 
                cart: state.cart.filter(item => item.id !== action.payload), 
                history: [...state.history, { timestamp: new Date(), type: 'REMOVE', item: { id: action.payload } }] 
            };
        case 'CLEAR_CART':
            return { 
                ...state, 
                cart: [], 
                history: [...state.history, { timestamp: new Date(), type: 'CLEAR' }] 
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [user, setUser] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthentication = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = await fetchUserData();
            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                dispatch({ type: 'CLEAR_CART' }); 
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
            dispatch({ type: 'CLEAR_CART' }); 
        }
    };
   
    useEffect(() => {
        checkAuthentication();
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
           // console.log('Cambio en localStorage detectado.');
            checkAuthentication();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (user) {
            //console.log('Usuario autenticado:', user);
        }
    }, [user]);

    useEffect(() => {
        if (isAuthenticated && user) {
            const fetchCartAndServices = async () => {
                setLoadingData(true);
                try {
                    // Aquí la llamada al backend para cargar el carrito y servicios del usuario
                    const cartResponse = await fetch(`https://tulookapiv2.vercel.app/api/api/carts/${user.id}/user`);
                    if (!cartResponse.ok) throw new Error('Error al cargar el carrito.');
                    const cartData = await cartResponse.json();
                    dispatch({ type: 'SET_CART', payload: cartData });
    
                    const servicesResponse = await fetch('https://tulookapiv2.vercel.app/api/api/services');
                    if (!servicesResponse.ok) throw new Error('Error al cargar los servicios.');
                    const servicesData = await servicesResponse.json();
                    dispatch({ type: 'SET_SERVICES', payload: servicesData });
    
                    setIsDataLoaded(true);
                } catch (error) {
                  //  console.error('Error al cargar el carrito o los servicios:', error);
                } finally {
                    setLoadingData(false);
                }
            };
    
            fetchCartAndServices();
        }
    }, [user, isAuthenticated]);  
   
    const addToCart = async (item, selectedTime) => {
        if (!user) {
           // console.log('No hay usuario logueado');
            return;
        }

        const dateTime = item.date;
       // console.log('Agregando al carrito:', item);

        try {
            const requestData = { user_id: user.id, service_id: item.service_id, date: dateTime };
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json();
               // console.error('Error al agregar al carrito:', errorData);
                throw new Error(errorData.message || 'Error al agregar al carrito.');
            }

            const newItem = await response.json();
            //console.log('Item agregado al carrito:', newItem);
            dispatch({ type: 'ADD_TO_CART', payload: newItem });
        } catch (error) {
            //console.error('Error al agregar al carrito:', error);
        }
    };

    const removeFromCart = async (id) => {
        if (!user) {
            //console.log('No hay usuario logueado');
            return;
        }

        
        try {
            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/carts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Error al eliminar del carrito.');
          //  console.log('Item eliminado del carrito:', id);
            dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        } catch (error) {
           // console.error('Error al eliminar del carrito:', error);
        }
    };

    const clearCart = async () => {
        if (!user) {
           // console.log('No hay usuario logueado');
            return;
        }

        //console.log('Vaciando el carrito...');
        try {
            await fetch('https://tulookapiv2.vercel.app/api/api/carts/', { method: 'DELETE' });
            dispatch({ type: 'CLEAR_CART' });
         //   console.log('Carrito vaciado.');
        } catch (error) {
         //   console.error('Error al vaciar el carrito:', error);
        }
    };

    const cartWithServices = state.cart.map(item => {
        const service = state.services.find(service => service.id === item.service_id);
        return { ...item, serviceDetails: service || {} };
    });

    return (
        <CartContext.Provider value={{
            cart: cartWithServices,
            history: state.history,
            addToCart,
            removeFromCart,
            clearCart,
            user,
            loadingData,
            isDataLoaded,
            isAuthenticated,
            setIsAuthenticated,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
