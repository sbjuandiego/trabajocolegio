import { useAuth } from '../context/AuthContext';

export default function ProfilePage({ onNavigate }) {
  const { user, logout } = useAuth();

  if (!user) { onNavigate('home'); return null; }

  const stats = [
    { icon: '⬇️', label: 'Descargas', value: '0' },
    { icon: '⭐', label: 'Favoritos', value: '0' },
    { icon: '💎', label: 'Plan', value: user.plan },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Header */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#1565c0,#42a5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: 'white', flexShrink: 0 }}>
            {user.username[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem' }}>{user.username}</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{user.email}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '8px', padding: '3px 10px', borderRadius: '8px', background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.25)', fontSize: '0.78rem', color: 'var(--blue-200)' }}>
              💎 Plan {user.plan}
            </div>
          </div>
          <button onClick={() => { logout(); onNavigate('home'); }} style={{ padding: '0.6rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(239,83,80,0.3)', background: 'rgba(239,83,80,0.08)', color: '#ef9a9a', fontFamily: 'var(--font-body)', fontSize: '0.85rem', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--blue-200)' }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upgrade banner */}
        {user.plan === 'Gratis' && (
          <div style={{ padding: '1.75rem', background: 'linear-gradient(135deg,rgba(21,101,192,0.2),rgba(30,136,229,0.1))', border: '1px solid rgba(66,165,245,0.25)', borderRadius: '18px', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>🚀 Mejora a Pro</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Desbloquea acceso a todo el software premium, descargas ilimitadas y soporte prioritario.
            </p>
            <button style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Ver planes — Próximamente
            </button>
          </div>
        )}

        {/* Empty downloads */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem' }}>Mis descargas</h3>
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📭</p>
            <p>Aún no has descargado nada.</p>
            <button onClick={() => onNavigate('catalog')} style={{ marginTop: '1rem', padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(66,165,245,0.3)', background: 'rgba(21,101,192,0.15)', color: 'var(--blue-100)', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
              Explorar catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
