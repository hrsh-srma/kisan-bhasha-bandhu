
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 px-4 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-kisan-cream-100 to-white"></div>
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-kisan-green-100 rounded-bl-full opacity-50"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-kisan-green-800 mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-kisan-charcoal-700 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">{t('hero.cta')}</Button>
              <Button variant="outline" className="border-kisan-green-600 text-kisan-green-700 hover:bg-kisan-green-50">
                {t('hero.secondary')}
              </Button>
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div className="order-1 md:order-2 flex justify-center relative animate-fade-in">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-kisan-gold-200 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-kisan-green-200 rounded-full opacity-60"></div>
              
              {/* Main image - would be replaced with an actual farming image */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Farmer in field" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
