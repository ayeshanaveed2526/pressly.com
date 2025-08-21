import React from "react";

function Hero() {
  return (
    <header className="py-20">
  <div className="bg-gradient-to-r from-indigo-600 via-emerald-400 to-slate-400 text-white px-12 py-12 shadow-2xl flex flex-col items-center w-full rounded-3xl">
        <h1 className="text-7xl mb-4 drop-shadow-lg font-montserrat">Pressly</h1>
        <p className="text-2xl mb-6 font-montserrat">Premium laptop stickers and mini canvas art for your workspace.</p>
        <button className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-full shadow hover:bg-emerald-100 transition text-xl font-montserrat dark:bg-slate-900 dark:text-white">Shop Now</button>
      </div>
    </header>
  );
}

export default Hero;
