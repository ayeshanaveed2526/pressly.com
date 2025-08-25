import React, { useState, useEffect } from 'react';

export default function CustomCardDesigner({ onClose, onAddToCart }) {
  const categories = ['Birthday', 'Wedding', 'Vintage', 'Aesthetic', 'Thank-you', 'Anniversary', 'Congratulations'];
  const [selected, setSelected] = useState(categories[0]);
  const [message, setMessage] = useState('');
  const [animKey, setAnimKey] = useState(0);

  // trigger a small animation when message changes
  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [message, selected]);

  const handleAdd = () => {
    const id = `designer-${selected.toLowerCase()}-${Date.now()}`;
    onAddToCart && onAddToCart({
      id,
      name: `${selected} Card (Custom)`,
      price: '350 Rs',
      priceValue: 350,
      quantity: 1,
      note: message.trim(),
      image: '',
    });
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-cream rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-pressly text-ink">Create a Custom Card</h3>
            <div className="hidden sm:flex items-center gap-2 text-sm text-ink/80">Vintage & handcrafted styles</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-ink hover-text-vintage text-xl font-bold">×</button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left: categories */}
            <div className="w-full sm:w-64">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelected(cat)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${selected === cat ? 'bg-[#efd9ca] shadow text-ink' : 'bg-white text-ink/90'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-ink/80">Choose a category to change the card style. The preview updates smoothly.</div>
            </div>

            {/* Center: card mockup */}
            <div className="flex-1 flex flex-col items-center">
              <div className="designer-stage w-full flex justify-center">
                <div key={selected + '-' + animKey} className={`designer-card paper-card taped transition-card`}>
                  <div className={`designer-inner designer-${selected.toLowerCase().replace(/[^a-z]/g,'-')}`}>
                    <div className="designer-text" aria-live="polite">{message || (<span className="designer-placeholder">Your message will appear here</span>)}</div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-4">
                <label className="block text-sm text-ink mb-2">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type a heartfelt message..."
                  className="w-full px-3 py-2 rounded border border-amber-200 text-ink bg-white"
                />
                <div className="mt-3 flex gap-2 justify-end">
                  <button onClick={handleAdd} className="btn-vintage">Add to Cart</button>
                  <button onClick={onClose} className="btn-vintage-subtle">Close</button>
                </div>
              </div>
            </div>

            {/* Right: preview details */}
            <div className="w-full sm:w-56">
              <div className="text-sm text-ink font-medium mb-2">Selected</div>
              <div className="p-3 bg-white rounded border border-amber-100 text-ink">{selected} card — customizable</div>
              <div className="mt-4 text-sm text-ink/80">Tip: Keep messages short for best visual fit. Use line breaks for multi-line design.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
