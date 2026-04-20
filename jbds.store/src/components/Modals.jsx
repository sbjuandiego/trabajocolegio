import { useEffect } from 'react';
import Icon from './Icon';

function ModalWrapper({ isOpen, onClose, title, iconName, children }) {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {iconName && (
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(21,101,192,0.2)', border: '1px solid rgba(66,165,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={iconName} size={19} fill={0} weight={300} color="var(--blue-300)" />
              </div>
            )}
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(144,202,249,0.15)', background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="close" size={17} fill={1} weight={400} />
          </button>
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
  const contacts = [
    { icon: 'smartphone',  title: 'WhatsApp',  desc: '+57 310 000 0000',      sub: 'Lunes a Sábado, 8am – 8pm' },
    { icon: 'mail',        title: 'Email',     desc: 'contacto@jbds.hub',     sub: 'Respuesta en menos de 24h' },
    { icon: 'forum',       title: 'Discord',   desc: 'discord.gg/jbdshub',    sub: 'Comunidad activa' },
    { icon: 'schedule',    title: 'Horario',   desc: 'Lunes – Sábado',        sub: '8:00 AM – 8:00 PM' },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Contáctanos" iconName="contact_support">
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        ¿Tienes alguna duda, sugerencia o quieres que agreguemos un programa? Escríbenos.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {contacts.map(c => (
          <div key={c.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'rgba(10,25,47,0.5)', border: '1px solid rgba(144,202,249,0.1)', borderRadius: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(66,165,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={c.icon} size={20} fill={0} weight={300} color="var(--blue-300)" />
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '2px' }}>{c.title}</p>
              <p style={{ color: 'var(--blue-200)', fontSize: '0.9rem' }}>{c.desc}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginTop: '1.25rem', padding: '0.9rem 1rem', background: 'rgba(21,101,192,0.08)', border: '1px solid rgba(66,165,245,0.15)', borderRadius: '12px' }}>
        <Icon name="lightbulb" size={16} fill={1} weight={500} color="var(--blue-200)" style={{ marginTop: '1px', flexShrink: 0 }} />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          ¿Quieres solicitar un programa específico? Escríbenos el nombre y versión y lo agregamos al catálogo.
        </p>
      </div>
    </ModalWrapper>
  );
}

export function PrivacyModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Política de Privacidad" iconName="privacy_tip">
      <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
        <Icon name="event" size={13} fill={0} weight={300} />
        Última actualización: Enero 2025
      </p>
      <Section title="1. Información que recopilamos">Al registrarte recopilamos nombre de usuario, email y contraseña (encriptada). No almacenamos datos bancarios ni de pago.</Section>
      <Section title="2. Uso de la información">Tu información se usa exclusivamente para gestionar tu cuenta, recordar tus descargas y enviarte comunicaciones del servicio (solo si las solicitas).</Section>
      <Section title="3. Descargas">No registramos qué programas descarga cada usuario ni compartimos ese historial con terceros.</Section>
      <Section title="4. Cookies">Usamos solo cookies técnicas necesarias para mantener tu sesión activa. No hay cookies de publicidad.</Section>
      <Section title="5. Tus derechos">Puedes solicitar eliminar tu cuenta y todos tus datos en cualquier momento escribiendo a contacto@jbds.hub.</Section>
    </ModalWrapper>
  );
}

export function TermsModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Términos y Condiciones" iconName="gavel">
      <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
        <Icon name="event" size={13} fill={0} weight={300} />
        Última actualización: Enero 2025
      </p>
      <Section title="1. Uso del servicio">jbds.hub es una plataforma educativa de referencia. El contenido se comparte con fines informativos y educativos.</Section>
      <Section title="2. Responsabilidad del usuario">El usuario es responsable de cumplir con las leyes de propiedad intelectual vigentes en su país. jbds.hub no se hace responsable del uso que cada usuario dé al software descargado.</Section>
      <Section title="3. Cuentas de usuario">Eres responsable de mantener segura tu contraseña. No compartas tu cuenta con terceros.</Section>
      <Section title="4. Disponibilidad">No garantizamos disponibilidad ininterrumpida del servicio. Podemos modificar o retirar contenido del catálogo sin previo aviso.</Section>
      <Section title="5. Modificaciones">Estos términos pueden actualizarse. Te notificaremos cambios importantes por email si tienes cuenta registrada.</Section>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginTop: '0.5rem', padding: '0.9rem 1rem', background: 'rgba(255,179,0,0.07)', border: '1px solid rgba(255,179,0,0.2)', borderRadius: '12px' }}>
        <Icon name="warning" size={16} fill={1} weight={500} color="#ffcc80" style={{ marginTop: '1px', flexShrink: 0 }} />
        <p style={{ fontSize: '0.82rem', color: '#ffcc80', lineHeight: 1.6 }}>Todo el software listado es propiedad de sus respectivos creadores. Este sitio actúa como directorio de referencias e instrucciones.</p>
      </div>
    </ModalWrapper>
  );
}
