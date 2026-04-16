export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 2rem',
      borderTop: '1px solid rgba(144, 202, 249, 0.1)',
      background: 'rgba(5, 14, 28, 0.6)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.2rem',
            background: 'linear-gradient(135deg, #e3f2fd, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            jbds.store
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
            © 2025 — Todos los derechos reservados
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacidad', 'Términos', 'Contacto'].map(link => (
            <a key={link} href="#" style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
