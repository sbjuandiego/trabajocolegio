import Icon from './Icon';

export default function Footer({ onNavigate, onModal }) {
  return (
    <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid rgba(144,202,249,0.1)', background: 'rgba(5,14,28,0.6)', backdropFilter: 'blur(20px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Icon name="hub" size={20} color="#42a5f5" fill={1} weight={500} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', backgroundImage: 'linear-gradient(135deg,#e3f2fd,#42a5f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>jbds.hub</span>
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '8px', lineHeight: 1.6 }}>
              Software + instrucciones<br />para todos. 🇨🇴
            </p>
          </div>

          {/* Navegar */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.85rem', color: 'var(--text-secondary)' }}>Navegar</p>
            {[
              { label: 'Inicio',       page: 'home',    icon: 'home' },
              { label: 'Catálogo',     page: 'catalog', icon: 'apps' },
              { label: 'Solo gratis',  page: 'free',    icon: 'volunteer_activism' },
              { label: 'Nosotros',     page: 'about',   icon: 'info' },
            ].map(({ label, page, icon }) => (
              <button key={page} onClick={() => onNavigate(page)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '3px 0', fontFamily: 'var(--font-body)', transition: 'color 0.2s', width: '100%' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <Icon name={icon} size={14} fill={0} weight={300} />
                {label}
              </button>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.85rem', color: 'var(--text-secondary)' }}>Legal</p>
            {[
              { label: 'Privacidad', modal: 'privacy', icon: 'privacy_tip' },
              { label: 'Términos',   modal: 'terms',   icon: 'gavel' },
              { label: 'Contacto',   modal: 'contact', icon: 'contact_support' },
            ].map(({ label, modal, icon }) => (
              <button key={modal} onClick={() => onModal(modal)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '3px 0', fontFamily: 'var(--font-body)', transition: 'color 0.2s', width: '100%' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <Icon name={icon} size={14} fill={0} weight={300} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(144,202,249,0.08)', paddingTop: '1.25rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2025 jbds.hub — Solo fines educativos</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Icon name="favorite" size={13} fill={1} weight={500} color="#ef5350" />
            Hecho en Colombia
          </p>
        </div>
      </div>
      <style>{`.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:2rem}@media(max-width:600px){.footer-grid{grid-template-columns:1fr 1fr}}`}</style>
    </footer>
  );
}
