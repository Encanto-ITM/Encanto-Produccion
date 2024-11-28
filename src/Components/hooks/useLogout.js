
export const logout = () => {
    try {
     
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');

        window.location.href = '/'; 
        window.location.reload();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};
