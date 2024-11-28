export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token disponible.');

        const response = await fetch('https://tulookapiv2.vercel.app/api/api/users', {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al obtener los datos del usuario: ${errorMessage}`);
        }

        const data = await response.json();
        const email = localStorage.getItem('email');
        const user = data.find(user => user.email === email);

        if (user) return user;
        else {
            console.error('No se encontró el usuario autenticado.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return null;
    }
};
