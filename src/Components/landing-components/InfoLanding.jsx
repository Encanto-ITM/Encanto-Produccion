export function InfoLanding() {
    return (
        <div className="flex flex-col md:flex-row bg-[#EBEBEB] shadow-lg overflow-hidden mb-16 " id="info">
           
            <div className="md:w-1/2 max-h-[47rem]">
                <img
                    src="/img/Login.jpg"
                    alt="Brilliant Beauty"
                    className="h-full w-full object-cover" 
                />
            </div>

            <div className="md:w-1/2 bg-purple text-white p-8 md:p-16 flex flex-col justify-center space-y-16">
                <h2 className="text-4xl font-bold leading-snug mb-4">
                    Registrate para obtener <span className="text-purple-300">una belleza brillante</span>
                </h2>
                <p className="text-lg leading-relaxed">
                Únete a nuestra comunidad y descubre cómo nuestros productos pueden realzar tu belleza. Con fórmulas únicas y efectivas, ¡estás a un paso de lucir radiante!                </p>
                <p className="text-lg leading-relaxed">
                No esperes más. Regístrate ahora y comienza tu viaje hacia una belleza radiante y saludable. ¡Estamos deseando verte!                </p>
                <p className="text-lg leading-relaxed mb-4">
                Miles de personas ya han transformado sus rutinas de belleza con nosotros. Únase a ellos y experimente la diferencia.                </p>
               
                <button className="bg-white text-purple font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 duration-300 mt-8" onClick={() => window.location.href = '/login?form=signup'}>
                    Aprende más
                </button>
            </div>
        </div>
    );
}
