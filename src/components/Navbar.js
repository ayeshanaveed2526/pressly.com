
import { useState, useEffect } from "react";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";

function getInitialMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function Navbar({ darkMode, toggleDarkMode, navigate }) {
  return (
    <nav className="nav-vintage shadow-md py-2 sm:py-4 px-3 sm:px-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
      <img src="/icon/assets.png" alt="Pressly logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
      <div className="text-lg sm:text-2xl font-bold font-pressly nav-brand">Pressly</div>
          </div>
      <ul className="hidden sm:flex space-x-3 md:space-x-6 text-sm sm:text-base">
        <li><button onClick={() => navigate('/')} className="nav-link font-medium">Home</button></li>
        <li><button onClick={() => navigate('/products')} className="nav-link font-medium">Products</button></li>
        <li><button onClick={() => navigate('/reviews')} className="nav-link font-medium">Reviews</button></li>
        <li><button onClick={() => navigate('/about')} className="nav-link font-medium">About us</button></li>
      </ul>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={toggleDarkMode} className="p-1 sm:p-2 rounded-full nav-toggle flex items-center justify-center">
          <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
