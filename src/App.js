import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";

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

function getInitialMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseDetails = () => setSelectedProduct(null);
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setSelectedProduct(null);
    setCartOpen(true);
  };
  const handleRemoveFromCart = (idx) => {
    setCartItems(cartItems.filter((_, i) => i !== idx));
  };
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  const handleShowOrderForm = () => {
    setShowOrderForm(true);
    setCartOpen(false);
  };
  const handleCloseOrderForm = () => setShowOrderForm(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar onCartClick={handleOpenCart} onContactClick={handleShowOrderForm} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <div className="flex justify-center gap-4 my-6">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition" onClick={handleOpenCart}>View Cart ({cartItems.length})</button>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-indigo-400 transition" onClick={handleShowOrderForm}>Place an Order</button>
      </div>
      {!showOrderForm && (
        <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
      )}
      {showOrderForm && <OrderForm onClose={handleCloseOrderForm} />}
      <Footer />
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
      )}
      {cartOpen && (
        <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onClose={handleCloseCart} onCheckout={handleShowOrderForm} />
      )}
    </div>
  );
}

export default App;