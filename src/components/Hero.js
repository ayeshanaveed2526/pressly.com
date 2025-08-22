import React from "react";
import DecorOverlay from './DecorOverlay';

function Hero() {
  return (
  <header className="min-h-screen flex items-center justify-center pt-6 sm:pt-6 pb-6 sm:pb-6 parchment-bg relative overflow-hidden">
      <DecorOverlay />
  <div className="mx-auto px-12 sm:px-16 py-12 paper-card relative z-10 text-ink taped text-left" style={{ width: '60%' }}>
  <h1 className="text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-pressly">Pressly</h1>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-sepia typewriter">CUSTOMIZE YOUR VIBE</p>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-ink">Premium laptop stickers and mini canvas art for your workspace.</p>
  <a href="#/products" className="inline-block px-6 sm:px-10 py-2 sm:py-4 btn-vintage text-sm sm:text-lg font-bold rounded-full shadow">Shop Now</a>
      </div>
    </header>
  );
}

export default Hero;
