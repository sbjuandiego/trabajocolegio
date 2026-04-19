import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'jbdshub_users';
const SESSION_KEY = 'jbdshub_session';

/* Lee usuarios del localStorage */
function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

/* Guarda usuarios en localStorage */
function saveUsers(users) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); } catch {}
}

/* Lee la sesión activa */
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* Guarda / borra la sesión activa */
function saveSession(user) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [user, setUser] = useState(() => loadSession());

  /* Sincroniza usuarios al localStorage cada vez que cambian */
  useEffect(() => { saveUsers(users); }, [users]);

  /* Sincroniza sesión */
  useEffect(() => { saveSession(user); }, [user]);

  const register = ({ username, email, password }) => {
    const current = loadUsers(); // lee fresco para evitar race conditions
    if (current.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: 'Este correo ya está registrado.' };
    if (current.find(u => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, error: 'Este nombre de usuario ya está en uso.' };

    const newUser = {
      username,
      email,
      password,          // en producción usarías bcrypt; aquí es demo
      plan: 'Gratis',
      joinedAt: new Date().toISOString(),
    };
    const updated = [...current, newUser];
    setUsers(updated);
    saveUsers(updated);   // escribe inmediatamente

    const session = { username, email, plan: 'Gratis', joinedAt: newUser.joinedAt };
    setUser(session);
    saveSession(session);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const current = loadUsers();
    const found = current.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Correo o contraseña incorrectos.' };

    const session = { username: found.username, email: found.email, plan: found.plan, joinedAt: found.joinedAt };
    setUser(session);
    saveSession(session);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
