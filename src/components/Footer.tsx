
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kisan-green-900 text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-kisan-green-800 font-bold text-xl">
                KB
              </div>
              <h3 className="text-xl font-bold">Kisan Bhasha Bandhu</h3>
            </div>
            <p className="text-kisan-cream-200 mb-4">
              Connecting farmers with expert advice and resources in their preferred language.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-4 text-kisan-cream-100">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-kisan-cream-200 hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="#about" className="text-kisan-cream-200 hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#services" className="text-kisan-cream-200 hover:text-white transition-colors">{t('services')}</a></li>
              <li><a href="#contact" className="text-kisan-cream-200 hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-4 text-kisan-cream-100">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-kisan-cream-200 hover:text-white transition-colors">{t('features.consult.title')}</a></li>
              <li><a href="#" className="text-kisan-cream-200 hover:text-white transition-colors">{t('features.visit.title')}</a></li>
              <li><a href="#" className="text-kisan-cream-200 hover:text-white transition-colors">{t('features.advice.title')}</a></li>
              <li><a href="#" className="text-kisan-cream-200 hover:text-white transition-colors">{t('features.tips.title')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-4 text-kisan-cream-100">{t('contact')}</h4>
            <address className="not-italic text-kisan-cream-200">
              <p className="mb-2">123 Farming Road</p>
              <p className="mb-2">Agricultural District</p>
              <p className="mb-2">hello@kisanbhashabandhu.com</p>
              <p>+91 98765 43210</p>
            </address>
          </div>
        </div>

        <div className="border-t border-kisan-green-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-kisan-cream-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Kisan Bhasha Bandhu. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-kisan-cream-300 hover:text-white text-sm transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-kisan-cream-300 hover:text-white text-sm transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
