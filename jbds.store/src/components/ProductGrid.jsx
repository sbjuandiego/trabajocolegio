import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

export default function ProductGrid({ onAddToCart }) {
  const [active, setActive] = useState('Todos');
  const filtered = active === 'Todos' ? products : products.filter(p => p.category === active);

  return (
    <section id="tienda" style={{ padding: '3rem 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Catálogo</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Nuestros productos
        </h2>
      </div>

      {/* Filtros — scroll horizontal en mobile */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            padding: '0.45rem 1.1rem', borderRadius: '50px', whiteSpace: 'nowrap',
            border: active === cat ? '1px solid rgba(66,165,245,0.6)' : '1px solid rgba(144,202,249,0.15)',
            background: active === cat ? 'rgba(21,101,192,0.35)' : 'rgba(10,25,47,0.4)',
            backdropFilter: 'blur(12px)',
            color: active === cat ? 'var(--blue-100)' : 'var(--text-muted)',
            fontSize: '0.85rem', fontWeight: active === cat ? 600 : 400, transition: 'all 0.2s ease', cursor: 'pointer',
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.25rem' }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
