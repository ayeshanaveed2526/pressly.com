import React, { useState } from "react";

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function themedImage(seriesOrName) {
  // Use Unsplash dynamic source for a themed/character thumbnail. This returns a relevant photo.
  // It's a good fallback when you don't have a local image.
  const q = encodeURIComponent(seriesOrName);
  return `https://source.unsplash.com/600x360/?${q}`;
}

function StickerCard({ item, onAdd, added }) {
  const imgSrc = item.image || (item.series ? `/stickers/${slugify(item.series)}.png` : `/stickers/${slugify(item.name)}.png`);
  return (
    <div className="relative rounded-lg overflow-hidden p-3 card-gradient card-animate card-anim-subtle">
      <div className="w-full h-28 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" onError={(e)=>{ try{ e.target.onerror=null; const altSrc = imgSrc.replace(/\.png$/, '.svg'); e.target.src = altSrc; }catch(err){ e.target.style.display='none'; } }} />
      </div>
      <div className="w-full mt-2">
        <div className="font-semibold text-sm card-contrast">{item.name}</div>
        <div className="text-xs card-contrast">Size: {item.size}</div>
        <div className="text-sm font-bold card-contrast mt-1">{item.price}</div>
      </div>
      <button
        onClick={() => onAdd(item)}
        disabled={added}
        className={`mt-3 w-full px-3 py-1 rounded text-sm transition ${added ? 'bg-emerald-500 text-white cursor-default' : 'btn-vintage'}`}
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
  const [enteredNames, setEnteredNames] = useState({});
  const [addedCustomIds, setAddedCustomIds] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [expandedSeries, setExpandedSeries] = useState(null);
  const [seriesIndex, setSeriesIndex] = useState({});
  const sizes = ["2x2 in", "2.5x2.5 in", "3x3 in", "4x3 in"];
  const stickers = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `${category} Sticker ${i + 1}`,
    price: "40 Rs",
    size: sizes[i % sizes.length],
  }));
  // 10 demo styles for custom name stickers
  const styles = Array.from({ length: 10 }).map((_, i) => ({
    id: `style-${i+1}`,
    name: `Style ${i + 1}`,
    preview: `Preview ${i + 1}`,
  }));
  // Hollywood subcategories (series / famous franchises)
  const hollywoodSeries = [
    'Marvel', 'Avengers', 'Breaking Bad', 'Better Call Saul', 'Dark', 'Money Heist', 'Squid Game', 'Game of Thrones', 'Friends'
  ];

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-1 btn-vintage-subtle rounded-md text-sm flex items-center gap-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-medium">Back</span>
        </button>
  <h2 className="text-lg sm:text-2xl font-bold text-vintage">{category} Stickers</h2>
        <div />
      </div>

  <div className="mb-4 text-sm text-amber-700 font-semibold flex items-center justify-between pastel-border p-3 rounded">
        <div>if you want the bundle of 4 in 150 Rs</div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setBundleSelection(stickers.slice(0,4).map(s=>s.id)); setShowBundleModal(true); }} className="px-3 py-1 bg-amber-200 rounded text-sm">Create Bundle</button>
        </div>
      </div>

          {/* Hollywood series subcategories */}
          {category === 'Hollywood' && (
            <section className="mt-4 pastel-border p-3 rounded">
              <h3 className="text-lg font-bold mb-3">Popular Series & Franchises — Bundles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hollywoodSeries.map((s) => (
                  <div key={s} className="relative rounded-lg overflow-hidden p-4 card-gradient card-animate card-anim-subtle flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={themedImage(s)} alt={s} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium card-contrast">{s}</div>
                        <div className="text-sm text-ink/70">Curated sticker bundle packs for {s} fans.</div>
                      </div>
                      <div className="flex-shrink-0">
                        <button onClick={() => setExpandedSeries(prev => prev === s ? null : s)} className="px-3 py-1 btn-vintage-subtle">{expandedSeries === s ? 'Close' : 'View Bundle'}</button>
                      </div>
                    </div>

                    {expandedSeries === s && (
                      <div className="mt-3 border-t pt-3">
                        <SeriesBundle
                          series={s}
                          stickers={stickers.slice(0,12).map((st,i)=>({ ...st, name: `${s} - ${st.name}`, image: themedImage(s + ' sticker ' + (i+1)) }))}
                          currentIndex={seriesIndex[s] || 0}
                          onPrev={() => setSeriesIndex(si => ({ ...si, [s]: Math.max(0, (si[s] || 0) - 1) }))}
                          onNext={() => setSeriesIndex(si => ({ ...si, [s]: Math.min(11, (si[s] || 0) + 1) }))}
                          onAddPack={(count) => {
                            const packId = `${slugify(s)}-pack-${count}-${Date.now()}`;
                            const packItems = stickers.slice(0, count).map((it, idx) => `${s} - ${it.name}`);
                            const priceValue = count === 5 ? Math.round(5 * 40 * 0.9) : Math.round(10 * 40 * 0.85);
                            const priceLabel = `${priceValue} Rs`;
                            if (onAddToCart) onAddToCart({ id: packId, name: `${s} Sticker Pack (${count})`, price: priceLabel, priceValue, quantity: 1, items: packItems });
                            setAddedIds(prev => prev.concat([]));
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

      {/* If a series is selected, show stickers for that series */}
  {/* keep selectedSeries view for legacy, but bundles are primary */}

      {/* Show custom-name styles only when in the 'Customise Your Own' category */}
      {category === 'Customise Your Own' ? (
        <section className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Customise your name — choose a style</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {styles.map(st => {
              const val = enteredNames[st.id] || '';
              const customId = `custom-${st.id}-${val.trim()}`;
              const found = addedCustomIds.find(a => a.id === customId);
              const qty = found ? found.quantity : 0;
              return (
                <div key={st.id} className="bg-white p-3 rounded-lg shadow flex flex-col">
                  <div className="h-28 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">{st.preview}</div>
                  <div className="mt-3">
                    <div className="text-sm font-medium text-vintage">{st.name}</div>
                    <div className="text-sm text-emerald-700 font-bold mt-1">100 Rs</div>
                    <input value={val} onChange={e => setEnteredNames(prev => ({...prev, [st.id]: e.target.value}))} placeholder="Enter name (e.g. Alex)" className="w-full border rounded px-3 py-2 mt-2" />
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">Qty</div>
                        <button disabled={!val.trim()} onClick={() => {
                          if (!val.trim()) return;
                          const itemName = `${val.trim()} - ${st.name} ${category} Sticker`;
                          const id = customId;
                          if (onAddToCart) onAddToCart({ id, name: itemName, price: '100 Rs', priceValue: 100, quantity: 1, style: st.name });
                          setAddedCustomIds(prev => {
                            const ex = prev.find(p => p.id === id);
                            if (ex) return prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p);
                            return [...prev, { id, quantity: 1 }];
                          });
                        }} className={`px-3 py-1 rounded text-white ${!val.trim() ? 'bg-gray-400 cursor-not-allowed' : 'btn-vintage'}`}>
                          +
                        </button>
                        <div className="px-3 py-1 border rounded text-sm">{qty}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        /* non-custom categories: show regular sticker grid with Add to Cart buttons */
        <section className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {stickers.map(st => (
              <StickerCard key={st.id} item={st} added={addedIds.includes(st.id)} onAdd={(item) => {
                if (onAddToCart) onAddToCart({ id: item.id, name: item.name, price: item.price, priceValue: item.priceValue || 40, quantity: 1 });
                setAddedIds(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
              }} />
            ))}
          </div>
        </section>
      )}

  {/* name-input modal removed — inline inputs used instead */}

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

function SeriesBundle({ series, stickers = [], currentIndex = 0, onPrev, onNext, onAddPack }) {
  const current = stickers[currentIndex] || stickers[0];
  return (
    <div className="series-bundle">
      <div className="flex items-center gap-4">
        <div className="w-28 h-20 bg-white rounded overflow-hidden shadow flex items-center justify-center">
          <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">{current.name}</div>
          <div className="text-sm text-ink/70">{current.size || 'Sticker'}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="px-3 py-1 bg-white border rounded">‹</button>
          <button onClick={onNext} className="px-3 py-1 bg-white border rounded">›</button>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => onAddPack(5)} className="px-3 py-2 btn-vintage">Pack of 5</button>
        <button onClick={() => onAddPack(10)} className="px-3 py-2 btn-vintage-subtle">Pack of 10</button>
      </div>
    </div>
  );
}
