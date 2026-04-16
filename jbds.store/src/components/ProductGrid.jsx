import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

export default function ProductGrid({ onAddToCart }) {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos' ? products : products.filter(p => p.category === active);

  return (
    <section id="tienda" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
        }}>
          Catálogo
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}>
          Nuestros productos
        </h2>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '3rem',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '50px',
              border: active === cat
                ? '1px solid rgba(66, 165, 245, 0.6)'
                : '1px solid rgba(144, 202, 249, 0.15)',
              background: active === cat
                ? 'rgba(21, 101, 192, 0.35)'
                : 'rgba(10, 25, 47, 0.4)',
              backdropFilter: 'blur(12px)',
              color: active === cat ? 'var(--blue-100)' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: active === cat ? 600 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
