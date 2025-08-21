
import { useState, useEffect } from "react";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";

function getInitialMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="bg-slate-100 shadow-md py-2 sm:py-4 px-3 sm:px-4 flex flex-wrap justify-between items-center sticky top-0 z-50 dark:bg-slate-900">
      <div className="text-lg sm:text-2xl font-bold text-indigo-700 dark:text-white">Pressly</div>
      <ul className="hidden sm:flex space-x-3 md:space-x-6 text-sm sm:text-base">
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Home</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Products</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Cart</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Contact</a></li>
      </ul>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={toggleDarkMode} className="p-1 sm:p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-800 flex items-center justify-center">
          <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700 dark:text-white" />
        </button>
        <button className="px-2 py-1 sm:px-3 sm:py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition text-xs sm:text-sm">Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;
