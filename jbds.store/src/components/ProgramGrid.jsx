import { useState } from 'react';
import ProgramCard from './ProgramCard';
import { programs, categories } from '../data/programs';

export default function ProgramGrid({ onOpenAuth, onOpenDetail, initialFilter = 'all' }) {
  const [active, setActive] = useState('Todos');
  const [filter, setFilter] = useState(initialFilter); // 'all' | 'free' | 'premium'

  const onDownload = (p) => {
    const link = document.createElement('a');
    link.href = '#';
    alert(`Descarga iniciada: ${p.name}\n\nEn producción aquí iría el enlace real.`);
  };

  const filtered = programs
    .filter(p => active === 'Todos' || p.category === active)
    .filter(p => filter === 'all' ? true : filter === 'free' ? p.free : !p.free);

  return (
    <section style={{ padding: '3rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Catálogo</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Programas disponibles
        </h2>
      </div>

      {/* Filtros tipo + free/premium */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap', border: active === cat ? '1px solid rgba(66,165,245,0.6)' : '1px solid rgba(144,202,249,0.15)', background: active === cat ? 'rgba(21,101,192,0.35)' : 'rgba(10,25,47,0.4)', backdropFilter: 'blur(12px)', color: active === cat ? 'var(--blue-100)' : 'var(--text-muted)', fontSize: '0.83rem', fontWeight: active === cat ? 600 : 400, transition: 'all 0.2s', cursor: 'pointer' }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[['all','Todos'],['free','✅ Gratis'],['premium','🔐 Premium']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '0.35rem 0.9rem', borderRadius: '50px', border: filter === val ? '1px solid rgba(102,187,106,0.5)' : '1px solid rgba(144,202,249,0.12)', background: filter === val ? 'rgba(102,187,106,0.12)' : 'rgba(10,25,47,0.3)', color: filter === val ? '#a5d6a7' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: filter === val ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>{label}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</p>
          <p>No hay programas con ese filtro.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.25rem' }}>
          {filtered.map(p => (
            <ProgramCard key={p.id} program={p} onDownload={onDownload} onOpenAuth={onOpenAuth} onOpenDetail={onOpenDetail} />
          ))}
        </div>
      )}
    </section>
  );
}
