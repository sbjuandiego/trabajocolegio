import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

export default function Navbar({ onNavigate, onOpenAuth }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onClick = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const navLinks = [
    { label: 'Inicio',    page: 'home',    icon: 'home' },
    { label: 'Catálogo',  page: 'catalog', icon: 'apps' },
    { label: 'Gratis',    page: 'free',    icon: 'featured_play_list' },
    { label: 'Nosotros',  page: 'about',   icon: 'info' },
  ];

  const handleNav = (page) => { onNavigate(page); setMenuOpen(false); };

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 1rem' }}>
        <div style={{
          maxWidth: '1200px', margin: '12px auto 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1.25rem', borderRadius: '20px',
          background: scrolled ? 'rgba(10,25,47,0.78)' : 'rgba(10,25,47,0.4)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(144,202,249,0.15)',
          boxShadow: scrolled ? '0 8px 32px rgba(2,12,27,0.5),inset 0 1px 0 rgba(255,255,255,0.08)' : '0 4px 16px rgba(2,12,27,0.2)',
          transition: 'all 0.4s ease',
        }}>
          {/* Logo */}
          <button onClick={() => handleNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Icon name="hub" size={22} color="#42a5f5" fill={1} weight={500} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(135deg,#e3f2fd,#42a5f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              jbds<span style={{ opacity: 0.55 }}>.hub</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            {navLinks.map(link => (
              <button key={link.page} onClick={() => handleNav(link.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.8rem', borderRadius: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(21,101,192,0.15)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                <Icon name={link.icon} size={17} fill={0} weight={300} />
                {link.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.85rem', borderRadius: '12px', border: '1px solid rgba(66,165,245,0.3)', background: 'rgba(21,101,192,0.2)', color: 'var(--blue-100)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#1565c0,#42a5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'white' }}>
                    {user.username[0].toUpperCase()}
                  </span>
                  <span className="cart-label">{user.username}</span>
                  <Icon name="expand_more" size={16} fill={1} weight={400} style={{ opacity: 0.6, transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>

                {userMenuOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '210px', background: 'rgba(8,20,40,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(144,202,249,0.15)', borderRadius: '14px', padding: '0.5rem', boxShadow: '0 16px 40px rgba(2,12,27,0.6)', zIndex: 10 }}>
                    <div style={{ padding: '0.6rem 0.85rem', borderBottom: '1px solid rgba(144,202,249,0.08)', marginBottom: '0.4rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.username}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Plan {user.plan}</p>
                    </div>
                    {[
                      { label: 'Mi perfil', icon: 'person', action: () => { handleNav('profile'); setUserMenuOpen(false); } },
                      { label: 'Cerrar sesión', icon: 'logout', action: () => { logout(); setUserMenuOpen(false); }, danger: true },
                    ].map(item => (
                      <button key={item.label} onClick={item.action} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', borderRadius: '8px', border: 'none', background: 'none', color: item.danger ? '#ef9a9a' : 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = item.danger ? 'rgba(239,83,80,0.1)' : 'rgba(21,101,192,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                        <Icon name={item.icon} size={17} fill={item.danger ? 1 : 0} weight={300} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => onOpenAuth('login')} className="cart-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(144,202,249,0.2)', background: 'transparent', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.4)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.2)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                  <Icon name="login" size={17} fill={0} weight={300} />
                  Iniciar sesión
                </button>
                <button onClick={() => onOpenAuth('register')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(21,101,192,0.35)' }}>
                  <Icon name="person_add" size={17} fill={1} weight={400} />
                  Registrarse
                </button>
              </>
            )}

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ display: 'none', width: '36px', height: '36px', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(13,33,55,0.5)', color: 'var(--text-primary)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name={menuOpen ? 'close' : 'menu'} size={20} fill={1} weight={400} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div style={{ maxWidth: '1200px', margin: '4px auto 0', overflow: 'hidden', maxHeight: menuOpen ? '320px' : '0', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ background: 'rgba(8,20,40,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(144,202,249,0.12)', borderRadius: '16px', padding: menuOpen ? '0.75rem' : '0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navLinks.map(link => (
              <button key={link.page} onClick={() => handleNav(link.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(21,101,192,0.15)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                <Icon name={link.icon} size={20} fill={0} weight={300} />
                {link.label}
              </button>
            ))}
            {!user && (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 0.5rem 0.25rem' }}>
                <button onClick={() => { onOpenAuth('login'); setMenuOpen(false); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'transparent', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', cursor: 'pointer' }}>
                  <Icon name="login" size={16} fill={0} weight={300} /> Iniciar sesión
                </button>
                <button onClick={() => { onOpenAuth('register'); setMenuOpen(false); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  <Icon name="person_add" size={16} fill={1} weight={400} /> Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        @media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:flex!important}.cart-label{display:none}}
      `}</style>
    </>
  );
}
