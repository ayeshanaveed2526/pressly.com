import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function OrderForm({ onClose, cartItems = [] }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    product: "",
    details: "",
    payment: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.address) newErrors.address = "Address is required.";
    if (!form.phone) newErrors.phone = "Phone is required.";
    if (!form.product) newErrors.product = "Product/Category is required.";
    if (!form.payment) newErrors.payment = "Please select a payment method.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setShowSummary(true);
    setErrors({});
  };

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirmOrder = async () => {
    // confirm and submit order to Firestore
    setLoading(true);
    setErrorMsg("");
    console.log("Order submit attempted", form);
    try {
      // compute totals (use the precomputed values)
  const delivery = shippingCost;
  const total = subtotal + delivery;
      const data= await addDoc(collection(db, "orders"), {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        paymentMethod: form.payment,
        product: form.product,
        details: form.details,
        cart: items,
        subtotal,
        delivery,
        total,
        createdAt: new Date().toISOString()
      });
      console.log("Order submitted with ID:", data);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg("Failed to submit order. Please try again.");
      console.error("Firestore error:", err);
    }
    setLoading(false);
  };

  // compute items and subtotal for UI (and reuse in confirm handler)
  const items = cartItems.map(ci => ({ name: ci.name, price: ci.price || (ci.priceValue ? `${ci.priceValue} Rs` : ci.price), quantity: ci.quantity || 1 }));
  const subtotal = cartItems.reduce((sum, it) => {
    const pv = it.priceValue ? Number(it.priceValue) : (typeof it.price === 'string' ? Number(it.price.replace(/[^0-9.]/g,'')) : 0);
    const q = it.quantity || 1;
    return sum + pv * q;
  }, 0);

  // shipping estimator (same logic as Cart)
  const estimateShipping = (amount) => {
    if (amount === 0) return 0;
    if (amount < 500) return 100;
    if (amount < 1500) return 150;
    return 0; // free over 1500
  };

  const [shippingOption] = React.useState(() => {
    const est = estimateShipping(subtotal);
    return est === 0 ? 'Free' : 'Standard';
  });

  const shippingCost = shippingOption === 'Free' ? 0 : (shippingOption === 'Express' ? 250 : estimateShipping(subtotal));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="paper-card taped rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-transparent">
  <button onClick={onClose} className="absolute top-2 right-2 text-ink hover-text-vintage text-2xl font-bold">&times;</button>
  {/* Vintage heading */}
  <h2 className="text-3xl font-pressly text-ink mb-4">Place Your Order</h2>
        {submitted ? (
          <div className="text-center text-emerald-600 font-bold">Thank you for your order! We'll contact you soon.</div>
        ) : showSummary ? (
          <>
            {errorMsg && <div className="text-center text-red-600 mb-2">{errorMsg}</div>}
            <div>
              <h3 className="text-xl font-pressly text-ink mb-2">Order Summary</h3>
              <div className="mb-3 text-ink">
                <div><strong>Name:</strong> {form.name}</div>
                <div><strong>Email:</strong> {form.email}</div>
                <div><strong>Phone:</strong> {form.phone}</div>
                <div><strong>Address:</strong> {form.address}</div>
                <div><strong>Payment:</strong> {form.payment}</div>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-ink">Cart Items</h4>
                <ul className="text-ink mb-2">
                  {cartItems.length === 0 && <li className="text-sm">No items in cart</li>}
                  {cartItems.map((it, i) => (
                    <li key={i} className="text-sm">{it.name} - {it.price || (it.priceValue ? `${it.priceValue} Rs` : '')}</li>
                  ))}
                </ul>
                  <div className="text-sm font-medium text-ink">Subtotal: Rs {subtotal}</div>
                  <div className="text-sm">Delivery ({shippingOption}): Rs {shippingCost}</div>
                  <div className="text-lg font-bold mt-2">Total: Rs {subtotal + shippingCost}</div>
              </div>
              <button type="button" className="px-6 py-2 btn-vintage w-full mb-2" onClick={() => { handleConfirmOrder(); }} disabled={loading}>
                {loading ? "Submitting..." : "Confirm Order"}
              </button>
              <button className="px-6 py-2 btn-vintage-subtle rounded w-full" onClick={() => setShowSummary(false)}>Edit Info</button>
            </div>
          </>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="name" type="text" required placeholder="Full Name" value={form.name} onChange={handleChange} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
            <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            <input name="phone" type="tel" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            {errors.phone && <span className="text-red-600 text-sm">{errors.phone}</span>}
            <input name="address" type="text" required placeholder="Shipping Address" value={form.address} onChange={handleChange} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            {errors.address && <span className="text-red-600 text-sm">{errors.address}</span>}
            <input name="product" type="text" required placeholder="Product/Category" value={form.product} onChange={handleChange} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            {errors.product && <span className="text-red-600 text-sm">{errors.product}</span>}
            <textarea name="details" placeholder="Order Details (e.g. sticker type, canvas name, card type, paper style)" value={form.details} onChange={handleChange} rows={3} className="px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
            <div>
              <label className="block mb-2 font-medium text-ink">Payment Method</label>
              <select name="payment" value={form.payment} onChange={handleChange} className="w-full px-4 py-2 rounded border border-amber-200 text-ink focus:outline-none focus:ring-2 focus:ring-[#b99a77]">
                <option value="">Select payment</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
              </select>
              {errors.payment && <span className="text-red-600 text-sm">{errors.payment}</span>}
            </div>
            <button type="submit" className="px-6 py-2 btn-vintage w-full">Review Order</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
