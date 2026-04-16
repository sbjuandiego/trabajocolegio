export default function Hero({ onNavigate }) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,101,192,0.22) 0%,transparent 70%)', top: '-150px', right: '-150px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,136,229,0.12) 0%,transparent 70%)', bottom: '0', left: '-80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div className="hero-grid">
          {/* Texto */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '50px', background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.25)', marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--blue-200)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#42a5f5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Software gratuito y premium
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              Descarga el software
              <br />
              <span style={{ background: 'linear-gradient(135deg,#42a5f5,#1e88e5,#1565c0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                que necesitas hoy
              </span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '440px' }}>
              Accede a los mejores programas con instrucciones detalladas paso a paso. Diseño, oficina, multimedia, ingeniería y más.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('catalog')} style={{ padding: '0.85rem 1.75rem', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(21,101,192,0.4)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Ver catálogo
              </button>
              <button onClick={() => onNavigate('free')} style={{ padding: '0.85rem 1.75rem', borderRadius: '14px', border: '1px solid rgba(102,187,106,0.35)', background: 'rgba(102,187,106,0.08)', color: '#a5d6a7', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(102,187,106,0.6)'; e.currentTarget.style.background = 'rgba(102,187,106,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(102,187,106,0.35)'; e.currentTarget.style.background = 'rgba(102,187,106,0.08)'; }}>
                ✅ Solo gratis
              </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[['8+', 'Programas'], ['100%', 'Con instrucciones'], ['Gratis', 'Para empezar']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--blue-200)' }}>{num}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards decorativas */}
          <div className="hero-cards" style={{ position: 'relative', height: '420px' }}>
            <div className="glass-card" style={{ position: 'absolute', top: '20px', right: '0', width: '300px', height: '340px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" alt="Software" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,12,27,0.85) 0%,transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Más descargado</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Adobe Photoshop 2025</p>
                <p style={{ fontSize: '0.82rem', color: '#42a5f5', fontWeight: 500, marginTop: '4px' }}>Con instrucciones incluidas</p>
              </div>
            </div>
            <div className="glass" style={{ position: 'absolute', bottom: '20px', left: '0', padding: '0.85rem 1.1rem', borderRadius: '14px', width: '190px' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Registro gratuito</p>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginTop: '2px' }}>Accede a todo el catálogo</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
        @media(max-width:768px) { .hero-grid{grid-template-columns:1fr;gap:2rem;text-align:center} .hero-grid>div:first-child{display:flex;flex-direction:column;align-items:center} .hero-cards{display:none} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
