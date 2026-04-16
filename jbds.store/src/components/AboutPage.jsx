export default function AboutPage({ onNavigate }) {
  const values = [
    { icon: '📋', title: 'Instrucciones claras', desc: 'Cada programa incluye pasos detallados para instalarlo correctamente desde cero.' },
    { icon: '🔄', title: 'Siempre actualizado', desc: 'Mantenemos el catálogo con las versiones más recientes disponibles.' },
    { icon: '🆓', title: 'Gratis para empezar', desc: 'Accede a decenas de programas gratuitos sin necesidad de registrarte.' },
    { icon: '🔒', title: 'Privacidad', desc: 'No rastreamos tus descargas ni vendemos tu información a terceros.' },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Quiénes somos</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Tu centro de software
            <br />
            <span style={{ background: 'linear-gradient(135deg,#42a5f5,#1e88e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>con instrucciones incluidas</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            jbds.hub nació para que cualquier persona pueda instalar el software que necesita sin complicaciones. Cada descarga viene con instrucciones paso a paso, sin tecnicismos innecesarios.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {values.map(v => (
            <div key={v.title} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>{v.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(21,101,192,0.08)', border: '1px solid rgba(66,165,245,0.18)', borderRadius: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>¿Listo para descargar?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Regístrate gratis y accede a todo el catálogo.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('catalog')} style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Ver catálogo</button>
            <button onClick={() => onNavigate('contact')} style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: '1px solid rgba(66,165,245,0.3)', background: 'transparent', color: 'var(--blue-100)', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Contáctanos</button>
          </div>
        </div>
      </div>
    </div>
  );
}
