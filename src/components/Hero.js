import React from "react";

function Hero() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-center text-white">
      <h1 className="text-5xl font-extrabold mb-4">Sticker & Canvas Shop</h1>
      <p className="text-xl mb-6">Unique laptop stickers and mini canvas art for your style!</p>
      <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded shadow hover:bg-blue-100 transition">
        Shop Now
      </button>
    </header>
  );
}

export default Hero;
