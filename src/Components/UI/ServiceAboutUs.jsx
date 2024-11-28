export function ServiceAboutUs(){
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1 px-6">
                <h3 className="text-4xl font-bold mb-12 text-gray-800">Quiénes Somos</h3>
                <p className="mb-12 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed text-center text-justify">
                Somos un equipo de estudiantes de la carrera de Informática y Tecnología Multimedia de la Universidad de Costa Rica. Nuestro proyecto, TuLook, nació como parte de un curso en el que se nos propuso desarrollar ideas en equipo. La propuesta de crear esta aplicación nos pareció interesante, y, a medida que compartíamos nuestras ideas, el proyecto fue evolucionando y mejorando gracias a la colaboración de todos.
                <br/><br/>
                TuLook ha sido diseñada para facilitarte la búsqueda de servicios de belleza y cuidado personal, tales como barberías, estilismo, manicura, depilación, diseño de cejas, tratamientos de skin care, entre otros. Nuestro lema, "La belleza al alcance de un clic", refleja nuestro compromiso de poner a tu disposición una amplia variedad de servicios con solo unos toques en tu móvil. Así, tendrás acceso rápido y sencillo a todo lo que necesitas para tu bienestar y cuidado personal.
                </p>
                <br />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/JuanCamacho.png" 
                    alt="Juan G. Camacho Sanchez" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Juan G. Camacho Sanchez</h4>
                <p className="text-gray-600">
                        Scrum Master - Developer
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/EstefaniaJimenez.png" 
                    alt="Estefanía Jiménez Cordero" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Estefanía Jiménez Cordero</h4>
                <p className="text-gray-600">
                        Designer - QA
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/KeylerIabarra.png" 
                    alt="Keyler Ibarra Carvajal" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Keyler Ibarra Carvajal</h4>
                <p className="text-gray-600">
                        Delivery Management - Developer
                </p>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/IanMiranda.png" 
                    alt="Ian Miranda Castellón" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Ian Miranda Castellón</h4>
                <p className="text-gray-600">
                        Developer - Technical Lead
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/EddyChaves.png" 
                    alt="Eddy Chaves Rojas" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Eddy Chaves Rojas</h4>
                <p className="text-gray-600">
                        Developer - Architect
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src="/img/RobertoEscobar.png" 
                    alt="Roberto Escobar Aguero" 
                    className="h-40 w-40 bg-gray-300 mx-auto mb-6 rounded-full border-2 border-[#65439B]" 
                />
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Roberto Escobar Aguero</h4>
                <p className="text-gray-600">
                        Product Manager
                </p>
                </div>
            </div>
            </div>
      </section>
    );
}