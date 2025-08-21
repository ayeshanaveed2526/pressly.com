import React, { useState } from "react";

function ProductGrid({ onProductClick, onAddToCart, onStickerCategory }) {
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showCanvasModal, setShowCanvasModal] = useState(false);
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showVintageModal, setShowVintageModal] = useState(false);
  // Mini Canvas modal state
  const [canvasLang, setCanvasLang] = useState({ arabic: false, urdu: false });
  const [canvasName, setCanvasName] = useState("");
  const [canvasTheme, setCanvasTheme] = useState("");
  const stickerCategories = [
    "Medical", "Computer Science", "Banking", "Bollywood", "Hollywood", "Customise Your Own"
  ];
  const canvasOptions = [
    "Your Name in Arabic", "Your Name in Urdu"
  ];
  const cardOptions = [
    "Business Card", "Event Invitation", "Custom Greeting Card"
  ];
  const vintageOptions = [
    "Classic Cream", "Antique Brown", "Handmade Deckle Edge", "Floral Print", "Custom Message Paper"
  ];

  return (
    <main className="max-w-6xl mx-auto py-8 sm:py-12 px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-6 sm:mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {/* Sticker Choices Grid */}
        <div className="bg-slate-50 rounded-lg shadow-lg overflow-hidden border-2 border-emerald-200 flex flex-col cursor-pointer" onClick={() => setShowStickerModal(true)}>
          <div className="h-36 sm:h-48 flex items-center justify-center bg-gradient-to-r from-indigo-200 to-emerald-100">
            <span className="text-lg sm:text-2xl font-bold text-indigo-700"> Laptop Stickers</span>
          </div>
          <div className="p-3 sm:p-4 text-center text-slate-500 text-sm">Click to choose your sticker category!</div>
        </div>

        {/* Mini Canvas Grid */}
        <div className="bg-slate-50 rounded-lg shadow-lg overflow-hidden border-2 border-emerald-200 flex flex-col cursor-pointer" onClick={() => setShowCanvasModal(true)}>
          <div className="h-36 sm:h-48 flex items-center justify-center bg-gradient-to-r from-emerald-200 to-indigo-100">
            <span className="text-lg sm:text-2xl font-bold text-emerald-700">Mini Canvas Names</span>
          </div>
          <div className="p-3 sm:p-4 text-center text-slate-500 text-sm">Click to choose your canvas option!</div>
        </div>

        {/* Custom Printing Cards Grid */}
        <div className="bg-slate-50 rounded-lg shadow-lg overflow-hidden border-2 border-emerald-200 flex flex-col cursor-pointer items-center" onClick={() => setShowCardsModal(true)}>
          <div className="h-36 sm:h-48 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-emerald-100 w-full">
            <span className="text-lg sm:text-2xl font-bold text-indigo-700 text-center w-full">Custom Printing Cards</span>
          </div>
          <div className="p-3 sm:p-4 text-center text-slate-500 text-sm w-full">Click to choose your card type!</div>
        </div>

        {/* Vintage Papers for Letters Grid */}
        <div className="bg-slate-50 rounded-lg shadow-lg overflow-hidden border-2 border-emerald-200 flex flex-col cursor-pointer" onClick={() => setShowVintageModal(true)}>
          <div className="h-36 sm:h-48 flex items-center justify-center bg-gradient-to-r from-yellow-100 to-amber-200">
            <span className="text-lg sm:text-2xl font-bold text-amber-700">Vintage Papers</span>
          </div>
          <div className="p-3 sm:p-4 text-center text-slate-500 text-sm">Click to choose your vintage paper style!</div>
        </div>
      </div>

      {/* Sticker Category Modal */}
      {showStickerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-indigo-200">
            <button onClick={() => setShowStickerModal(false)} className="absolute top-2 right-2 text-indigo-600 hover:text-emerald-600 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Choose Sticker Category</h2>
            <div className="flex flex-col gap-3">
              {stickerCategories.map((cat, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition text-left"
                  onClick={() => {
                    setShowStickerModal(false);
                    if (onStickerCategory) return onStickerCategory(cat);
                    if (onProductClick) return onProductClick(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mini Canvas Modal */}
      {showCanvasModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-emerald-200">
            <button onClick={() => setShowCanvasModal(false)} className="absolute top-2 right-2 text-emerald-600 hover:text-indigo-600 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Mini Canvas Customization</h2>
            <form className="flex flex-col gap-4 text-black">
              <div>
                <label className="block font-semibold mb-2 text-emerald-700">Choose Language:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="lang-arabic" checked={canvasLang.arabic} onChange={e => setCanvasLang(l => ({ ...l, arabic: e.target.checked }))} /> Arabic
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="lang-urdu" checked={canvasLang.urdu} onChange={e => setCanvasLang(l => ({ ...l, urdu: e.target.checked }))} /> Urdu
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-emerald-700">Write Your Name (in selected language):</label>
                <input type="text" className="px-4 py-2 rounded border border-emerald-200 w-full" placeholder="Type your name here..." value={canvasName} onChange={e => setCanvasName(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-emerald-700">Canvas Theme:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="theme" value="black" checked={canvasTheme === 'black'} onChange={e => setCanvasTheme(e.target.value)} /> Black
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="theme" value="white" checked={canvasTheme === 'white'} onChange={e => setCanvasTheme(e.target.value)} /> White
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="theme" value="multicolor" checked={canvasTheme === 'multicolor'} onChange={e => setCanvasTheme(e.target.value)} /> Multicolor
                  </label>
                </div>
              </div>
              <div className="text-sm text-slate-700 mt-2">
                <div><b>Selected Language:</b> {canvasLang.arabic && 'Arabic '}{canvasLang.urdu && 'Urdu '}</div>
                <div><b>Name:</b> {canvasName}</div>
                <div><b>Theme:</b> {canvasTheme}</div>
              </div>
              <button
                type="button"
                className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-indigo-400 transition"
                onClick={() => {
                  if (!canvasName || (!canvasLang.arabic && !canvasLang.urdu) || !canvasTheme) return;
                  const lang = [canvasLang.arabic ? 'Arabic' : '', canvasLang.urdu ? 'Urdu' : ''].filter(Boolean).join(', ');
                  onAddToCart({
                    name: `Mini Canvas (${lang}) - ${canvasName}`,
                    price: "$12.99",
                    theme: canvasTheme,
                    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                  });
                  setShowCanvasModal(false);
                  setCanvasLang({ arabic: false, urdu: false });
                  setCanvasName("");
                  setCanvasTheme("");
                }}
              >Add to Cart</button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Printing Cards Modal */}
      {showCardsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-indigo-200">
            <button onClick={() => setShowCardsModal(false)} className="absolute top-2 right-2 text-indigo-600 hover:text-emerald-600 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Choose Card Type</h2>
            <div className="flex flex-col gap-3">
              {cardOptions.map((opt, idx) => (
                <button key={idx} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition text-left">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vintage Papers Modal */}
      {showVintageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-amber-200">
            <button onClick={() => setShowVintageModal(false)} className="absolute top-2 right-2 text-amber-700 hover:text-yellow-600 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-amber-700 mb-4">Choose Vintage Paper Style</h2>
            <div className="flex flex-col gap-3">
              {vintageOptions.map((opt, idx) => (
                <button key={idx} className="px-4 py-2 bg-amber-200 text-amber-900 rounded hover:bg-yellow-200 transition text-left">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductGrid;



