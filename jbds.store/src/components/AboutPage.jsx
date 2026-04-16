export default function AboutPage({ onNavigate }) {
  const team = [
    { name: 'Juan Diego', role: 'Fundador & CEO', emoji: '👨‍💻' },
    { name: 'Equipo Tech', role: 'Desarrollo', emoji: '⚙️' },
    { name: 'Soporte 24/7', role: 'Atención al cliente', emoji: '🎧' },
  ];

  const values = [
    { icon: '🔒', title: 'Seguridad', desc: 'Tus datos y compras están 100% protegidos con encriptación de extremo a extremo.' },
    { icon: '🚚', title: 'Envíos rápidos', desc: 'Coordinamos entregas a todo Colombia con seguimiento en tiempo real.' },
    { icon: '✅', title: 'Calidad garantizada', desc: 'Todos los productos pasan por control de calidad antes de ser publicados.' },
    { icon: '💬', title: 'Soporte real', desc: 'Atención por WhatsApp, email y teléfono. Personas reales, respuestas rápidas.' },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Quiénes somos</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Nacimos para simplificar<br />
            <span style={{ background: 'linear-gradient(135deg,#42a5f5,#1e88e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>tu experiencia de compra</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            jbds.store nació en Neiva, Huila, con una misión clara: llevar tecnología de calidad a precios justos, con atención cercana y honesta. No somos una multinacional — somos tu tienda del barrio, pero en digital.
          </p>
        </div>

        {/* Valores */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Nuestros valores</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.25rem' }}>
            {values.map(v => (
              <div key={v.title} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>El equipo</h2>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {team.map(t => (
              <div key={t.name} className="glass-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', minWidth: '180px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{t.emoji}</div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t.name}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(21,101,192,0.1)', border: '1px solid rgba(66,165,245,0.2)', borderRadius: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>¿Listo para comprar?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Explora nuestro catálogo y encuentra lo que necesitas.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('store')} style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Ver tienda
            </button>
            <button onClick={() => onNavigate('contact')} style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: '1px solid rgba(66,165,245,0.3)', background: 'transparent', color: 'var(--blue-100)', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
