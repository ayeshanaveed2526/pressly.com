import React from "react";

function Hero() {
  return (
    <header className="py-20">
  <div className="bg-gradient-to-r from-indigo-600 via-emerald-400 to-slate-400 text-white px-6 sm:px-12 py-8 sm:py-12 shadow-2xl flex flex-col items-center w-full rounded-3xl">
        <h1 className="text-3xl sm:text-5xl md:text-7xl mb-3 sm:mb-4 drop-shadow-lg font-montserrat">Pressly</h1>
        <p className="text-sm sm:text-lg md:text-2xl mb-4 sm:mb-6 font-montserrat text-center max-w-xl">Premium laptop stickers and mini canvas art for your workspace.</p>
        <button className="px-6 sm:px-10 py-2 sm:py-4 bg-white text-indigo-600 font-bold rounded-full shadow hover:bg-emerald-100 transition text-sm sm:text-lg font-montserrat dark:bg-slate-900 dark:text-white">Shop Now</button>
      </div>
    </header>
  );
}

export default Hero;
