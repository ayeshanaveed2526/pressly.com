import React, { useRef } from 'react';

const demoItems = [
  { id: 1, name: 'Sticker Pack A', price: 'Rs 350', image: '/assets/demo-sticker-1.jpg' },
  { id: 2, name: 'Mini Canvas A', price: 'Rs 800', image: '/assets/demo-canvas-1.jpg' },
  { id: 3, name: 'Custom Sticker', price: 'Rs 100', image: '/assets/demo-sticker-2.jpg' },
  { id: 4, name: 'Inspirational Canvas', price: 'Rs 1200', image: '/assets/demo-canvas-2.jpg' },
  { id: 5, name: 'Sticker Pack B', price: 'Rs 420', image: '/assets/demo-sticker-1.jpg' },
  { id: 6, name: 'Mini Canvas B', price: 'Rs 950', image: '/assets/demo-canvas-1.jpg' },
  { id: 7, name: 'Custom Canvas', price: 'Rs 1500', image: '/assets/demo-canvas-2.jpg' },
];

export default function FeaturedScroller({ items = demoItems }) {
  const trackRef = useRef(null);

  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    // card width is 25% viewport of the track container (4 visible), include gap
    const card = el.querySelector('.scroll-card');
    const gap = 24; // px gap approximate (matches CSS)
    const scrollAmount = (card ? card.getBoundingClientRect().width : el.clientWidth / 4) + gap;
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="featured-scroll-section max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="featured-title font-pressly text-2xl">Featured Collections</h3>
        <div className="flex gap-2">
          <button aria-label="scroll left" className="scroll-btn" onClick={() => scrollBy(-1)}>◀</button>
          <button aria-label="scroll right" className="scroll-btn" onClick={() => scrollBy(1)}>▶</button>
        </div>
      </div>

      <div className="scroll-track" ref={trackRef}>
        {items.map((p) => (
          <article key={p.id} className="scroll-card polaroid" style={{ ['--tilt']: '0deg' }}>
            <div className="polaroid-frame" style={{ backgroundImage: "url('./assets/vintagebg.png')", backgroundSize: 'cover' }}>
              <img src={p.image} alt={p.name} className="polaroid-img" />
              <div className="polaroid-caption">
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price}</div>
              </div>
            </div>
            <span className="tape tape-top-left" aria-hidden />
            <span className="tape tape-bottom-right" aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}
