import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useLogin() {
    const [showSignIn, setShowSignIn] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignUpEm, setShowSignUpEm] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const form = queryParams.get('form');

        if (form === 'signup') {
            setShowSignIn(false);
            setShowSignUp(true);
            setShowSignUpEm(false);
        } else if (form === 'signup-emprendedor') {
            setShowSignIn(false);
            setShowSignUp(false);
            setShowSignUpEm(true);
        } else {
            setShowSignIn(true);
            setShowSignUp(false);
            setShowSignUpEm(false);
        }
        
        setInitialLoad(false);
    }, [location.search]);

    const toggleForm = (type) => {
        if (type === 'user') {
            setShowSignIn(false);
            setShowSignUp(true);
            setShowSignUpEm(false);
        } else if (type === 'emprendedor') {
            setShowSignIn(false);
            setShowSignUp(false);
            setShowSignUpEm(true);
        } else {
            setShowSignIn(true);
            setShowSignUp(false);
            setShowSignUpEm(false);
        }
    };

    return { showSignIn, showSignUp, showSignUpEm, toggleForm, initialLoad };
}
