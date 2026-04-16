import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, email, plan, joinedAt }
  // Simulated local "DB" of registered users
  const [users, setUsers] = useState([]);

  const register = ({ username, email, password }) => {
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Este correo ya está registrado.' };
    }
    if (users.find(u => u.username === username)) {
      return { ok: false, error: 'Este nombre de usuario ya está en uso.' };
    }
    const newUser = { username, email, password, plan: 'Gratis', joinedAt: new Date() };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'Correo o contraseña incorrectos.' };
    setUser(found);
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
