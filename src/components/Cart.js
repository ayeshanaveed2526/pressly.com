import React from "react";

function Cart({ cartItems, onRemove, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-pink-500 hover:text-orange-500 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between mb-4">
                <span className="font-semibold text-pink-700">{item.name}</span>
                <span className="text-orange-500 font-bold">{item.price}</span>
                <button onClick={() => onRemove(idx)} className="ml-4 px-2 py-1 bg-pink-200 text-pink-700 rounded hover:bg-orange-200 transition">Remove</button>
              </li>
            ))}
          </ul>
        )}
        <button className="mt-6 w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-orange-400 transition">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
