import { useState } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgramGrid from './components/ProgramGrid';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import AuthModal from './components/AuthModal';
import ProgramDetail from './components/ProgramDetail';
import Footer from './components/Footer';
import { ContactModal, PrivacyModal, TermsModal } from './components/Modals';

function AppInner() {
  const [page, setPage] = useState('home');
  const [modal, setModal] = useState(null);          // 'contact' | 'privacy' | 'terms'
  const [authModal, setAuthModal] = useState(null);  // 'login' | 'register' | null
  const [detailProgram, setDetailProgram] = useState(null);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (tab = 'login') => setAuthModal(tab);

  const onDownload = (p) => {
    alert(`⬇ Descarga iniciada: ${p.name}\n\nAquí conectarías el enlace real de descarga.`);
  };

  // "free" page = catalog filtered, handled inside ProgramGrid via prop
  const isCatalog = page === 'catalog' || page === 'free';

  return (
    <div className="app">
      <Navbar onNavigate={navigate} onOpenAuth={openAuth} />

      <main>
        {page === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <ProgramGrid onOpenAuth={() => openAuth('register')} onOpenDetail={setDetailProgram} />
          </>
        )}
        {isCatalog && (
          <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div style={{ padding: '3rem 1.5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {page === 'free' ? 'Acceso libre' : 'Explorar'}
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {page === 'free' ? 'Software gratuito' : 'Catálogo completo'}
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '500px' }}>
                {page === 'free' ? 'Descarga sin cuenta. 100% gratis.' : 'Filtra por categoría y encuentra lo que necesitas.'}
              </p>
            </div>
            <ProgramGrid
              onOpenAuth={() => openAuth('register')}
              onOpenDetail={setDetailProgram}
              initialFilter={page === 'free' ? 'free' : 'all'}
            />
          </div>
        )}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
        {page === 'profile' && <ProfilePage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} onModal={setModal} />

      {/* Auth modal */}
      <AuthModal isOpen={!!authModal} onClose={() => setAuthModal(null)} initialTab={authModal || 'login'} />

      {/* Program detail */}
      <ProgramDetail program={detailProgram} onClose={() => setDetailProgram(null)} onDownload={onDownload} onOpenAuth={() => openAuth('register')} />

      {/* Info modals */}
      <ContactModal isOpen={modal === 'contact'} onClose={() => setModal(null)} />
      <PrivacyModal isOpen={modal === 'privacy'} onClose={() => setModal(null)} />
      <TermsModal isOpen={modal === 'terms'} onClose={() => setModal(null)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
