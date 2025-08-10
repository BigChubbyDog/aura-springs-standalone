'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Language } from '@/lib/translations';

export default function LanguageSelector() {
  const [language, setLanguage] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguage('es');
        document.documentElement.lang = 'es';
      }
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    setIsOpen(false);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    
    // Reload page to apply translations (in production, use context/state management)
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'ES'}
        </span>
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
          >
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                language === 'en' ? 'bg-aura-primary-50 text-aura-primary-700' : 'text-gray-700'
              }`}
              role="menuitem"
              lang="en"
            >
              <span className="text-lg">🇺🇸</span>
              <span className="font-medium">English</span>
              {language === 'en' && (
                <span className="ml-auto text-aura-primary-600">✓</span>
              )}
            </button>
            
            <button
              onClick={() => handleLanguageChange('es')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                language === 'es' ? 'bg-aura-primary-50 text-aura-primary-700' : 'text-gray-700'
              }`}
              role="menuitem"
              lang="es"
            >
              <span className="text-lg">🇲🇽</span>
              <span className="font-medium">Español</span>
              {language === 'es' && (
                <span className="ml-auto text-aura-primary-600">✓</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}