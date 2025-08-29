import React from "react";
import DecorOverlay from './DecorOverlay';

function Hero() {
  return (
  <header className="min-h-screen flex items-center justify-center pt-6 sm:pt-6 pb-6 sm:pb-6 parchment-bg relative overflow-hidden">
      <DecorOverlay />
  <div className="mx-auto px-6 sm:px-12 paper-card relative z-10 text-ink taped text-left max-w-6xl" style={{ width: '70%', maxWidth: '1100px', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
  <h1 className="text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-pressly">Pressly</h1>
  <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-sepia typewriter">CUSTOMIZE YOUR VIBE<span className="typewriter-caret" aria-hidden="true"></span></p>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 font-body text-ink">Premium laptop stickers and mini canvas art for your workspace.</p>
  <a href="#/products" className="inline-block btn-hero text-sm sm:text-lg self-start">Shop Now</a>
      </div>
    </header>
  );
}

export default Hero;
