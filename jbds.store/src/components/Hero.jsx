export default function Hero({ onNavigate }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '7rem 1.5rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbes */}
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,101,192,0.25) 0%,transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,136,229,0.15) 0%,transparent 70%)', bottom: '0', left: '-80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Grid: 2 cols en desktop, 1 en mobile */}
        <div className="hero-grid">
          {/* Texto */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '50px', background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.25)', marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--blue-200)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#42a5f5', display: 'inline-block' }} />
              Tecnología de vanguardia
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              El futuro<br />
              <span style={{ background: 'linear-gradient(135deg,#42a5f5,#1e88e5,#1565c0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                comienza aquí
              </span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '420px' }}>
              Descubre nuestra colección de productos premium con tecnología de última generación. Diseñados para quienes exigen más.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('store')} style={{ padding: '0.85rem 1.75rem', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(21,101,192,0.4)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Ver tienda
              </button>
              <button onClick={() => onNavigate('offers')} style={{ padding: '0.85rem 1.75rem', borderRadius: '14px', border: '1px solid rgba(66,165,245,0.3)', background: 'rgba(13,33,55,0.5)', backdropFilter: 'blur(12px)', color: 'var(--blue-100)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(66,165,245,0.6)'; e.currentTarget.style.background = 'rgba(13,33,55,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(66,165,245,0.3)'; e.currentTarget.style.background = 'rgba(13,33,55,0.5)'; }}>
                Ofertas del día
              </button>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[['12K+', 'Clientes'], ['4.9★', 'Calificación'], ['500+', 'Productos']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--blue-200)' }}>{num}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards decorativas — ocultas en mobile pequeño */}
          <div className="hero-cards" style={{ position: 'relative', height: '420px' }}>
            <div className="glass-card" style={{ position: 'absolute', top: '20px', right: '0', width: '300px', height: '340px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80" alt="Tech" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,12,27,0.8) 0%,transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Destacado</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Auriculares Nova X1</p>
                <p style={{ fontSize: '0.9rem', color: '#42a5f5', fontWeight: 600, marginTop: '4px' }}>$189.900 COP</p>
              </div>
            </div>
            <div className="glass" style={{ position: 'absolute', bottom: '20px', left: '0', padding: '0.85rem 1.1rem', borderRadius: '14px', width: '180px' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Envío gratis</p>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginTop: '2px' }}>Pedidos +$200k</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .hero-cards { display: none; }
        }
      `}</style>
    </section>
  );
}
