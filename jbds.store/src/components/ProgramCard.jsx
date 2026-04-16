import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProgramCard({ program, onDownload, onOpenAuth, onOpenDetail }) {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (!program.free && !user) { onOpenAuth(); return; }
    setDownloading(true);
    setTimeout(() => { setDownloading(false); onDownload(program); }, 1200);
  };

  const osColors = { Windows: '#42a5f5', macOS: '#a5d6a7', Linux: '#ffcc80' };

  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Imagen */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={program.image} alt={program.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 40%,rgba(2,12,27,0.7))' }} />

        {program.badge && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '3px 10px', borderRadius: '8px', background: program.free ? 'rgba(102,187,106,0.75)' : 'rgba(21,101,192,0.8)', backdropFilter: 'blur(8px)', border: `1px solid ${program.free ? 'rgba(165,214,167,0.4)' : 'rgba(66,165,245,0.4)'}`, color: program.free ? '#c8e6c9' : 'var(--blue-100)', fontSize: '0.72rem', fontWeight: 700 }}>
            {program.badge}
          </span>
        )}

        {!program.free && !user && (
          <span style={{ position: 'absolute', top: '10px', right: '10px', padding: '3px 8px', borderRadius: '8px', background: 'rgba(255,179,0,0.2)', border: '1px solid rgba(255,179,0,0.35)', color: '#ffcc02', fontSize: '0.7rem', fontWeight: 600 }}>
            🔒 Requiere cuenta
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{program.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>{program.name}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{program.description}</p>

        {/* OS badges */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '2px' }}>
          {program.os.map(o => (
            <span key={o} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', border: `1px solid ${osColors[o]}30`, background: `${osColors[o]}15`, color: osColors[o], fontWeight: 500 }}>{o}</span>
          ))}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>v{program.version}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>💾 {program.size}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>⭐ {program.rating}</span>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.6rem' }}>
          <button onClick={() => onOpenDetail(program)} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(10,25,47,0.4)', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.4)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(144,202,249,0.2)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
            📋 Instrucciones
          </button>
          <button onClick={handleDownload} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: 'none', background: downloading ? 'rgba(102,187,106,0.2)' : 'linear-gradient(135deg,#1565c0,#1e88e5)', color: downloading ? '#a5d6a7' : 'white', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.3s', boxShadow: downloading ? 'none' : '0 4px 16px rgba(21,101,192,0.35)' }}>
            {downloading ? '⏳ Preparando...' : '⬇ Descargar'}
          </button>
        </div>
      </div>
    </div>
  );
}
