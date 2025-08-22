import React from 'react';

function FeaturedProducts({ products = [] }) {
  const demo = [
    { id: 1, name: 'Laptop Sticker Pack', price: 'Rs 350', image: '/assets/demo-sticker-1.jpg' },
    { id: 2, name: 'Mini Canvas Art', price: 'Rs 800', image: '/assets/demo-canvas-1.jpg' },
    { id: 3, name: 'Custom Name Sticker', price: 'Rs 100', image: '/assets/demo-sticker-2.jpg' },
    { id: 4, name: 'Inspirational Canvas', price: 'Rs 1200', image: '/assets/demo-canvas-2.jpg' },
  ];
  const items = products.length ? products : demo;

  return (
    <section className="featured-section max-w-7xl mx-auto px-4 py-12">
  <h3 className="text-xl sm:text-2xl md:text-3xl font-montserrat font-bold text-ink mb-6 sm:mb-8 text-center">Featured Products</h3>
      <div className="polaroid-grid">
        {items.map((p, i) => (
          <figure
            key={p.id || i}
            className="polaroid"
            style={{ ['--tilt']: `${((i % 5) - 2) * 1.8}deg` }}
          >
            <div className="polaroid-frame">
              <img src={p.image} alt={p.name} className="polaroid-img" />
              <div className="polaroid-caption">
                <div className="product-name">{p.name}</div>
               
              </div>
            </div>

            <span className="tape tape-top-left" aria-hidden />
            <span className="tape tape-bottom-right" aria-hidden />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
