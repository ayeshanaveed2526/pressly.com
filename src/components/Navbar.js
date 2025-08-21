
import { useState, useEffect } from "react";

function getInitialMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="bg-slate-100 shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50 dark:bg-slate-900">
      <div className="text-2xl font-bold text-indigo-700 dark:text-white">Pressly</div>
      <ul className="flex space-x-6">
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Home</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Products</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Cart</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-700 font-medium dark:text-gray-200 dark:hover:text-indigo-400">Contact</a></li>
      </ul>
      <div className="flex items-center gap-3">
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-slate-200 text-indigo-700 rounded hover:bg-slate-300 transition dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition">Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;
