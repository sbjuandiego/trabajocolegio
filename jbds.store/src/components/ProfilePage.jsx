import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

export default function ProfilePage({ onNavigate }) {
  const { user, logout } = useAuth();

  if (!user) { onNavigate('home'); return null; }

  const stats = [
    { icon: 'download',         label: 'Descargas',  value: '0' },
    { icon: 'bookmark',         label: 'Favoritos',  value: '0' },
    { icon: 'workspace_premium', label: 'Plan',       value: user.plan },
  ];

  const joinDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Hoy';

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header card */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#1565c0,#42a5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: 'white', flexShrink: 0, fontFamily: 'var(--font-display)' }}>
            {user.username[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem' }}>{user.username}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.88rem' }}>
              <Icon name="mail" size={15} fill={0} weight={300} />
              {user.email}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', marginTop: '3px', fontSize: '0.82rem' }}>
              <Icon name="calendar_today" size={13} fill={0} weight={300} />
              Miembro desde {joinDate}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '10px', padding: '3px 10px', borderRadius: '8px', background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.25)', fontSize: '0.78rem', color: 'var(--blue-200)' }}>
              <Icon name="workspace_premium" size={13} fill={1} weight={500} color="var(--blue-200)" />
              Plan {user.plan}
            </div>
          </div>
          <button onClick={() => { logout(); onNavigate('home'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(239,83,80,0.3)', background: 'rgba(239,83,80,0.08)', color: '#ef9a9a', fontFamily: 'var(--font-body)', fontSize: '0.85rem', cursor: 'pointer' }}>
            <Icon name="logout" size={16} fill={1} weight={400} color="#ef9a9a" />
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(66,165,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>
                <Icon name={s.icon} size={22} fill={0} weight={300} color="var(--blue-300)" />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--blue-200)' }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upgrade banner */}
        {user.plan === 'Gratis' && (
          <div style={{ padding: '1.75rem', background: 'linear-gradient(135deg,rgba(21,101,192,0.2),rgba(30,136,229,0.1))', border: '1px solid rgba(66,165,245,0.25)', borderRadius: '18px', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Icon name="rocket_launch" size={20} fill={1} weight={500} color="var(--blue-300)" />
              Mejora a Pro
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Desbloquea todo el software premium, descargas ilimitadas y soporte prioritario.
            </p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              <Icon name="workspace_premium" size={17} fill={1} weight={500} />
              Ver planes — Próximamente
            </button>
          </div>
        )}

        {/* Downloads */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem' }}>
            <Icon name="download_for_offline" size={20} fill={0} weight={300} color="var(--blue-300)" />
            Mis descargas
          </h3>
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(21,101,192,0.1)', border: '1px solid rgba(66,165,245,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Icon name="inbox" size={28} fill={0} weight={300} color="var(--text-muted)" />
            </div>
            <p>Aún no has descargado nada.</p>
            <button onClick={() => onNavigate('catalog')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', padding: '0.6rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(66,165,245,0.3)', background: 'rgba(21,101,192,0.15)', color: 'var(--blue-100)', fontFamily: 'var(--font-body)', cursor: 'pointer', fontSize: '0.88rem' }}>
              <Icon name="apps" size={16} fill={0} weight={300} />
              Explorar catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
