import { useAuth } from '../context/AuthContext';

export default function ProgramCard({ program, onOpenAuth, onOpenDetail }) {
  const { user } = useAuth();

  const handleDownload = () => {
    if (!program.free && !user) { onOpenAuth(); return; }
    window.open(program.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const osColors = { Windows: '#42a5f5', macOS: '#a5d6a7', Linux: '#ffcc80' };

  /* Color de fondo derivado del logo — si es muy oscuro lo aclaramos un poco */
  const glowColor = program.color;

  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* ── Zona logo con blur de color ── */}
      <div style={{
        position: 'relative',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'rgba(8,20,40,0.6)',
      }}>
        {/* Blob de color difuso detrás del logo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${glowColor}55 0%, transparent 75%)`,
          filter: 'blur(18px)',
          transform: 'scale(1.2)',
        }} />
        {/* Capa oscura sutil encima del blob */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,12,26,0.35)' }} />

        {/* Logo */}
        <img
          src={program.logo}
          alt={program.name}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '72px',
            height: '72px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          }}
          onError={e => {
            // fallback: inicial del nombre si la imagen falla
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback inicial */}
        <div style={{
          display: 'none', position: 'relative', zIndex: 1,
          width: '72px', height: '72px', borderRadius: '18px',
          background: `${glowColor}33`, border: `2px solid ${glowColor}55`,
          alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: glowColor,
        }}>
          {program.name[0]}
        </div>

        {/* Badge */}
        {program.badge && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            padding: '3px 10px', borderRadius: '8px',
            background: program.free ? 'rgba(102,187,106,0.75)' : 'rgba(21,101,192,0.8)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${program.free ? 'rgba(165,214,167,0.4)' : 'rgba(66,165,245,0.4)'}`,
            color: program.free ? '#c8e6c9' : 'var(--blue-100)',
            fontSize: '0.7rem', fontWeight: 700,
          }}>
            {program.badge}
          </span>
        )}

        {/* Lock indicator for premium */}
        {!program.free && !user && (
          <span style={{
            position: 'absolute', top: '10px', right: '10px',
            padding: '3px 8px', borderRadius: '8px',
            background: 'rgba(255,179,0,0.18)', border: '1px solid rgba(255,179,0,0.35)',
            color: '#ffcc02', fontSize: '0.68rem', fontWeight: 600,
          }}>
            🔒 Cuenta
          </span>
        )}
      </div>

      {/* ── Info ── */}
      <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{program.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>{program.name}</h3>
        <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{program.description}</p>

        {/* OS */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '2px' }}>
          {program.os.map(o => (
            <span key={o} style={{ fontSize: '0.68rem', padding: '2px 7px', borderRadius: '6px', border: `1px solid ${osColors[o]}30`, background: `${osColors[o]}15`, color: osColors[o], fontWeight: 500 }}>{o}</span>
          ))}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '0.9rem', marginTop: '2px' }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>v{program.version}</span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>💾 {program.size}</span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>⭐ {program.rating}</span>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.7rem' }}>
          <button
            onClick={() => onOpenDetail(program)}
            style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(10,25,47,0.4)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.4)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.2)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            📋 Instrucciones
          </button>
          <button
            onClick={handleDownload}
            style={{
              flex: 1, padding: '0.6rem', borderRadius: '10px', border: 'none',
              background: `linear-gradient(135deg, ${glowColor}cc, ${glowColor}88)`,
              color: 'white', fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s',
              boxShadow: `0 4px 14px ${glowColor}44`,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            ⬇ Descargar
          </button>
        </div>
      </div>
    </div>
  );
}
