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
    <div className="paper-card taped rounded-xl shadow-lg p-4 sm:p-8 max-w-md w-full relative">
  <button onClick={onClose} className="absolute top-2 right-2 text-ink hover-text-vintage text-xl sm:text-2xl font-bold">&times;</button>
  <h2 className="text-lg sm:text-2xl font-pressly text-ink mb-3 sm:mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
            <p className="text-ink text-sm">Your cart is empty.</p>
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
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(idx)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-200 bg-white text-ink hover:bg-[#efe0d3] transition-shadow shadow-sm"
                        >
                          <span className="text-lg leading-none">−</span>
                        </button>
                        <div className="min-w-[48px] text-center px-2 py-1 border border-amber-200 rounded-md bg-[#fffaf3] text-ink font-medium shadow-inner">{item.quantity || 1}</div>
                        <button
                          onClick={() => typeof onIncrement === 'function' ? onIncrement(idx) : null}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-200 bg-white text-ink hover:bg-[#efe0d3] transition-shadow shadow-sm"
                        >
                          <span className="text-lg leading-none">+</span>
                        </button>
                      </div>
                      <div className="ml-2 text-ink font-bold text-sm sm:text-base">Rs {lineTotal(item)}</div>
                      <button onClick={() => onRemove(idx)} className="px-3 py-1 btn-vintage-subtle rounded ml-2">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-ink">
                <span>Subtotal</span>
                <span>Rs {cartItems.reduce((s, it) => s + lineTotal(it), 0)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink">
                <span>Estimated Shipping</span>
                <span>Rs 100</span>
              </div>
              <div className="flex justify-between text-base font-bold text-ink">
                const subtotal = cartItems.reduce((s, it) => s + lineTotal(it), 0);

                // simple shipping tiers
                const estimateShipping = (amount) => {
                  if (amount === 0) return 0;
                  if (amount < 500) return 100;
                  if (amount < 1500) return 150;
                  return 0; // free over 1500
                };

                const [shippingOption, setShippingOption] = React.useState(() => {
                  const est = estimateShipping(subtotal);
                  return est === 0 ? 'Free' : 'Standard';
                });

                const shippingCost = shippingOption === 'Free' ? 0 : (shippingOption === 'Express' ? 250 : estimateShipping(subtotal));

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="paper-card taped bg-cream rounded-xl shadow-lg p-4 sm:p-6 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-ink hover-text-vintage text-xl sm:text-2xl font-bold">&times;</button>
                <h2 className="text-lg sm:text-2xl font-pressly text-ink mb-3 sm:mb-4">Your Cart</h2>

                      {cartItems.length === 0 ? (
                          <div className="flex flex-col items-center gap-4">
                          <p className="text-ink text-sm">Your cart is empty.</p>
                          <button
                            onClick={() => { onClose(); if (navigate) navigate('/products'); }}
                            className="btn-vintage"
                          >
                            Browse Products
                          </button>
                        </div>
                      ) : (
                        <>
                          <ul>
                            {cartItems.map((item, idx) => (
                              <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-ink text-sm sm:text-base">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => decrement(idx)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#efd9ca] text-ink hover:bg-[#e6cfb9] transition shadow">-</button>
                                    <div className="px-3 py-1 border rounded-full text-sm bg-white shadow-sm">{item.quantity || 1}</div>
                                    <button onClick={() => typeof onIncrement === 'function' ? onIncrement(idx) : null} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#efd9ca] text-ink hover:bg-[#e6cfb9] transition shadow">+</button>
                                  </div>
                                  <span className="text-orange-500 font-bold text-sm sm:text-base">Rs {lineTotal(item)}</span>
                                  <button onClick={() => onRemove(idx)} className="px-3 py-1 bg-[#efe6de] text-ink rounded hover:bg-[#e6cfb9] transition text-xs sm:text-sm">Remove</button>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 border-t pt-3">
                            <div className="flex justify-between text-sm text-ink"><span>Subtotal</span><span>Rs {subtotal}</span></div>
                            <div className="mt-2">
                              <label className="block text-sm text-ink mb-1">Shipping option</label>
                              <div className="flex gap-2">
                                <button onClick={() => setShippingOption('Standard')} className={`px-2 py-1 rounded ${shippingOption === 'Standard' ? 'bg-[#efd9ca] shadow' : 'bg-white'} text-sm`}>Standard</button>
                                <button onClick={() => setShippingOption('Express')} className={`px-2 py-1 rounded ${shippingOption === 'Express' ? 'bg-[#efd9ca] shadow' : 'bg-white'} text-sm`}>Express</button>
                                <button onClick={() => setShippingOption(subtotal >= 1500 ? 'Free' : 'Standard')} className={`px-2 py-1 rounded ${shippingOption === 'Free' ? 'bg-[#efd9ca] shadow' : 'bg-white'} text-sm`}>Auto</button>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">Estimated shipping: Rs {shippingCost} · Free over Rs 1500</div>
                            </div>
                            <div className="flex justify-between mt-3 font-semibold text-ink"><span>Total</span><span>Rs {subtotal + shippingCost}</span></div>
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
