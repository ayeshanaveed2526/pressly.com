import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CustomCardDesigner({ onClose, onAddToCart }) {
  const categories = ['Birthday', 'Wedding', 'Vintage', 'Aesthetic', 'Thank-you', 'Anniversary', 'Congratulations'];
  const [selected, setSelected] = useState(categories[0]);
  const [message, setMessage] = useState('');
  const [animKey, setAnimKey] = useState(0);
  const [typing, setTyping] = useState(false);
  const typingTimer = useRef(null);

  // trigger a small animation when message or category changes
  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [selected]);

  useEffect(() => {
    // when message changes, flag typing and clear after a short delay so CSS can animate
    setTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 250);
    return () => { if (typingTimer.current) clearTimeout(typingTimer.current); };
  }, [message]);

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
    // save custom message to Firestore for backend records
    (async () => {
      try {
        if (message && message.trim()) {
          await addDoc(collection(db, 'customMessages'), {
            category: selected,
            message: message.trim(),
            itemId: id,
            createdAt: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error('Failed to save custom message to Firestore:', err);
      }
    })();
    onClose && onClose();
  };

  const fontByCategory = (cat) => {
    if (/wedding|thank/i.test(cat)) return 'text-handwritten';
    if (/vintage|aesthetic|anniversary|congrat/i.test(cat)) return 'text-typewriter';
    return 'text-handwritten';
  };

  return (
    <div className="fixed inset-0 z-50 designer-fullscreen">
      <div className="designer-backdrop" onClick={onClose} />
      <div className="designer-shell">
        <header className="designer-top">
          <div className="designer-title">
            <h2 className="text-2xl font-pressly text-ink">Custom Card Designer</h2>
            <p className="text-sm text-ink/80">Create a vintage-style card with a live handwritten preview</p>
          </div>
          <div className="designer-actions">
            <button onClick={onClose} className="btn-vintage-subtle">Close</button>
          </div>
        </header>

        <nav className="designer-cats" aria-label="Card categories">
          <div className="cat-scroll">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`cat-pill ${selected === cat ? 'active' : ''}`}
                aria-pressed={selected === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <main className="designer-main">
          <div className="designer-stage">
            <div key={`${selected}-${animKey}`} className={`designer-card card-folded ${typing ? 'typing' : ''}`} role="img" aria-label={`${selected} card preview`}> 
              <div className="card-left" aria-hidden>
                {/* decorative left inner page */}
                <div className="paper-texture" />
              </div>
              <div className={`card-right ${selected.toLowerCase().replace(/[^a-z]/g,'-')}`}>
                <div className={`card-inner-text ${fontByCategory(selected)}`}>
                  <div className={`designer-text ${typing ? 'text-animate' : ''}`} aria-live="polite">{message ? <span style={{whiteSpace:'pre-wrap'}}>{message}</span> : <span className="designer-placeholder">Your message will appear here</span>}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="designer-controls">
            <label className="block text-sm text-ink mb-2">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a heartfelt message..."
              className="w-full px-4 py-3 rounded border border-amber-200 text-ink bg-white"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={handleAdd} className="btn-vintage">Add to Cart</button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
