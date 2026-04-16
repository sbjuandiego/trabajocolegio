import { useEffect } from 'react';

function ModalWrapper({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(2,12,27,0.75)',
        backdropFilter: 'blur(6px)', zIndex: 300,
        animation: 'fadeIn 0.2s ease',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(600px,92vw)',
        maxHeight: '85vh',
        zIndex: 301,
        background: 'rgba(8,20,40,0.95)',
        backdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(144,202,249,0.15)',
        borderRadius: '24px',
        boxShadow: '0 32px 80px rgba(2,12,27,0.7)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(144,202,249,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>{title}</h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(144,202,249,0.15)', background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translate(-50%,-46%) } to { opacity:1; transform:translate(-50%,-50%) } }
      `}</style>
    </>
  );
}

/* ── Contenido Contacto ── */
export function ContactModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Contáctanos">
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
        Estamos aquí para ayudarte. Escríbenos por cualquiera de estos canales y te responderemos lo antes posible.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { icon: '📱', title: 'WhatsApp', desc: '+57 310 000 0000', sub: 'Lunes a Sábado, 8am – 8pm' },
          { icon: '📧', title: 'Email', desc: 'contacto@jbds.store', sub: 'Respuesta en menos de 24h' },
          { icon: '📍', title: 'Ubicación', desc: 'Neiva, Huila, Colombia', sub: 'Atención solo digital por ahora' },
          { icon: '🕐', title: 'Horario', desc: 'Lunes – Sábado', sub: '8:00 AM – 8:00 PM' },
        ].map(item => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'rgba(10,25,47,0.5)', border: '1px solid rgba(144,202,249,0.1)', borderRadius: '14px' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '2px' }}>{item.title}</p>
              <p style={{ color: 'var(--blue-200)', fontSize: '0.9rem' }}>{item.desc}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(21,101,192,0.1)', border: '1px solid rgba(66,165,245,0.2)', borderRadius: '14px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          💡 Para consultas sobre pedidos, ten a mano tu número de orden (formato JB-XXXXX). Esto agilizará mucho la atención.
        </p>
      </div>
    </ModalWrapper>
  );
}

/* ── Contenido Privacidad ── */
export function PrivacyModal({ isOpen, onClose }) {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--blue-200)', marginBottom: '0.6rem' }}>{title}</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Política de Privacidad">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Última actualización: Enero 2025</p>
      <Section title="1. Información que recopilamos">
        Recopilamos nombre, email, teléfono y dirección de entrega únicamente cuando realizas un pedido. Esta información es necesaria para procesar y entregar tu compra.
      </Section>
      <Section title="2. Uso de la información">
        Tu información se usa exclusivamente para: procesar pedidos, coordinar envíos, enviarte confirmaciones y brindarte soporte postventa. No vendemos ni compartimos tus datos con terceros.
      </Section>
      <Section title="3. Almacenamiento y seguridad">
        Los datos se almacenan de forma segura. No guardamos información de tarjetas de crédito ni datos bancarios en nuestros servidores.
      </Section>
      <Section title="4. Cookies">
        Utilizamos cookies técnicas esenciales para el funcionamiento de la tienda. No usamos cookies de seguimiento publicitario.
      </Section>
      <Section title="5. Tus derechos">
        Puedes solicitar la eliminación de tus datos en cualquier momento escribiendo a contacto@jbds.store. Atenderemos tu solicitud en un plazo máximo de 5 días hábiles.
      </Section>
      <Section title="6. Contacto">
        Para cualquier pregunta sobre esta política, escríbenos a: <span style={{ color: 'var(--blue-200)' }}>contacto@jbds.store</span>
      </Section>
    </ModalWrapper>
  );
}

/* ── Contenido Términos ── */
export function TermsModal({ isOpen, onClose }) {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--blue-200)', marginBottom: '0.6rem' }}>{title}</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Términos y Condiciones">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Última actualización: Enero 2025</p>
      <Section title="1. Aceptación">
        Al usar jbds.store y realizar compras, aceptas estos términos. Si no estás de acuerdo, te pedimos no usar el servicio.
      </Section>
      <Section title="2. Productos y precios">
        Los precios están en pesos colombianos (COP) e incluyen IVA cuando aplica. Nos reservamos el derecho de modificar precios sin previo aviso, aunque los pedidos confirmados respetan el precio al momento de la compra.
      </Section>
      <Section title="3. Proceso de compra">
        Un pedido se considera confirmado al recibir el número de orden (JB-XXXXX). La coordinación de pago y envío se realiza por WhatsApp o email tras la confirmación.
      </Section>
      <Section title="4. Envíos">
        Los tiempos de entrega son estimados y pueden variar según la ubicación. El costo de envío es de $12.000 COP para pedidos menores a $200.000 COP; pedidos superiores tienen envío gratuito.
      </Section>
      <Section title="5. Devoluciones">
        Aceptamos devoluciones dentro de los 7 días hábiles posteriores a la entrega, siempre que el producto esté en condiciones originales. Contáctanos por WhatsApp para iniciar el proceso.
      </Section>
      <Section title="6. Limitación de responsabilidad">
        jbds.store no se responsabiliza por demoras causadas por transportadoras terceras o situaciones de fuerza mayor.
      </Section>
    </ModalWrapper>
  );
}
