import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProgramDetail({ program, onClose, onOpenAuth }) {
  const { user } = useAuth();

  useEffect(() => {
    if (program) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [program]);

  if (!program) return null;

  const handleDownload = () => {
    if (!program.free && !user) { onOpenAuth(); return; }
    window.open(program.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const osColors = { Windows: '#42a5f5', macOS: '#a5d6a7', Linux: '#ffcc80' };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,12,27,0.82)', backdropFilter: 'blur(8px)', zIndex: 300, animation: 'fadeIn .2s ease' }} />

      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(700px,94vw)', maxHeight: '88vh',
        zIndex: 301, display: 'flex', flexDirection: 'column',
        background: 'rgba(8,20,40,0.97)',
        backdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(144,202,249,0.15)',
        borderRadius: '24px',
        boxShadow: '0 32px 80px rgba(2,12,27,0.8)',
        animation: 'slideUp .3s cubic-bezier(0.16,1,0.3,1)',
        overflow: 'hidden',
      }}>

        {/* ── Cover con logo + blur de color ── */}
        <div style={{ position: 'relative', height: '180px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'rgba(4,12,26,0.8)' }}>
          {/* Blob difuso */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 80% at 50% 50%, ${program.color}60 0%, transparent 70%)`, filter: 'blur(24px)', transform: 'scale(1.3)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,12,26,0.45)' }} />

          {/* Logo grande */}
          <img src={program.logo} alt={program.name}
            style={{ position: 'relative', zIndex: 1, width: '88px', height: '88px', objectFit: 'contain', filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div style={{ display: 'none', position: 'relative', zIndex: 1, width: '88px', height: '88px', borderRadius: '22px', background: `${program.color}22`, border: `2px solid ${program.color}44`, alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: program.color }}>{program.name[0]}</div>

          {/* Texto del nombre abajo */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', right: '4rem' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{program.category}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.6rem)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{program.name}</h2>
          </div>

          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '34px', height: '34px', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(4,12,26,0.7)', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>✕</button>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {/* Meta chips */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[`v${program.version}`, `💾 ${program.size}`, `⭐ ${program.rating} (${program.reviews})`, program.free ? '✅ Gratuito' : '🔐 Requiere cuenta'].map(tag => (
              <span key={tag} style={{ padding: '4px 11px', borderRadius: '8px', background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(66,165,245,0.2)', fontSize: '0.78rem', color: 'var(--blue-100)' }}>{tag}</span>
            ))}
            {program.os.map(o => (
              <span key={o} style={{ padding: '4px 11px', borderRadius: '8px', border: `1px solid ${osColors[o]}30`, background: `${osColors[o]}15`, fontSize: '0.78rem', color: osColors[o] }}>{o}</span>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.92rem' }}>{program.description}</p>

          {/* Instrucciones */}
          <div style={{ background: 'rgba(10,25,47,0.6)', border: '1px solid rgba(144,202,249,0.12)', borderRadius: '16px', padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>📋 Instrucciones de instalación</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {program.instructions.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: `${program.color}25`, border: `1px solid ${program.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: program.color, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '3px' }}>{step}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,179,0,0.07)', border: '1px solid rgba(255,179,0,0.2)' }}>
              <p style={{ fontSize: '0.78rem', color: '#ffcc80', lineHeight: 1.6 }}>⚠️ Este software es compartido solo con fines educativos. Úsalo bajo tu propia responsabilidad y cumpliendo las leyes de tu país.</p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(144,202,249,0.1)', flexShrink: 0 }}>
          <button onClick={handleDownload} style={{
            width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none',
            background: !program.free && !user
              ? 'rgba(255,179,0,0.15)'
              : `linear-gradient(135deg, ${program.color}dd, ${program.color}99)`,
            color: !program.free && !user ? '#ffcc80' : 'white',
            fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            boxShadow: !program.free && !user ? 'none' : `0 8px 24px ${program.color}44`,
            fontFamily: 'var(--font-body)', transition: 'all 0.3s',
            border: !program.free && !user ? '1px solid rgba(255,179,0,0.3)' : 'none',
          }}>
            {!program.free && !user ? '🔒 Inicia sesión para descargar' : '⬇ Ir a la descarga →'}
          </button>
          {program.free || user ? (
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
              Serás redirigido al sitio oficial del programa
            </p>
          ) : null}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
      `}</style>
    </>
  );
}
