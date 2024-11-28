export default function ServiceCard({ serviceName, imgName }) {
    return (
        <section className="flex flex-col items-center bg-white p-8 drop-shadow-md rounded-md gap-2 min-h-[300px] justify-center"> 
            <img 
                className="h-32 w-auto object-contain" 
                src={`/img/${imgName}.png`} 
                alt="service" 
            />
            <h2 className="text-purple text-center text-xl font-semibold">
                {serviceName}
            </h2>
        </section>
    );
}
