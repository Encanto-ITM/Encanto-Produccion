import { CartHistory } from '../Components/Cart/CartHistory.jsx';
import { Nav } from '../Components/Activity/Nav.jsx';
import Footer from '../Components/Activity/Footer.jsx';
import { NavLanding } from "../Components/landing-components/NavLanding";
import { useState, useEffect } from 'react';

export default function CartList() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);  
  }, []);

 
  return (
    <>
      <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative">
        {isLoggedIn ? <Nav /> : <NavLanding />}
        <CartHistory />
        <Footer />
      </div>
    </>
  );
}
