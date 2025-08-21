import React from "react";

const products = [
  {
    name: "Laptop Sticker Pack",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mini Canvas Art",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Custom Sticker",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Inspirational Canvas",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7?auto=format&fit=crop&w=400&q=80",
  },
];

function ProductGrid({ products, onProductClick }) {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="bg-yellow-50 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform border-2 border-pink-200 cursor-pointer" onClick={() => onProductClick(product)}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-pink-700">{product.name}</h3>
              <p className="text-orange-500 font-bold mt-2">{product.price}</p>
              <button className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-orange-400 transition" onClick={e => {e.stopPropagation(); onProductClick(product);}}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

