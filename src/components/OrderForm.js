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
    alert("Confirm Order clicked");
    setLoading(true);
    setErrorMsg("");
    console.log("Order submit attempted", form);
    try {
      // compute totals (use the precomputed values)
      const delivery = 100;
      const total = subtotal + delivery;
      await addDoc(collection(db, "orders"), {
        ...form,
        cart: items,
        subtotal,
        delivery,
        total,
        createdAt: new Date().toISOString()
      });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border-2 border-indigo-200">
        <button onClick={onClose} className="absolute top-2 right-2 text-indigo-600 hover:text-emerald-600 text-2xl font-bold">&times;</button>
  {/* Test button removed for clean UI */}
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Place Your Order</h2>
        {submitted ? (
          <div className="text-center text-emerald-600 font-bold">Thank you for your order! We'll contact you soon.</div>
        ) : showSummary ? (
          <>
            {errorMsg && <div className="text-center text-red-500 mb-2">{errorMsg}</div>}
            <div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Order Summary</h3>
              <div className="mb-3 text-gray-700">
                <div><strong>Name:</strong> {form.name}</div>
                <div><strong>Email:</strong> {form.email}</div>
                <div><strong>Phone:</strong> {form.phone}</div>
                <div><strong>Address:</strong> {form.address}</div>
                <div><strong>Payment:</strong> {form.payment}</div>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold">Cart Items</h4>
                <ul className="text-gray-700 mb-2">
                  {cartItems.length === 0 && <li className="text-sm">No items in cart</li>}
                  {cartItems.map((it, i) => (
                    <li key={i} className="text-sm">{it.name} - {it.price || (it.priceValue ? `${it.priceValue} Rs` : '')}</li>
                  ))}
                </ul>
                  <div className="text-sm font-medium text-gray-800">Subtotal: Rs {subtotal}</div>
                  <div className="text-sm">Delivery: Rs 100</div>
                  <div className="text-lg font-bold mt-2">Total: Rs {subtotal + 100}</div>
              </div>
              <button type="button" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition w-full mb-2" onClick={() => { handleConfirmOrder(); }} disabled={loading}>
                {loading ? "Submitting..." : "Confirm Order"}
              </button>
              <button className="px-6 py-2 bg-slate-200 text-indigo-700 rounded hover:bg-slate-300 transition w-full" onClick={() => setShowSummary(false)}>Edit Info</button>
            </div>
          </>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="name" type="text" required placeholder="Full Name" value={form.name} onChange={handleChange} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            <input name="phone" type="tel" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            <input name="address" type="text" required placeholder="Shipping Address" value={form.address} onChange={handleChange} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            <input name="product" type="text" required placeholder="Product/Category" value={form.product} onChange={handleChange} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.product && <span className="text-red-500 text-sm">{errors.product}</span>}
            <textarea name="details" placeholder="Order Details (e.g. sticker type, canvas name, card type, paper style)" value={form.details} onChange={handleChange} rows={3} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <div>
              <label className="block mb-2 font-medium text-indigo-700">Payment Method</label>
              <select name="payment" value={form.payment} onChange={handleChange} className="w-full px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">Select payment</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
              </select>
              {errors.payment && <span className="text-red-500 text-sm">{errors.payment}</span>}
            </div>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition">Review Order</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
