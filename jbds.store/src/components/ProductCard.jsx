import { useState } from 'react';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Imagen */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(2,12,27,0.6))',
        }} />

        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '3px 10px',
            borderRadius: '8px',
            background: 'rgba(21, 101, 192, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(66, 165, 245, 0.4)',
            color: 'var(--blue-100)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
          }}>
            {product.badge}
          </span>
        )}

        {discount && (
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '3px 10px',
            borderRadius: '8px',
            background: 'rgba(229, 57, 53, 0.7)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 700,
          }}>
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '1.05rem',
          color: 'var(--text-primary)',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                fill={i < Math.floor(product.rating) ? '#42a5f5' : 'none'}
                stroke="#42a5f5" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({product.reviews})</span>
        </div>

        {/* Precios */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: 'auto' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.15rem',
            color: 'var(--blue-200)',
          }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              textDecoration: 'line-through',
            }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Botón */}
        <button
          onClick={handleAdd}
          style={{
            marginTop: '0.75rem',
            padding: '0.7rem',
            borderRadius: '12px',
            border: added ? '1px solid rgba(66, 185, 131, 0.4)' : '1px solid rgba(66, 165, 245, 0.25)',
            background: added
              ? 'rgba(66, 185, 131, 0.15)'
              : 'rgba(21, 101, 192, 0.18)',
            backdropFilter: 'blur(12px)',
            color: added ? '#66bb6a' : 'var(--blue-100)',
            fontWeight: 600,
            fontSize: '0.88rem',
            transition: 'all 0.3s ease',
            width: '100%',
          }}
          onMouseEnter={e => {
            if (!added) e.currentTarget.style.background = 'rgba(21, 101, 192, 0.35)';
          }}
          onMouseLeave={e => {
            if (!added) e.currentTarget.style.background = 'rgba(21, 101, 192, 0.18)';
          }}
        >
          {added ? '✓ Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}
