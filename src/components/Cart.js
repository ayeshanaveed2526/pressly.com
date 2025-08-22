import React from "react";

function Cart({ cartItems, onRemove, onClose, onCheckout, navigate, onIncrement, onDecrement }) {
  const decrement = (idx) => {
    if (typeof onDecrement === 'function') return onDecrement(idx);
    // fallback: if not provided, call onRemove when quantity <= 1
    const item = cartItems[idx];
    if (!item) return;
    if ((item.quantity || 1) <= 1) return onRemove(idx);
    return onRemove(idx);
  };

  const lineTotal = (it) => {
    const q = it.quantity || 1;
    const pv = it.priceValue ? Number(it.priceValue) : (typeof it.price === 'string' ? Number(it.price.replace(/[^0-9.]/g,'')) : 0);
    return pv * q;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-pink-500 hover:text-orange-500 text-xl sm:text-2xl font-bold">&times;</button>
        <h2 className="text-lg sm:text-2xl font-bold text-pink-600 mb-3 sm:mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 text-sm">Your cart is empty.</p>
            <button
              onClick={() => { onClose(); if (navigate) navigate('/products'); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Buy Items
            </button>
          </div>
        ) : (
          <>
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-pink-700 text-sm sm:text-base">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button onClick={() => decrement(idx)} className="px-2 py-1 bg-pink-200 text-pink-700 rounded hover:bg-orange-200 transition text-xs sm:text-sm">-</button>
                      <div className="px-2 py-1 border rounded text-sm">{item.quantity || 1}</div>
                      <button onClick={() => typeof onIncrement === 'function' ? onIncrement(idx) : null} className="px-2 py-1 bg-emerald-200 text-emerald-700 rounded hover:bg-emerald-300 transition text-xs sm:text-sm">+</button>
                    </div>
                    <span className="text-orange-500 font-bold text-sm sm:text-base">Rs {lineTotal(item)}</span>
                    <button onClick={() => onRemove(idx)} className="px-2 py-1 bg-pink-200 text-pink-700 rounded hover:bg-orange-200 transition text-xs sm:text-sm">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="text-sm">Subtotal: Rs {cartItems.reduce((s, it) => s + lineTotal(it), 0)}</div>
            </div>
            <button
              className="mt-4 sm:mt-6 w-full px-3 py-2 sm:px-4 sm:py-2 bg-pink-500 text-white rounded hover:bg-orange-400 transition text-sm"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
