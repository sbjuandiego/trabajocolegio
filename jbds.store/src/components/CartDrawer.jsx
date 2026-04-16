import { useState } from 'react';
import { formatPrice } from '../data/products';

const STEPS = { CART: 'cart', CHECKOUT: 'checkout', RECEIPT: 'receipt' };

function generateOrderId() {
  return 'JB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();
}

/* ─────────────── STEP 1: CART ─────────────── */
function CartStep({ items, onRemove, onQtyChange, onClose, onNext }) {
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 12000;
  const total = subtotal + shipping;

  return (
    <>
      <div style={styles.drawerHeader}>
        <h2 style={styles.drawerTitle}>Mi carrito</h2>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.4rem' }}>Carrito vacío</p>
            <p style={{ fontSize: '0.85rem' }}>Agrega productos para continuar</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartItemImg} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '3px' }}>{item.name}</p>
                <p style={{ color: 'var(--blue-300)', fontSize: '0.85rem', fontWeight: 600 }}>{formatPrice(item.price)}</p>
                <div style={styles.qtyRow}>
                  <button style={styles.qtyBtn} onClick={() => onQtyChange(item.id, item.qty - 1)}>−</button>
                  <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{item.qty}</span>
                  <button style={styles.qtyBtn} onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                  <span style={{ marginLeft: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    = {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} style={styles.removeBtn}>✕</button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div style={styles.drawerFooter}>
          <div style={styles.summaryRow}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Subtotal</span>
            <span style={{ fontSize: '0.88rem' }}>{formatPrice(subtotal)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Envío</span>
            <span style={{ fontSize: '0.88rem', color: shipping === 0 ? '#66bb6a' : 'inherit' }}>
              {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
            </span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Envío gratis en pedidos superiores a {formatPrice(200000)}
            </p>
          )}
          <div style={{ ...styles.summaryRow, borderTop: '1px solid rgba(144,202,249,0.12)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Total</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--blue-200)' }}>
              {formatPrice(total)}
            </span>
          </div>
          <button onClick={onNext} style={styles.primaryBtn}>
            Continuar al pago →
          </button>
        </div>
      )}
    </>
  );
}

