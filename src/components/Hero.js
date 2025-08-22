import React from "react";
import DecorOverlay from './DecorOverlay';

function Hero() {
  return (
  <header className="pt-12 sm:pt-20 pb-12 sm:pb-20 parchment-bg relative overflow-hidden">
      <DecorOverlay />
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 paper-card relative z-10 text-ink taped">
  <h1 className="text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-pressly">Pressly</h1>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-sepia typewriter">CUSTOMIZE YOUR VIBE</p>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-ink">Premium laptop stickers and mini canvas art for your workspace.</p>
  <a href="#/products" className="inline-block px-6 sm:px-10 py-2 sm:py-4 btn-vintage text-sm sm:text-lg font-bold rounded-full shadow">Shop Now</a>
      </div>
    </header>
  );
}

export default Hero;
