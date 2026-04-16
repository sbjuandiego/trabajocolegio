import ProductGrid from './ProductGrid';

export default function StorePage({ onAddToCart }) {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '3rem 1.5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Explora</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Toda la tienda
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '500px' }}>
          Filtra por categoría y encuentra exactamente lo que buscas.
        </p>
      </div>
      <ProductGrid onAddToCart={onAddToCart} />
    </div>
  );
}
