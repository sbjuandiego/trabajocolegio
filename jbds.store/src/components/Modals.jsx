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
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,12,27,0.75)', backdropFilter: 'blur(6px)', zIndex: 300, animation: 'fadeIn .2s ease' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(600px,92vw)', maxHeight: '85vh', zIndex: 301, background: 'rgba(8,20,40,0.97)', backdropFilter: 'blur(32px) saturate(180%)', border: '1px solid rgba(144,202,249,0.15)', borderRadius: '24px', boxShadow: '0 32px 80px rgba(2,12,27,0.7)', display: 'flex', flexDirection: 'column', animation: 'slideUp .3s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(144,202,249,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>{title}</h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(144,202,249,0.15)', background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>{children}</div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
    </>
  );
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--blue-200)', marginBottom: '0.6rem' }}>{title}</h3>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{children}</div>
  </div>
);

export function ContactModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Contáctanos">
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>¿Tienes alguna duda, sugerencia o quieres que agreguemos un programa? Escríbenos.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[['📱','WhatsApp','+57 310 000 0000','Lunes a Sábado, 8am – 8pm'],['📧','Email','contacto@jbds.hub','Respuesta en menos de 24h'],['💬','Discord','discord.gg/jbdshub','Comunidad activa'],['🕐','Horario','Lunes – Sábado','8:00 AM – 8:00 PM']].map(([icon,title,desc,sub]) => (
          <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'rgba(10,25,47,0.5)', border: '1px solid rgba(144,202,249,0.1)', borderRadius: '14px' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '2px' }}>{title}</p>
              <p style={{ color: 'var(--blue-200)', fontSize: '0.9rem' }}>{desc}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(21,101,192,0.08)', border: '1px solid rgba(66,165,245,0.15)', borderRadius: '12px' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>💡 ¿Quieres solicitar un programa específico? Escríbenos el nombre y versión y lo agregamos al catálogo.</p>
      </div>
    </ModalWrapper>
  );
}

export function PrivacyModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Política de Privacidad">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Última actualización: Enero 2025</p>
      <Section title="1. Información que recopilamos">Al registrarte recopilamos nombre de usuario, email y contraseña (encriptada). No almacenamos datos bancarios ni de pago.</Section>
      <Section title="2. Uso de la información">Tu información se usa exclusivamente para: gestionar tu cuenta, recordar tus descargas y enviarte comunicaciones del servicio (solo si las solicitas).</Section>
      <Section title="3. Descargas">No registramos qué programas descarga cada usuario ni compartimos ese historial con terceros.</Section>
      <Section title="4. Cookies">Usamos solo cookies técnicas necesarias para mantener tu sesión activa. No hay cookies de publicidad.</Section>
      <Section title="5. Tus derechos">Puedes solicitar eliminar tu cuenta y todos tus datos en cualquier momento escribiendo a contacto@jbds.hub.</Section>
    </ModalWrapper>
  );
}

export function TermsModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Términos y Condiciones">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Última actualización: Enero 2025</p>
      <Section title="1. Uso del servicio">jbds.hub es una plataforma educativa de referencia. El contenido se comparte con fines informativos y educativos.</Section>
      <Section title="2. Responsabilidad del usuario">El usuario es responsable de cumplir con las leyes de propiedad intelectual vigentes en su país. jbds.hub no se hace responsable del uso que cada usuario dé al software descargado.</Section>
      <Section title="3. Cuentas de usuario">Eres responsable de mantener segura tu contraseña. No compartas tu cuenta con terceros. Nos reservamos el derecho de suspender cuentas que violen estos términos.</Section>
      <Section title="4. Disponibilidad">No garantizamos disponibilidad ininterrumpida del servicio. Podemos modificar o retirar contenido del catálogo sin previo aviso.</Section>
      <Section title="5. Modificaciones">Estos términos pueden actualizarse. Te notificaremos cambios importantes por email si tienes cuenta registrada.</Section>
      <div style={{ padding: '1rem', background: 'rgba(255,179,0,0.07)', border: '1px solid rgba(255,179,0,0.2)', borderRadius: '12px', marginTop: '0.5rem' }}>
        <p style={{ fontSize: '0.82rem', color: '#ffcc80', lineHeight: 1.6 }}>⚠️ Todo el software listado es propiedad de sus respectivos creadores. Este sitio no aloja archivos directamente — actúa como directorio de referencias e instrucciones.</p>
      </div>
    </ModalWrapper>
  );
}
