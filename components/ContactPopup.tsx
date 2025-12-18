
import React, { useState } from 'react';

const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-4">
      {/* Sub Buttons (Actions) */}
      <div className={`flex flex-col gap-3 transition-all duration-300 transform origin-bottom ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-0 pointer-events-none'
      }`}>
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/905000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          title="WhatsApp ile İletişime Geç"
        >
          <div className="size-12 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center text-white hover:bg-[#128C7E] transition-all transform hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
          <span className="bg-white dark:bg-[#1e1e1e] text-primary dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Destek
          </span>
        </a>

        {/* Call Button */}
        <a 
          href="tel:+905000000000" 
          className="group flex items-center gap-3"
          title="Hemen Ara"
        >
          <div className="size-12 rounded-full bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-white/10 shadow-xl flex items-center justify-center text-primary dark:text-white hover:bg-gold hover:text-white transition-all transform hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <span className="bg-white dark:bg-[#1e1e1e] text-primary dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Telefonla Ara
          </span>
        </a>
      </div>

      {/* Main Trigger Button */}
      <button 
        onClick={toggleMenu}
        className={`size-14 md:size-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform active:scale-90 relative ${
          isOpen ? 'bg-primary text-white rotate-180' : 'bg-gold text-white hover:scale-105'
        }`}
        aria-label="İletişim Menüsü"
      >
        <span className="material-symbols-outlined text-3xl md:text-4xl">
          {isOpen ? 'close' : 'call'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default ContactPopup;
