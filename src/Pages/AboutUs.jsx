import { useEffect, useState } from 'react';
import { NavLanding } from "../Components/landing-components/NavLanding";
import { Nav } from "../Components/Activity/Nav.jsx";
import { ServiceAboutUs } from "../Components/UI/ServiceAboutUs.jsx";
import Footer from '../Components/Activity/Footer.jsx';

export default function AboutUs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 max-sm:w-full max-sm:flex max-sm:flex-col relative">
      {isLoggedIn ? <Nav /> : <NavLanding />}
      <ServiceAboutUs />
      <Footer />
    </div>
  );
}

