import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/* ── Field fuera del componente para evitar re-mount ── */
function Field({ label, k, type, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={S.label}>{label}</label>
      <input
        type={type || 'text'}
        value={value}
        onChange={e => onChange(k, e.target.value)}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'off'}
        style={{ ...S.input, borderColor: error ? 'rgba(239,83,80,0.5)' : 'rgba(144,202,249,0.15)' }}
      />
      {error && <p style={{ color: '#ef5350', fontSize: '0.75rem', marginTop: '3px' }}>{error}</p>}
    </div>
  );
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setTab(initialTab);
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
    setServerError('');
    setSuccess('');
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: '' }));
    setServerError('');
  };

  const validateLogin = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Email inválido';
    if (!form.password) e.password = 'Requerido';
    return e;
  };

  const validateRegister = () => {
    const e = {};
    if (form.username.trim().length < 3) e.username = 'Mínimo 3 caracteres';
    if (!form.email.includes('@')) e.email = 'Email inválido';
    if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirm) e.confirm = 'Las contraseñas no coinciden';
    return e;
  };

  const handleLogin = () => {
    const e = validateLogin();
    if (Object.keys(e).length) { setErrors(e); return; }
    const res = login({ email: form.email, password: form.password });
    if (!res.ok) { setServerError(res.error); return; }
    onClose();
  };

  const handleRegister = () => {
    const e = validateRegister();
    if (Object.keys(e).length) { setErrors(e); return; }
    const res = register({ username: form.username, email: form.email, password: form.password });
    if (!res.ok) { setServerError(res.error); return; }
    setSuccess(`¡Cuenta creada! Bienvenido, ${form.username} 🎉`);
    setTimeout(() => onClose(), 1800);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,12,27,0.75)', backdropFilter: 'blur(6px)', zIndex: 300, animation: 'fadeIn .2s ease' }} />

      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(460px,92vw)', zIndex: 301,
        background: 'rgba(8,20,40,0.97)',
        backdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(144,202,249,0.15)',
        borderRadius: '24px',
        boxShadow: '0 32px 80px rgba(2,12,27,0.7)',
        overflow: 'hidden',
        animation: 'slideUp .3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem' }}>
              {tab === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {tab === 'login' ? 'Accede a tus descargas y favoritos' : 'Gratis para siempre en el plan básico'}
            </p>
          </div>
          <button onClick={onClose} style={S.closeBtn}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', margin: '1.25rem 1.75rem 0', background: 'rgba(10,25,47,0.6)', borderRadius: '12px', padding: '4px', border: '1px solid rgba(144,202,249,0.1)' }}>
          {[['login','Iniciar sesión'],['register','Registrarse']].map(([t, label]) => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); setServerError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '0.55rem', borderRadius: '9px',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
                fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s',
                background: tab === t ? 'rgba(21,101,192,0.5)' : 'transparent',
                color: tab === t ? 'var(--blue-100)' : 'var(--text-muted)',
                boxShadow: tab === t ? '0 2px 8px rgba(21,101,192,0.3)' : 'none',
              }}>{label}</button>
          ))}
        </div>

        {/* Form */}
        <div style={{ padding: '1.25rem 1.75rem 1.75rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
              <p style={{ color: '#a5d6a7', fontWeight: 600 }}>{success}</p>
            </div>
          ) : (
            <>
              {serverError && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(239,83,80,0.1)', border: '1px solid rgba(239,83,80,0.25)', color: '#ef9a9a', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {serverError}
                </div>
              )}

              {tab === 'register' && (
                <Field label="Nombre de usuario *" k="username" placeholder="juandiego99"
                  value={form.username} onChange={set} error={errors.username} />
              )}
              <Field label="Correo electrónico *" k="email" type="email" placeholder="juan@email.com"
                value={form.email} onChange={set} error={errors.email} />
              <Field label="Contraseña *" k="password" type="password" placeholder="••••••••"
                value={form.password} onChange={set} error={errors.password} />
              {tab === 'register' && (
                <Field label="Confirmar contraseña *" k="confirm" type="password" placeholder="••••••••"
                  value={form.confirm} onChange={set} error={errors.confirm} />
              )}

              {tab === 'register' && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(21,101,192,0.08)', border: '1px solid rgba(66,165,245,0.15)', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    ✅ Plan gratuito incluye acceso a todos los programas gratuitos<br />
                    ⬆️ Actualiza a Pro para desbloquear software premium
                  </p>
                </div>
              )}

              <button
                onClick={tab === 'login' ? handleLogin : handleRegister}
                style={{ ...S.primaryBtn, marginTop: '0.25rem' }}>
                {tab === 'login' ? 'Entrar →' : 'Crear cuenta gratis →'}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translate(-50%,-46%)} to{opacity:1;transform:translate(-50%,-50%)} }
      `}</style>
    </>
  );
}

const S = {
  closeBtn: { width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(144,202,249,0.15)', background: 'rgba(13,33,55,0.5)', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  label: { display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '5px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px', border: '1px solid rgba(144,202,249,0.15)', background: 'rgba(10,25,47,0.6)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' },
  primaryBtn: { width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#1565c0,#1e88e5)', color: 'white', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(21,101,192,0.4)', fontFamily: 'var(--font-body)' },
};
