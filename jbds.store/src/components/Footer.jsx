export default function Footer({ onNavigate, onModal }) {
  return (
    <footer style={{
      padding: '2.5rem 1.5rem',
      borderTop: '1px solid rgba(144,202,249,0.1)',
      background: 'rgba(5,14,28,0.6)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-grid">
          <div>
            <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg,#e3f2fd,#42a5f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                jbds.store
              </p>
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.6 }}>
              Tecnología de calidad<br />para todos. Neiva, Huila 🇨🇴
            </p>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Tienda</p>
            {[['Inicio', 'home'], ['Tienda', 'store'], ['Ofertas', 'offers'], ['Nosotros', 'about']].map(([label, page]) => (
              <button key={page} onClick={() => onNavigate(page)}
                style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '3px 0', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{label}</button>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Legal</p>
            {[['Privacidad', 'privacy'], ['Términos', 'terms'], ['Contacto', 'contact']].map(([label, modal]) => (
              <button key={modal} onClick={() => onModal(modal)}
                style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '3px 0', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(144,202,249,0.08)', paddingTop: '1.25rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2025 jbds.store — Todos los derechos reservados</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Hecho con 💙 en Neiva</p>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2rem; }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </footer>
  );
}
