import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../Cart/CartContext'; 

export function NavLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();  
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login?form=signin');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    navigate('/cartlist');
  };
  const handleLogoClick = () => {
    navigate('/landing');
  };


  return (
    <nav className="bg-purple text-white px-8 py-1 flex justify-between items-center relative z-20">
      <div className="flex items-center">
        <img
          src="/img/Logo-Landing.png"
          alt="TuLook Logo"
          className="h-16 w-30 mr-2 transition duration-500 hover:scale-110 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      <button className="block lg:hidden text-white z-30" onClick={handleMenuToggle}>
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      <ul
        className={`flex-col lg:flex-row text-lg space-x-4 gap-8 items-center lg:flex transition-all duration-500 ${isMenuOpen ? 'fixed inset-0 bg-purple flex justify-center items-center flex-col text-center' : 'hidden'
          }`}
      >
        <li className="transition duration-500 hover:scale-110"><a href="/results/4">Servicios</a></li>
        <li className="transition duration-500 hover:scale-110"><a href="/aboutus">Nosotros</a></li>
        <li className="transition duration-500 hover:scale-110"><a href="/contactus">Contactanos</a></li>
        <li className="transition duration-500 hover:scale-110">
          
        </li>
        <button
          className="bg-gray-100 text-purple transition duration-500 ease-in-out px-8 py-2 rounded hover:scale-105"
          onClick={handleLoginClick}
        >
          Inicia Sesion
        </button>
      </ul>
    </nav>
  );
}
