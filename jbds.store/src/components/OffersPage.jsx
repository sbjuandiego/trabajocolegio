import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, formatPrice } from '../data/products';

export default function OffersPage({ onAddToCart }) {
  const offers = products.filter(p => p.originalPrice !== null);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '3rem 1.5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg,rgba(21,101,192,0.3),rgba(30,136,229,0.15))',
          border: '1px solid rgba(66,165,245,0.25)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(66,165,245,0.1)', pointerEvents: 'none' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '50px', background: 'rgba(229,57,53,0.2)', border: '1px solid rgba(239,83,80,0.35)', fontSize: '0.78rem', color: '#ef9a9a', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🔥 Oferta limitada
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Ofertas del día
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
            Descuentos exclusivos por tiempo limitado en productos seleccionados. ¡No te los pierdas!
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[['🎯', `${offers.length} productos`, 'con descuento'], ['💰', 'Hasta 25% OFF', 'en seleccionados'], ['🚚', 'Envío gratis', 'en pedidos +$200k']].map(([icon, title, sub]) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
          {offers.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    </div>
  );
}
