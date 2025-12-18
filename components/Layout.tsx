
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import ContactPopup from './ContactPopup';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Hikayemiz', page: Page.Home, icon: 'history_edu' },
    { label: 'Özel Günler', page: Page.Catalog, icon: 'auto_awesome' },
    { label: 'Fiyatlandırma', page: Page.Pricing, icon: 'payments' },
    { label: 'İletişim', page: Page.Contact, icon: 'contact_support' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-[110] bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 text-primary dark:text-white cursor-pointer group shrink-0"
            onClick={() => handleNavigate(Page.Home)}
          >
            <div className="size-9 bg-primary dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-primary transition-transform group-hover:scale-105 shadow-lg shadow-black/5">
              <span className="material-symbols-outlined text-xl">music_note</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Melody<span className="text-gold">ofUs</span></h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`text-sm font-bold transition-all hover:text-gold ${
                  currentPage === item.page ? 'text-gold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Action Area */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavigate(Page.AIComposer)}
              className="hidden sm:flex items-center justify-center rounded-xl h-11 px-6 bg-primary hover:bg-gold transition-all text-white text-sm font-bold shadow-md active:scale-95"
            >
              Şarkını Yaz
            </button>
            
            {/* Mobile Toggle Button */}
            <button 
              onClick={toggleMenu}
              className="flex md:hidden items-center justify-center rounded-xl size-11 bg-gray-50 dark:bg-white/5 text-primary dark:text-white border border-gray-100 dark:border-white/5 transition-all active:scale-90"
              aria-label={isMenuOpen ? "Kapat" : "Menü"}
            >
              <span className="material-symbols-outlined text-[28px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[150] md:hidden transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        ></div>

        {/* Menu Content (Slide from right) */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-background-dark shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Navigasyon</span>
              <button 
                onClick={toggleMenu}
                className="size-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all active:scale-95 ${
                    currentPage === item.page 
                      ? 'bg-gold text-white shadow-lg shadow-gold/20' 
                      : 'text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`size-10 rounded-xl flex items-center justify-center ${
                    currentPage === item.page ? 'bg-white/20' : 'bg-gold-light dark:bg-gold/10 text-gold'
                  }`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
              <button 
                onClick={() => handleNavigate(Page.AIComposer)}
                className="w-full flex items-center justify-center gap-3 rounded-2xl h-16 bg-primary text-white text-lg font-bold shadow-xl active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">psychology</span>
                Hemen Şarkını Yaz
              </button>
              <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                © 2024 Melody of Us. Hikayeni seslendir.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
        {/* Floating Contact Panel */}
        <ContactPopup />
      </main>

      {/* Main Footer */}
      <footer className="bg-[#111] text-white py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-5 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gold">music_note</span>
              <h3 className="font-bold text-2xl tracking-tight">Melody of Us</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Duyguları notalara döküyoruz. Düğünler, markalar ve sevdikleriniz için profesyonel sanatçılar tarafından hazırlanan tamamen orijinal besteler.
            </p>
            <div className="flex gap-4">
              <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </a>
              <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors">
                <span className="material-symbols-outlined text-sm">smart_display</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold">Servisler</h4>
              <button onClick={() => handleNavigate(Page.Catalog)} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Düğün Paketi</button>
              <button onClick={() => handleNavigate(Page.Catalog)} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Marka Cıngılları</button>
              <button onClick={() => handleNavigate(Page.Catalog)} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Hediye Şarkılar</button>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold">Hakkımızda</h4>
              <button className="text-sm text-gray-400 hover:text-white transition-colors text-left">Ekibimiz</button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors text-left">Portfolyo</button>
              <button onClick={() => handleNavigate(Page.Contact)} className="text-sm text-gray-400 hover:text-white transition-colors text-left">İletişim</button>
            </div>
            <div className="hidden sm:flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold">Yasal</h4>
              <button className="text-sm text-gray-400 hover:text-white transition-colors text-left">Gizlilik</button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors text-left">Şartlar</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 mt-16 border-t border-white/5 text-center md:text-left">
          <p className="text-xs text-gray-600">© 2024 Melody of Us. Tüm hakları saklıdır. Made with love for music lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
