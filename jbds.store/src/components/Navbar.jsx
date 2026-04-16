import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al hacer resize a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = [
    { label: 'Inicio', page: 'home' },
    { label: 'Tienda', page: 'store' },
    { label: 'Ofertas', page: 'offers' },
    { label: 'Nosotros', page: 'about' },
  ];

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 1rem',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '12px auto 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          borderRadius: '20px',
          background: scrolled ? 'rgba(10,25,47,0.75)' : 'rgba(10,25,47,0.4)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(144,202,249,0.15)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(2,12,27,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 4px 16px rgba(2,12,27,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'all 0.4s ease',
        }}>
          {/* Logo */}
          <button onClick={() => handleNav('home')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg,#e3f2fd,#42a5f5)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            jbds<span style={{ opacity: 0.6 }}>.store</span>
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', '@media(max-width:768px)': { display: 'none' } }}
            className="desktop-nav">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => handleNav(link.page)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--text-secondary)', fontWeight: 500,
                transition: 'color 0.2s', padding: '0',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Cart */}
            <button onClick={onCartOpen} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1rem', borderRadius: '12px',
              border: '1px solid rgba(66,165,245,0.3)',
              background: 'rgba(21,101,192,0.2)', color: 'var(--blue-100)',
              fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(21,101,192,0.4)'; e.currentTarget.style.borderColor = 'rgba(66,165,245,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(21,101,192,0.2)'; e.currentTarget.style.borderColor = 'rgba(66,165,245,0.3)'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-label">Carrito</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'var(--blue-400)', color: 'white',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700,
                }}>{cartCount}</span>
              )}
            </button>

            {/* Hamburger (mobile only) */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{
              display: 'none',
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid rgba(144,202,249,0.2)',
              background: 'rgba(13,33,55,0.5)', color: 'var(--text-primary)',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px',
              cursor: 'pointer',
            }}>
              <span style={{ display: 'block', width: '16px', height: '2px', background: 'currentColor', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <span style={{ display: 'block', width: '16px', height: '2px', background: 'currentColor', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '16px', height: '2px', background: 'currentColor', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div style={{
          maxWidth: '1200px', margin: '4px auto 0',
          overflow: 'hidden',
          maxHeight: menuOpen ? '300px' : '0',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            background: 'rgba(8,20,40,0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(144,202,249,0.12)',
            borderRadius: '16px',
            padding: menuOpen ? '0.75rem' : '0',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            {navLinks.map(link => (
              <button key={link.page} onClick={() => handleNav(link.page)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: '0.75rem 1rem',
                borderRadius: '10px', color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(21,101,192,0.15)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CSS para responsive */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .cart-label { display: none; }
        }
      `}</style>
    </>
  );
}
