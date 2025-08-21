import React, { useState } from "react";

function StickerCard({ item, onAdd, added }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col items-start gap-2">
      <div className="w-full h-28 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">Image</div>
      <div className="w-full">
        <div className="font-semibold text-sm text-indigo-700">{item.name}</div>
        <div className="text-xs text-gray-600">Size: {item.size}</div>
        <div className="text-sm font-bold text-emerald-700 mt-1">{item.price}</div>
      </div>
      <button
        onClick={() => onAdd(item)}
        disabled={added}
        className={`mt-auto w-full px-3 py-1 rounded text-sm transition ${added ? 'bg-emerald-500 text-white cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      >
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default function StickerCategoryPage({ category, onBack, onAddToCart }) {
  // build 20 demo stickers
  const [addedIds, setAddedIds] = useState([]);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [bundleSelection, setBundleSelection] = useState([]);
  const sizes = ["2x2 in", "2.5x2.5 in", "3x3 in", "4x3 in"];
  const stickers = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `${category} Sticker ${i + 1}`,
    price: "40 Rs",
    size: sizes[i % sizes.length],
  }));

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-1 bg-slate-200 rounded text-sm">← Back</button>
        <h2 className="text-lg sm:text-2xl font-bold text-indigo-700">{category} Stickers</h2>
        <div />
      </div>

      <div className="mb-4 text-sm text-amber-700 font-semibold flex items-center justify-between">
        <div>if you want the bundle of 4 in 150 Rs</div>
        <button onClick={() => { setBundleSelection(stickers.slice(0,4).map(s=>s.id)); setShowBundleModal(true); }} className="px-3 py-1 bg-amber-200 rounded text-sm">Create Bundle</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stickers.map((s) => (
          <StickerCard
            key={s.id}
            item={s}
            onAdd={(item) => {
              if (onAddToCart) onAddToCart({ name: item.name, price: item.price, priceValue: 40, id: item.id });
              setAddedIds(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
            }}
            added={addedIds.includes(s.id)}
          />
        ))}
      </div>

      {/* Bundle Modal */}
      {showBundleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-3">Select 4 stickers for the bundle (150 Rs)</h3>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto mb-4">
              {stickers.map(s => (
                <label key={s.id} className="flex items-center gap-2 p-2 border rounded">
                  <input type="checkbox" checked={bundleSelection.includes(s.id)} onChange={e => {
                    if (e.target.checked) {
                      if (bundleSelection.length < 4) setBundleSelection(prev => [...prev, s.id]);
                    } else {
                      setBundleSelection(prev => prev.filter(id => id !== s.id));
                    }
                  }} />
                  <div className="text-sm">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.size}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 bg-slate-200 rounded" onClick={() => setShowBundleModal(false)}>Cancel</button>
              <button className={`px-3 py-1 rounded text-white ${bundleSelection.length === 4 ? 'bg-emerald-600' : 'bg-gray-400 cursor-not-allowed'}`} disabled={bundleSelection.length !== 4} onClick={() => {
                const items = stickers.filter(s => bundleSelection.includes(s.id));
                if (onAddToCart) onAddToCart({ name: `Bundle 4x ${category} Stickers`, price: '150 Rs', priceValue: 150, items: items.map(it => it.name) });
                setShowBundleModal(false);
                setBundleSelection([]);
              }}>Add Bundle to Cart</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
