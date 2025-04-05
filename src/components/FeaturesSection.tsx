
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Video, Users, Leaf, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Video,
      title: t('features.consult.title'),
      description: t('features.consult.desc'),
      cta: t('features.consult.cta'),
      color: 'bg-kisan-green-100',
      iconColor: 'text-kisan-green-700',
      link: '/crop-advice' // Changed to crop-advice as a fallback
    },
    {
      icon: Users,
      title: t('features.visit.title'),
      description: t('features.visit.desc'),
      cta: t('features.visit.cta'),
      color: 'bg-kisan-gold-100',
      iconColor: 'text-kisan-gold-700',
      link: '/crop-advice' // Changed to crop-advice as a fallback
    },
    {
      icon: Leaf,
      title: t('features.advice.title'),
      description: t('features.advice.desc'),
      cta: t('features.advice.cta'),
      color: 'bg-kisan-brown-100',
      iconColor: 'text-kisan-brown-700',
      link: '/crop-advice'
    },
    {
      icon: BookOpen,
      title: t('features.tips.title'),
      description: t('features.tips.desc'),
      cta: t('features.tips.cta'),
      color: 'bg-kisan-cream-200',
      iconColor: 'text-kisan-green-800',
      link: '/crop-advice' // Changed to crop-advice as a fallback
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-kisan-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kisan-green-800 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-kisan-charcoal-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card flex flex-col h-full transform hover:-translate-y-1 transition-all"
            >
              <div className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-kisan-charcoal-800">
                {feature.title}
              </h3>
              <p className="text-kisan-charcoal-600 mb-6 flex-grow">
                {feature.description}
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-kisan-green-300 text-kisan-green-700 hover:bg-kisan-green-50 hover:border-kisan-green-500 justify-start"
                asChild
              >
                <Link to={feature.link}>
                  {feature.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
