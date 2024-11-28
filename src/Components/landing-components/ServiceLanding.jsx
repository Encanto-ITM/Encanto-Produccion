export function ServiceLanding() {
    return (
        <section className="py-16 bg-gray-100" id="services">
            <div className="container mx-auto text-center">
                <h3 className="text-4xl font-bold mb-6 text-gray-800">Nuestros Servicios</h3>
                <p className="mb-16 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed p-4">
                Descubra nuestra gama de servicios diseñados para realzar su belleza y bienestar. Ofrecemos tratamientos personalizados y asesoramiento especializado para ayudarle a alcanzar sus objetivos de belleza. Experimente la diferencia con nuestras ofertas de alta calidad diseñadas especialmente para usted.                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button className="transform transition-transform duration-300 hover:scale-105">
                                <img src="/img/Iconos/customer-service.png" alt="" className="w-full h-full object-contain" />
                            </button>
                        </div>
                        <a href="/results/4"><h4 className="text-2xl font-semibold text-gray-800 mb-4">Servicios</h4></a>
                        
                        <p className="text-gray-600">
                        Descubra nuestros servicios diseñados para realzar su belleza y bienestar. Ofrecemos tratamientos personalizados, asesoramiento especializado y productos de alta calidad para ayudarle a verse y sentirse increíble.                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button className="transform transition-transform duration-300 hover:scale-105">
                                <img src="/img/Iconos/worker.png" alt="" className="w-full h-full object-contain" />
                            </button>
                        </div>
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Emprendedores</h4>
                        <p className="text-gray-600">
                        Apoyamos a emprendedores apasionados que buscan destacarse en la industria de la belleza. Únase a nuestra red para acceder a recursos, capacitación y oportunidades que lo ayudarán a hacer crecer su negocio.                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-32 w-32 mx-auto mb-6">
                            <button className="transform transition-transform duration-300 hover:scale-105">
                                <img src="/img/Iconos/dollar.png" alt="" className="w-full h-full object-contain" />
                            </button>
                        </div>
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Precios</h4>
                        <p className="text-gray-600">
                        Ofrecemos planes competitivos y asequibles para que todos puedan disfrutar de nuestros productos y servicios. Consulta nuestra lista de precios y descubre cómo puedes comenzar tu viaje hacia una belleza radiante sin gastar una fortuna.                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
