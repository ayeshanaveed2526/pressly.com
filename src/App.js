import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductGrid from "./components/ProductGrid";
import StickerCategoryPage from "./components/StickerCategoryPage";
import ReviewsPage from "./components/ReviewsPage";
import About from "./components/About";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import { db } from './firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
  const [, setSelectedStickerCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [darkMode] = useState(getInitialMode);

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
    const addQty = product.quantity || 1;
    setCartItems(prev => {
      const idx = prev.findIndex(it => (product.id && it.id === product.id) || it.name === product.name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: (updated[idx].quantity || 1) + addQty };
        // persist updated cart
        persistCart(updated);
        return updated;
      }
      const updatedNew = [...prev, { ...product, quantity: addQty }];
      persistCart(updatedNew);
      return updatedNew;
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };
  const handleRemoveFromCart = (idx) => {
    setCartItems(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      persistCart(updated);
      return updated;
    });
  };
  const handleIncrementCartItem = (idx) => {
    setCartItems(prev => {
      const updated = prev.map((it, i) => i === idx ? { ...it, quantity: (it.quantity || 1) + 1 } : it);
      persistCart(updated);
      return updated;
    });
  };
  const handleDecrementCartItem = (idx) => {
    setCartItems(prev => {
      const updated = prev.flatMap((it, i) => {
        if (i !== idx) return it;
        const q = it.quantity || 1;
        if (q <= 1) return [];
        return { ...it, quantity: q - 1 };
      });
      persistCart(updated);
      return updated;
    });
  };
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  const handleShowOrderForm = () => {
    setShowOrderForm(true);
    setCartOpen(false);
  };
  const handleCloseOrderForm = () => setShowOrderForm(false);
  // persist cart to localStorage so user's cart survives reloads
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      // ignore quota errors
    }
  }, [cartItems]);
  // dark mode toggle removed from use as theme handled via system preference and saved state

  // simple hash-based routing
  const [route, setRoute] = useState(window.location.hash.replace('#','') || '/');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#','') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (path) => { window.location.hash = path; setRoute(path); };

  // Persist cart to Firestore: create a cart doc on first save, then update
  const persistCart = async (items) => {
    try {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) {
        const ref = await addDoc(collection(db, 'carts'), { items, createdAt: serverTimestamp() });
        localStorage.setItem('cartId', ref.id);
      } else {
        await setDoc(doc(db, 'carts', cartId), { items, updatedAt: serverTimestamp() }, { merge: true });
      }
    } catch (err) {
      console.error('Failed to persist cart to Firestore:', err);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
  <Navbar onCartClick={handleOpenCart} onContactClick={handleShowOrderForm} navigate={navigate} />
      {/* route handling */}
      {route === '/' && (
        <>
          <Hero />
          <FeaturedProducts products={products} />
          {/* View Cart button removed from homepage per request */}
          {!showOrderForm && (
            <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleAddToCart} onStickerCategory={(cat) => { setSelectedStickerCategory(cat); navigate(`/product/${encodeURIComponent(cat)}`); }} />
          )}
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
        <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onClose={handleCloseCart} onCheckout={handleShowOrderForm} onIncrement={handleIncrementCartItem} onDecrement={handleDecrementCartItem} navigate={navigate} />
      )}
  {showOrderForm && <OrderForm onClose={handleCloseOrderForm} cartItems={cartItems} />}
    </div>
  );
}

export default App;