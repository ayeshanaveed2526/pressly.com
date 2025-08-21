import React from "react";

function Navbar() {
  return (
    <nav className="bg-yellow-100 shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-600">Sticker & Canvas Shop</div>
      <ul className="flex space-x-6">
        <li><a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Home</a></li>
        <li><a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Products</a></li>
        <li><a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Cart</a></li>
        <li><a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Contact</a></li>
      </ul>
      <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition">Sign In</button>
    </nav>
  );
}

export default Navbar;
