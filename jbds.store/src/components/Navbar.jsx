import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 2rem',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '12px auto 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.5rem',
        borderRadius: '20px',
        background: scrolled
          ? 'rgba(10, 25, 47, 0.7)'
          : 'rgba(10, 25, 47, 0.35)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(144, 202, 249, 0.15)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(2,12,27,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 16px rgba(2,12,27,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.4rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #e3f2fd, #42a5f5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          jbds<span style={{ opacity: 0.6 }}>.store</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Inicio', 'Tienda', 'Ofertas', 'Nosotros'].map(link => (
            <a key={link} href="#" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Cart button */}
        <button
          onClick={onCartOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.1rem',
            borderRadius: '12px',
            border: '1px solid rgba(66, 165, 245, 0.3)',
            background: 'rgba(21, 101, 192, 0.2)',
            color: 'var(--blue-100)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(21, 101, 192, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(66, 165, 245, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(21, 101, 192, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(66, 165, 245, 0.3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Carrito
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: 'var(--blue-400)',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
