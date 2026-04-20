import { useState } from 'react';
import ProgramCard from './ProgramCard';
import { programs, categories } from '../data/programs';
import Icon from './Icon';

export default function ProgramGrid({ onOpenAuth, onOpenDetail, initialFilter = 'all' }) {
  const [active, setActive] = useState('Todos');
  const [filter, setFilter] = useState(initialFilter);

  const onDownload = (p) => {
    window.open(p.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const filtered = programs
    .filter(p => active === 'Todos' || p.category === active)
    .filter(p => filter === 'all' ? true : filter === 'free' ? p.free : !p.free);

  const filterOpts = [
    { val: 'all',     icon: 'apps',               label: 'Todos' },
    { val: 'free',    icon: 'volunteer_activism',  label: 'Gratis' },
    { val: 'premium', icon: 'workspace_premium',   label: 'Premium' },
  ];

  return (
    <section style={{ padding: '3rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Catálogo</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Programas disponibles
        </h2>
      </div>

      {/* Categorías */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            style={{ padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap', border: active === cat ? '1px solid rgba(66,165,245,0.6)' : '1px solid rgba(144,202,249,0.15)', background: active === cat ? 'rgba(21,101,192,0.35)' : 'rgba(10,25,47,0.4)', backdropFilter: 'blur(12px)', color: active === cat ? 'var(--blue-100)' : 'var(--text-muted)', fontSize: '0.83rem', fontWeight: active === cat ? 600 : 400, transition: 'all 0.2s', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Free / Premium toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {filterOpts.map(({ val, icon, label }) => (
          <button key={val} onClick={() => setFilter(val)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.38rem 0.9rem', borderRadius: '50px', border: filter === val ? '1px solid rgba(102,187,106,0.5)' : '1px solid rgba(144,202,249,0.12)', background: filter === val ? 'rgba(102,187,106,0.12)' : 'rgba(10,25,47,0.3)', color: filter === val ? '#a5d6a7' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: filter === val ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
            <Icon name={icon} size={14} fill={filter === val ? 1 : 0} weight={filter === val ? 500 : 300} />
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(21,101,192,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Icon name="search_off" size={28} fill={0} weight={300} color="var(--text-muted)" />
          </div>
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
