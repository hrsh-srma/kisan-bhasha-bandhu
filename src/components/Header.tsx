
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  // For small screen navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t('home'), href: '#' },
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white/95 backdrop-blur-sm border-b border-kisan-green-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name */}
        <a href="#" className="flex items-center gap-2 text-kisan-green-800">
          <div className="w-10 h-10 bg-kisan-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
            KB
          </div>
          <h1 className="text-xl md:text-2xl font-bold hidden sm:block">Kisan Bhasha Bandhu</h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-kisan-charcoal-700 hover:text-kisan-green-700 font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitcher />
          <div className="hidden md:flex gap-3">
            <Button variant="outline" className="font-medium">
              {t('login')}
            </Button>
            <Button className="bg-kisan-green-700 hover:bg-kisan-green-800 text-white font-medium">
              {t('signup')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[70vw]">
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    className="text-kisan-charcoal-700 hover:text-kisan-green-700 font-medium text-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="outline" className="w-full font-medium">
                    {t('login')}
                  </Button>
                  <Button className="w-full bg-kisan-green-700 hover:bg-kisan-green-800 text-white font-medium">
                    {t('signup')}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
