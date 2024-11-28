export default function GenericButton({ type = "button", onClick, placeholder, white = false, className = "" }) {
    return (
        <button
        type={type}
        className={`font-bold flex items-center justify-center ${white ? 'bg-white text-black' : 'bg-purple text-white'} p-2 h-10 rounded-md transition-transform duration-300 transform hover:scale-105 ${className}`}
        onClick={onClick}
    >
        {placeholder}
    </button>

    );
}
