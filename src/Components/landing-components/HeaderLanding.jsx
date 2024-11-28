import { useNavigate } from 'react-router-dom';
export function HeaderLanding() {

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/login?form=signup');
    };

    return (
        <div className="grid bg-gray-200 grid-cols-2 mt-8 max-sm:grid-cols-1 relative z-10 mb-16">
            <div className="flex-grow flex flex-col items-start justify-center p-8 md:p-16 mx-auto max-w-3xl max-sm:p-4">
                <h1 className="text-[clamp(3rem,_3.50rem,_4rem)] font-bold text-black mb-4 leading-tight">
                    Registrate para obtener <br /> una belleza brillante
                </h1>
                <p className="text-black text-[clamp(1rem,_1.25rem,_1.50rem)] mb-8 max-w-lg">
                Únete a nuestra comunidad y descubre cómo nuestros productos pueden realzar tu belleza.
                </p>
                <button
                    className="bg-purple text-white px-12 py-3 rounded-lg hover:bg-purple-800 text-[clamp(1rem,_1.25rem,_1.50rem)] transition duration-500 ease-in-out hover:scale-105"
                    onClick={handleSignUpClick}
                >
                    Registrate
                </button>
            </div>
            <div>
                <img src="/img/Logo-Landing-Claro.png" alt="" className="w-[80%] ml-8 mt-12" />
            </div>
        </div>
    );
}