/* ─────────────── STEP 2: CHECKOUT FORM ─────────────── */
function CheckoutStep({ items, onBack, onConfirm }) {
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 12000;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', notes: '',
    payment: 'contraentrega',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Requerido';
    if (!form.email.includes('@')) e.email = 'Email inválido';
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Teléfono inválido';
    if (!form.address.trim()) e.address = 'Requerido';
    if (!form.city.trim()) e.city = 'Requerido';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onConfirm({ ...form, subtotal, shipping, total, orderId: generateOrderId(), date: new Date() });
  };

  const paymentMethods = [
    { id: 'contraentrega', label: 'Contra entrega', icon: '📦' },
    { id: 'transferencia', label: 'Transferencia bancaria', icon: '🏦' },
    { id: 'nequi', label: 'Nequi / Daviplata', icon: '📱' },
  ];

  const Field = ({ label, k, type = 'text', placeholder }) => (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={styles.fieldLabel}>{label}</label>
      <input
        type={type}
        value={form[k]}
        onChange={e => set(k, e.target.value)}
        placeholder={placeholder}
        style={{
          ...styles.input,
          borderColor: errors[k] ? 'rgba(239,83,80,0.5)' : 'rgba(144,202,249,0.15)',
        }}
      />
      {errors[k] && <p style={{ color: '#ef5350', fontSize: '0.75rem', marginTop: '3px' }}>{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <div style={styles.drawerHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.drawerTitle}>Datos de entrega</h2>
        </div>
        <div style={styles.stepPills}>
          <span style={{ ...styles.stepPill, ...styles.stepPillDone }}>1</span>
          <span style={styles.stepDivider} />
          <span style={{ ...styles.stepPill, ...styles.stepPillActive }}>2</span>
          <span style={styles.stepDivider} />
          <span style={styles.stepPill}>3</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
        <Field label="Nombre completo *" k="name" placeholder="Juan Diego García" />
        <Field label="Correo electrónico *" k="email" type="email" placeholder="juan@email.com" />
        <Field label="Teléfono / WhatsApp *" k="phone" type="tel" placeholder="310 000 0000" />
        <Field label="Dirección de entrega *" k="address" placeholder="Calle 10 # 5-23, Apto 301" />
        <Field label="Ciudad *" k="city" placeholder="Neiva, Huila" />
        <Field label="Notas (opcional)" k="notes" placeholder="Instrucciones especiales..." />

        <div style={{ marginBottom: '0.9rem' }}>
          <label style={styles.fieldLabel}>Método de pago</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.4rem' }}>
            {paymentMethods.map(m => (
              <button
                key={m.id}
                onClick={() => set('payment', m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.7rem 1rem',
                  borderRadius: '12px',
                  border: form.payment === m.id
                    ? '1px solid rgba(66,165,245,0.5)'
                    : '1px solid rgba(144,202,249,0.12)',
                  background: form.payment === m.id
                    ? 'rgba(21,101,192,0.2)'
                    : 'rgba(10,25,47,0.3)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  fontWeight: form.payment === m.id ? 600 : 400,
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                {m.label}
                {form.payment === m.id && (
                  <span style={{ marginLeft: 'auto', color: 'var(--blue-300)' }}>✓</span>
                )}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            * Métodos de pago en configuración — sin cargos por ahora
          </p>
        </div>

        <div style={{
          background: 'rgba(10,25,47,0.5)',
          border: '1px solid rgba(144,202,249,0.1)',
          borderRadius: '14px',
          padding: '1rem',
          marginTop: '0.5rem',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            Resumen del pedido
          </p>
          {items.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{i.name} <span style={{ color: 'var(--text-muted)' }}>×{i.qty}</span></span>
              <span style={{ fontSize: '0.82rem' }}>{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(144,202,249,0.1)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>Total</span>
            <span style={{ fontWeight: 700, color: 'var(--blue-200)', fontFamily: 'var(--font-display)' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div style={styles.drawerFooter}>
        <button onClick={handleSubmit} style={styles.primaryBtn}>
          Confirmar pedido ✓
        </button>
      </div>
    </>
  );
}

/* ─────────────── STEP 3: RECEIPT ─────────────── */
function ReceiptStep({ order, items, onClose, onNewOrder }) {
  const handlePrint = () => {
    const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
    const receiptHTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Recibo ${order.orderId}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Courier New',monospace; max-width:400px; margin:30px auto; padding:24px; color:#111; }
    .logo { text-align:center; font-size:1.8rem; font-weight:900; letter-spacing:-1px; margin-bottom:4px; }
    .subtitle { text-align:center; font-size:0.78rem; color:#666; margin-bottom:20px; }
    .divider { border:none; border-top:1px dashed #bbb; margin:14px 0; }
    .row { display:flex; justify-content:space-between; margin:6px 0; font-size:0.85rem; }
    .label { color:#666; }
    .section-title { font-weight:700; font-size:0.75rem; text-transform:uppercase; letter-spacing:2px; margin:14px 0 8px; color:#333; }
    .total-row { font-size:1.05rem; font-weight:700; padding:8px 0; }
    .badge { background:#e8f5e9; color:#2e7d32; border:1px solid #a5d6a7; padding:10px 16px; border-radius:20px; text-align:center; font-weight:700; margin:16px 0; font-size:0.95rem; }
    .footer { text-align:center; font-size:0.75rem; color:#888; margin-top:24px; line-height:1.6; }
    @media print { body { margin:0; } }
  </style>
</head>
<body>
  <div class="logo">jbds.store</div>
  <div class="subtitle">Comprobante de pedido</div>
  <hr class="divider">
  <div class="row"><span class="label">N° de orden</span><span><strong>${order.orderId}</strong></span></div>
  <div class="row"><span class="label">Fecha</span><span>${order.date.toLocaleDateString('es-CO', { day:'2-digit', month:'long', year:'numeric' })}</span></div>
  <div class="row"><span class="label">Hora</span><span>${order.date.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit' })}</span></div>
  <hr class="divider">
  <div class="section-title">Productos</div>
  ${items.map(i => `<div class="row"><span>${i.name} ×${i.qty}</span><span>${fmt(i.price * i.qty)}</span></div>`).join('')}
  <hr class="divider">
  <div class="row"><span class="label">Subtotal</span><span>${fmt(order.subtotal)}</span></div>
  <div class="row"><span class="label">Envío</span><span>${order.shipping === 0 ? 'GRATIS' : fmt(order.shipping)}</span></div>
  <div class="row total-row"><span>TOTAL A PAGAR</span><span>${fmt(order.total)}</span></div>
  <hr class="divider">
  <div class="section-title">Datos de entrega</div>
  <div class="row"><span class="label">Nombre</span><span>${order.name}</span></div>
  <div class="row"><span class="label">Email</span><span>${order.email}</span></div>
  <div class="row"><span class="label">Teléfono</span><span>${order.phone}</span></div>
  <div class="row"><span class="label">Dirección</span><span>${order.address}</span></div>
  <div class="row"><span class="label">Ciudad</span><span>${order.city}</span></div>
  <div class="row"><span class="label">Pago</span><span>${order.payment}</span></div>
  ${order.notes ? `<div class="row"><span class="label">Notas</span><span>${order.notes}</span></div>` : ''}
  <div class="badge">✓ Pedido confirmado — pendiente de pago</div>
  <div class="footer">Gracias por tu compra · jbds.store<br>Te contactaremos al número registrado para coordinar el pago y envío.<br>Conserva este comprobante como referencia.</div>
</body>
</html>`;
    const w = window.open('', '_blank');
    w.document.write(receiptHTML);
    w.document.close();
    setTimeout(() => w.print(), 400);
  };

  return (
    <>
      <div style={styles.drawerHeader}>
        <h2 style={styles.drawerTitle}>¡Pedido confirmado!</h2>
        <div style={styles.stepPills}>
          <span style={{ ...styles.stepPill, ...styles.stepPillDone }}>1</span>
          <span style={styles.stepDivider} />
          <span style={{ ...styles.stepPill, ...styles.stepPillDone }}>2</span>
          <span style={styles.stepDivider} />
          <span style={{ ...styles.stepPill, ...styles.stepPillDone }}>3</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{
          textAlign: 'center', padding: '1.75rem 1rem',
          background: 'rgba(102,187,106,0.08)',
          border: '1px solid rgba(102,187,106,0.25)',
          borderRadius: '18px', marginBottom: '1.25rem',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#a5d6a7', marginBottom: '4px' }}>
            ¡Gracias, {order.name.split(' ')[0]}!
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tu pedido ha sido registrado con éxito</p>
        </div>

        {/* Order ID block */}
        <div style={styles.receiptBlock}>
          <div style={styles.receiptRow}>
            <span style={styles.receiptLabel}>N° de orden</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--blue-200)', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
              {order.orderId}
            </span>
          </div>
          <div style={styles.receiptRow}>
            <span style={styles.receiptLabel}>Fecha</span>
            <span style={{ fontSize: '0.85rem' }}>
              {order.date.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })} — {order.date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Products block */}
        <div style={styles.receiptBlock}>
          <p style={styles.receiptSectionTitle}>Productos</p>
          {items.map(i => (
            <div key={i.id} style={styles.receiptRow}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {i.name} <span style={{ color: 'var(--text-muted)' }}>×{i.qty}</span>
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(144,202,249,0.1)', paddingTop: '0.6rem', marginTop: '0.6rem' }}>
            <div style={styles.receiptRow}>
              <span style={styles.receiptLabel}>Subtotal</span>
              <span style={{ fontSize: '0.85rem' }}>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={styles.receiptRow}>
              <span style={styles.receiptLabel}>Envío</span>
              <span style={{ fontSize: '0.85rem', color: order.shipping === 0 ? '#66bb6a' : 'inherit' }}>
                {order.shipping === 0 ? 'GRATIS' : formatPrice(order.shipping)}
              </span>
            </div>
            <div style={{ ...styles.receiptRow, marginTop: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>TOTAL</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--blue-200)' }}>
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery block */}
        <div style={styles.receiptBlock}>
          <p style={styles.receiptSectionTitle}>Entrega</p>
          {[
            ['Destinatario', order.name],
            ['Email', order.email],
            ['Teléfono', order.phone],
            ['Dirección', order.address],
            ['Ciudad', order.city],
            ['Método de pago', order.payment],
            order.notes ? ['Notas', order.notes] : null,
          ].filter(Boolean).map(([label, val]) => (
            <div key={label} style={styles.receiptRow}>
              <span style={styles.receiptLabel}>{label}</span>
              <span style={{ fontSize: '0.85rem', maxWidth: '56%', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.drawerFooter}>
        <button onClick={handlePrint} style={{ ...styles.primaryBtn, marginBottom: '0.6rem' }}>
          🖨️ Imprimir / Guardar recibo
        </button>
        <button onClick={onNewOrder} style={styles.secondaryBtn}>
          Seguir comprando
        </button>
      </div>
    </>
  );
}

/* ─────────────── MAIN DRAWER ─────────────── */
export default function CartDrawer({ isOpen, onClose, items, onRemove, onQtyChange, onClearCart }) {
  const [step, setStep] = useState(STEPS.CART);
  const [order, setOrder] = useState(null);

  const handleConfirm = (orderData) => {
    setOrder(orderData);
    setStep(STEPS.RECEIPT);
  };

  const handleNewOrder = () => {
    onClearCart();
    setStep(STEPS.CART);
    onClose();
  };

  const handleClose = () => {
    if (step === STEPS.RECEIPT) {
      onClearCart();
      setStep(STEPS.CART);
    }
    onClose();
  };

  return (
    <>
      <div onClick={handleClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(2,12,27,0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 200,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }} />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        zIndex: 201,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(6,16,34,0.92)',
        backdropFilter: 'blur(36px) saturate(180%)',
        WebkitBackdropFilter: 'blur(36px) saturate(180%)',
        borderLeft: '1px solid rgba(144,202,249,0.12)',
        boxShadow: '-20px 0 80px rgba(2,12,27,0.7)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {step === STEPS.CART && (
          <CartStep items={items} onRemove={onRemove} onQtyChange={onQtyChange} onClose={handleClose} onNext={() => setStep(STEPS.CHECKOUT)} />
        )}
        {step === STEPS.CHECKOUT && (
          <CheckoutStep items={items} onBack={() => setStep(STEPS.CART)} onConfirm={handleConfirm} />
        )}
        {step === STEPS.RECEIPT && order && (
          <ReceiptStep order={order} items={items} onClose={handleClose} onNewOrder={handleNewOrder} />
        )}
      </div>
    </>
  );
}

/* ─────────────── SHARED STYLES ─────────────── */
const styles = {
  drawerHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid rgba(144,202,249,0.1)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexShrink: 0,
  },
  drawerTitle: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' },
  drawerFooter: {
    padding: '1.25rem 1.5rem',
    borderTop: '1px solid rgba(144,202,249,0.1)',
    flexShrink: 0,
  },
  closeBtn: {
    width: '32px', height: '32px', borderRadius: '8px',
    border: '1px solid rgba(144,202,249,0.15)',
    background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)',
    fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  backBtn: {
    width: '30px', height: '30px', borderRadius: '8px',
    border: '1px solid rgba(144,202,249,0.15)',
    background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)',
    fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  cartItem: {
    display: 'flex', gap: '0.85rem',
    padding: '0.9rem 0',
    borderBottom: '1px solid rgba(144,202,249,0.07)',
    alignItems: 'flex-start',
  },
  cartItemImg: { width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' },
  qtyBtn: {
    width: '24px', height: '24px', borderRadius: '6px',
    border: '1px solid rgba(144,202,249,0.2)',
    background: 'rgba(21,101,192,0.15)', color: 'var(--blue-100)',
    fontSize: '1rem', lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  removeBtn: {
    border: 'none', background: 'rgba(229,57,53,0.12)', color: '#ef5350',
    borderRadius: '8px', width: '26px', height: '26px', fontSize: '0.75rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' },
  primaryBtn: {
    width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none',
    background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
    color: 'white', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(21,101,192,0.4)', fontFamily: 'var(--font-body)',
  },
  secondaryBtn: {
    width: '100%', padding: '0.75rem', borderRadius: '14px',
    border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(13,33,55,0.5)',
    color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem',
    cursor: 'pointer', fontFamily: 'var(--font-body)',
  },
  fieldLabel: {
    display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)',
    marginBottom: '5px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  input: {
    width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px',
    border: '1px solid rgba(144,202,249,0.15)',
    background: 'rgba(10,25,47,0.5)', color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
  },
  stepPills: { display: 'flex', alignItems: 'center', gap: '4px' },
  stepPill: {
    width: '24px', height: '24px', borderRadius: '50%',
    border: '1px solid rgba(144,202,249,0.2)', background: 'rgba(10,25,47,0.5)',
    color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stepPillActive: { border: '1px solid rgba(66,165,245,0.5)', background: 'rgba(21,101,192,0.3)', color: 'var(--blue-100)' },
  stepPillDone: { border: '1px solid rgba(102,187,106,0.4)', background: 'rgba(102,187,106,0.15)', color: '#a5d6a7' },
  stepDivider: { width: '12px', height: '1px', background: 'rgba(144,202,249,0.15)' },
  receiptBlock: {
    background: 'rgba(10,25,47,0.6)',
    border: '1px solid rgba(144,202,249,0.15)',
    borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '0.85rem',
  },
  receiptSectionTitle: {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem',
    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem',
  },
  receiptRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  receiptLabel: { fontSize: '0.82rem', color: 'var(--text-muted)' },
};
