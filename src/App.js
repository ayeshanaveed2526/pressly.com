import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import StickerCategoryPage from "./components/StickerCategoryPage";
import ReviewsPage from "./components/ReviewsPage";
import About from "./components/About";
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
  price: "800pkr",
  priceValue: 800,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Custom Sticker",
    price: "80pkr",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Inspirational Canvas",
  price: "800pkr",
  priceValue: 800,
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
  const [selectedStickerCategory, setSelectedStickerCategory] = useState(null);
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
  const handleStickerCategoryClick = (category) => {
    setSelectedStickerCategory(category);
  };
  const handleCloseDetails = () => setSelectedProduct(null);
  const handleAddToCart = (product) => {
    const addQty = product.quantity || 1;
    setCartItems(prev => {
      const idx = prev.findIndex(it => (product.id && it.id === product.id) || it.name === product.name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: (updated[idx].quantity || 1) + addQty };
        return updated;
      }
      return [...prev, { ...product, quantity: addQty }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };
  const handleRemoveFromCart = (idx) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };
  const handleIncrementCartItem = (idx) => {
    setCartItems(prev => prev.map((it, i) => i === idx ? { ...it, quantity: (it.quantity || 1) + 1 } : it));
  };
  const handleDecrementCartItem = (idx) => {
    setCartItems(prev => prev.flatMap((it, i) => {
      if (i !== idx) return it;
      const q = it.quantity || 1;
      if (q <= 1) return [];
      return { ...it, quantity: q - 1 };
    }));
  };
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  const handleShowOrderForm = () => {
    setShowOrderForm(true);
    setCartOpen(false);
  };
  const handleCloseOrderForm = () => setShowOrderForm(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // simple hash-based routing
  const [route, setRoute] = useState(window.location.hash.replace('#','') || '/');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#','') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (path) => { window.location.hash = path; setRoute(path); };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar onCartClick={handleOpenCart} onContactClick={handleShowOrderForm} darkMode={darkMode} toggleDarkMode={toggleDarkMode} navigate={navigate} />
      {/* route handling */}
      {route === '/' && (
        <>
          <Hero />
          <div className="flex justify-center gap-4 my-6">
            <button className="btn-vintage" onClick={handleOpenCart}>View Cart ({cartItems.length})</button>
          </div>
          {!showOrderForm && (
            <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleAddToCart} onStickerCategory={(cat) => { setSelectedStickerCategory(cat); navigate(`/product/${encodeURIComponent(cat)}`); }} />
          )}
          {showOrderForm && <OrderForm onClose={handleCloseOrderForm} cartItems={cartItems} />}
          <Footer />
        </>
      )}
      {route === '/products' && (
        <>
          <div className="max-w-6xl mx-auto py-6 px-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleAddToCart} onStickerCategory={(cat) => { setSelectedStickerCategory(cat); navigate(`/product/${encodeURIComponent(cat)}`); }} />
          </div>
        </>
      )}
      {route.startsWith('/product/') && (
        <StickerCategoryPage category={decodeURIComponent(route.replace('/product/',''))} onBack={() => { setSelectedStickerCategory(null); navigate('/products'); }} onAddToCart={(item) => { handleAddToCart({ name: item.name, price: item.price, priceValue: item.priceValue || 40 }); }} />
      )}
      {route === '/cart' && (
        <div className="max-w-4xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
        </div>
      )}
      {route === '/reviews' && (
        <ReviewsPage />
      )}
      {route === '/contact' && (
        <div className="max-w-4xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <OrderForm onClose={handleCloseOrderForm} cartItems={cartItems} />
        </div>
      )}
      {route === '/about' && (
        <About />
      )}

      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
      )}
      {cartOpen && (
        <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onClose={handleCloseCart} onCheckout={handleShowOrderForm} onIncrement={handleIncrementCartItem} onDecrement={handleDecrementCartItem} />
      )}
    </div>
  );
}

export default App;