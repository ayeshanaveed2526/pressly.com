import React from "react";

function ProductDetails({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-pink-500 hover:text-orange-500 text-2xl font-bold">&times;</button>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold text-pink-600 mb-2">{product.name}</h2>
        <p className="text-lg text-orange-500 font-bold mb-4">{product.price}</p>
        <p className="text-gray-700 mb-4">This is a beautiful product to decorate your laptop or space. Add it to your cart now!</p>
        <button className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-orange-400 transition">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;
