import React, { useState, useEffect } from 'react';
import { NavLanding } from '../Components/landing-components/NavLanding';
import { Nav } from '../Components/Activity/Nav';
import Footer from '../Components/Activity/Footer'; 

export function ContactUs() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('email');
        setIsLoggedIn(!!email);
    }, []);

    return (
        <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative">
              <div className={`sticky top-0 z-30`}>
                {isLoggedIn ? <Nav /> : <NavLanding />}
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 relative z-10 mb-16">
                <div className='flex flex-col items-start justify-center p-8 md:p-16 mx-auto max-w-3xl max-sm:p-4'>
                    <h1 className='text-[clamp(3rem,_3.50rem,_4rem)] font-bold text-purple mb-4 leading-tight'>
                        Ponte en contacto con nosotros
                    </h1>
                    <h1 className='text-purple text-[clamp(1rem,_1.25rem,_1.50rem)] mb-8 max-w-lg'>
                        Estamos para ayudarte en cualquier duda o consulta
                    </h1>
                </div>
                <div className="relative overflow-hidden rounded-tl-[200px] rounded-bl-[200px] w-full">
                    <img src="/img/ContactUs.jpg" alt="ContactUs" className="w-full h-auto object-cover" />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row max-sm:flex-col gap-4 relative z-20 -mt-28 mx-16 mb-20'>
                <div className='bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 text-center grid'>
                    <img className='w-12 mx-auto' src="/img/Iconos/telefono.png" alt="telefono" />
                    <h3 className='text-2xl font-semibold mb-4 text-purple'>Llámanos</h3>
                    <p className='text-gray-600'>Podes contactarnos por cualquiera de los siguientes medios:</p>
                    <p className='text-gray-600'>ianxd03@gmail.com</p>
                    <p className='text-gray-600'>+506 86083131</p>
                    <p className='text-gray-600'>+506 22782222</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 text-center grid'>
                    <img className='w-14 mx-auto' src="/img/Iconos/mensajes.png" alt="mensajes" />
                    <h3 className='text-2xl font-semibold mb-4 mt-3 text-purple'>Escríbenos</h3>
                    <p className='text-gray-600'>¿Tienes alguna duda o consulta? ¡Escríbenos!</p>
                    <p className='text-gray-600'>Envíanos un mensaje a través de WhatsApp y te responderemos lo antes posible.</p>
                    <a 
                        href="https://wa.me/50686083131" 
                        target="_blank" 
                        className="text-purple-600 hover:underline mt-4 inline-block"
                    >
                        Enviar mensaje por WhatsApp
                    </a>
                    <p className='text-gray-600 text-sm mt-4'>Disponible de Lunes a Viernes de 8:00 AM a 5:00 PM.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
