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
  <button onClick={onClose} className="absolute top-2 right-2 text-vintage-strong hover-text-vintage text-xl sm:text-2xl font-bold">&times;</button>
  <h2 className="text-lg sm:text-2xl font-bold text-vintage mb-3 sm:mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 text-sm">Your cart is empty.</p>
            <button
              onClick={() => { onClose(); if (navigate) navigate('/products'); }}
              className="btn-vintage"
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
                      <button onClick={() => decrement(idx)} className="px-2 py-1 bg-[#efd9ca] text-vintage rounded hover:bg-[#e6cfb9] transition text-xs sm:text-sm">-</button>
                      <div className="px-2 py-1 border rounded text-sm">{item.quantity || 1}</div>
                      <button onClick={() => typeof onIncrement === 'function' ? onIncrement(idx) : null} className="px-2 py-1 bg-[#efd9ca] text-vintage rounded hover:bg-[#e6cfb9] transition text-xs sm:text-sm">+</button>
                    </div>
                    <span className="text-orange-500 font-bold text-sm sm:text-base">Rs {lineTotal(item)}</span>
                    <button onClick={() => onRemove(idx)} className="px-2 py-1 bg-[#efd9ca] text-vintage rounded hover:bg-[#e6cfb9] transition text-xs sm:text-sm">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="text-sm">Subtotal: Rs {cartItems.reduce((s, it) => s + lineTotal(it), 0)}</div>
            </div>
            <button
              className="mt-4 sm:mt-6 w-full px-3 py-2 sm:px-4 sm:py-2 btn-vintage"
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
