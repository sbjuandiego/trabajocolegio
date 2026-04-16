import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StorePage from './components/StorePage';
import OffersPage from './components/OffersPage';
import AboutPage from './components/AboutPage';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { ContactModal, PrivacyModal, TermsModal } from './components/Modals';

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'contact' | 'privacy' | 'terms' | null

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const changeQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigate}
      />

      <main>
        {page === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <ProductGrid onAddToCart={addToCart} />
          </>
        )}
        {page === 'store' && <StorePage onAddToCart={addToCart} />}
        {page === 'offers' && <OffersPage onAddToCart={addToCart} />}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} onModal={setModal} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onQtyChange={changeQty}
        onClearCart={clearCart}
      />

      {/* Modales */}
      <ContactModal isOpen={modal === 'contact'} onClose={() => setModal(null)} />
      <PrivacyModal isOpen={modal === 'privacy'} onClose={() => setModal(null)} />
      <TermsModal isOpen={modal === 'terms'} onClose={() => setModal(null)} />
    </div>
  );
}

export default App;
