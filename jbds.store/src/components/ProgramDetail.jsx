import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProgramDetail({ program, onClose, onDownload, onOpenAuth }) {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (program) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [program]);

  if (!program) return null;

  const handleDownload = () => {
    if (!program.free && !user) { onOpenAuth(); return; }
    setDownloading(true);
    setTimeout(() => { setDownloading(false); onDownload(program); }, 1200);
  };

  const osColors = { Windows: '#42a5f5', macOS: '#a5d6a7', Linux: '#ffcc80' };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,12,27,0.8)', backdropFilter: 'blur(8px)', zIndex: 300, animation: 'fadeIn .2s ease' }} />

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
        {/* Cover */}
        <div style={{ position: 'relative', height: '200px', flexShrink: 0 }}>
          <img src={program.image} alt={program.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(2,12,27,0.3),rgba(8,20,40,0.97))' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '34px', height: '34px', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(8,20,40,0.7)', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{program.category}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.3rem,3vw,1.7rem)' }}>{program.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[`v${program.version}`, `💾 ${program.size}`, `⭐ ${program.rating} (${program.reviews})`, program.free ? '✅ Gratuito' : '🔐 Cuenta requerida'].map(tag => (
              <span key={tag} style={{ padding: '4px 12px', borderRadius: '8px', background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(66,165,245,0.2)', fontSize: '0.8rem', color: 'var(--blue-100)' }}>{tag}</span>
            ))}
            {program.os.map(o => (
              <span key={o} style={{ padding: '4px 12px', borderRadius: '8px', border: `1px solid ${osColors[o]}30`, background: `${osColors[o]}15`, fontSize: '0.8rem', color: osColors[o] }}>{o}</span>
            ))}
          </div>

          {/* Descripción */}
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.92rem' }}>{program.description}</p>

          {/* Instrucciones */}
          <div style={{ background: 'rgba(10,25,47,0.6)', border: '1px solid rgba(144,202,249,0.12)', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>📋 Instrucciones de instalación</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {program.instructions.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(21,101,192,0.3)', border: '1px solid rgba(66,165,245,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-200)', flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '3px' }}>{step}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,179,0,0.07)', border: '1px solid rgba(255,179,0,0.2)' }}>
              <p style={{ fontSize: '0.8rem', color: '#ffcc80', lineHeight: 1.6 }}>
                ⚠️ Este software es compartido solo con fines educativos. Úsalo bajo tu propia responsabilidad y cumpliendo las leyes de tu país.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(144,202,249,0.1)', flexShrink: 0 }}>
          <button onClick={handleDownload} style={{ width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none', background: downloading ? 'rgba(102,187,106,0.15)' : 'linear-gradient(135deg,#1565c0,#1e88e5)', color: downloading ? '#a5d6a7' : 'white', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: downloading ? 'none' : '0 8px 24px rgba(21,101,192,0.4)', fontFamily: 'var(--font-body)', transition: 'all 0.3s' }}>
            {downloading ? '⏳ Preparando descarga...' : !program.free && !user ? '🔒 Inicia sesión para descargar' : '⬇ Descargar ahora'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
      `}</style>
    </>
  );
}
