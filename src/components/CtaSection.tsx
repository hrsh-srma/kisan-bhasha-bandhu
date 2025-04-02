
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export const CtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-kisan-green-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-kisan-green-600 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-kisan-green-800 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-kisan-gold-500 rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-kisan-cream-100 mb-10 max-w-3xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <Button className="btn-accent inline-flex text-xl px-8 py-4">
          {t('cta.button')}
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
