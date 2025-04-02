
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define all supported languages
export type Language = 'en' | 'hi';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionary
// This would be much more comprehensive in a real app
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'about': 'About Us',
    'services': 'Services',
    'contact': 'Contact',
    'login': 'Login',
    'signup': 'Sign Up',
    
    // Hero Section
    'hero.title': 'Welcome to Kisan Bhasha Bandhu',
    'hero.subtitle': 'Connecting Farmers with Expert Advice and Resources',
    'hero.cta': 'Get Started',
    'hero.secondary': 'Learn More',
    
    // Features Section
    'features.title': 'Our Services',
    'features.subtitle': 'How we can help you succeed',
    
    'features.consult.title': 'Expert Consultations',
    'features.consult.desc': 'Connect with agriculture experts via video or audio calls for personalized guidance.',
    'features.consult.cta': 'Book a Consultation',
    
    'features.visit.title': 'Farm Visits',
    'features.visit.desc': 'Schedule an expert to visit your farm for hands-on guidance and problem-solving.',
    'features.visit.cta': 'Request a Visit',
    
    'features.advice.title': 'Crop Advice',
    'features.advice.desc': 'Get personalized recommendations for your crops based on your specific conditions.',
    'features.advice.cta': 'Get Advice',
    
    'features.tips.title': 'Farming Tips',
    'features.tips.desc': 'Access a library of practical farming tips, guides, and best practices.',
    'features.tips.cta': 'Browse Tips',
    
    // Call to Action
    'cta.title': 'Ready to improve your farming?',
    'cta.subtitle': 'Join thousands of farmers already benefiting from our platform',
    'cta.button': 'Get Started Now',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Language Switcher
    'language.switch': 'भाषा बदलें',
    'language.en': 'English',
    'language.hi': 'हिंदी',
  },
  hi: {
    // Navigation
    'home': 'होम',
    'about': 'हमारे बारे में',
    'services': 'सेवाएं',
    'contact': 'संपर्क करें',
    'login': 'लॉग इन',
    'signup': 'साइन अप',
    
    // Hero Section
    'hero.title': 'किसान भाषा बंधु में आपका स्वागत है',
    'hero.subtitle': 'किसानों को विशेषज्ञ सलाह और संसाधनों से जोड़ना',
    'hero.cta': 'शुरू करें',
    'hero.secondary': 'और जानें',
    
    // Features Section
    'features.title': 'हमारी सेवाएं',
    'features.subtitle': 'हम आपकी सफलता में कैसे मदद कर सकते हैं',
    
    'features.consult.title': 'विशेषज्ञ परामर्श',
    'features.consult.desc': 'व्यक्तिगत मार्गदर्शन के लिए वीडियो या ऑडियो कॉल के माध्यम से कृषि विशेषज्ञों से जुड़ें।',
    'features.consult.cta': 'परामर्श बुक करें',
    
    'features.visit.title': 'खेत का दौरा',
    'features.visit.desc': 'व्यावहारिक मार्गदर्शन और समस्या-समाधान के लिए अपने खेत पर विशेषज्ञ को बुलाएं।',
    'features.visit.cta': 'दौरा अनुरोध करें',
    
    'features.advice.title': 'फसल सलाह',
    'features.advice.desc': 'अपनी विशिष्ट स्थितियों के आधार पर अपनी फसलों के लिए व्यक्तिगत सिफारिशें प्राप्त करें।',
    'features.advice.cta': 'सलाह प्राप्त करें',
    
    'features.tips.title': 'खेती के टिप्स',
    'features.tips.desc': 'व्यावहारिक खेती के टिप्स, गाइड और सर्वोत्तम प्रथाओं की लाइब्रेरी तक पहुंचें।',
    'features.tips.cta': 'टिप्स ब्राउज़ करें',
    
    // Call to Action
    'cta.title': 'अपनी खेती में सुधार के लिए तैयार हैं?',
    'cta.subtitle': 'हजारों किसानों से जुड़ें जो पहले से ही हमारे प्लेटफॉर्म से लाभ उठा रहे हैं',
    'cta.button': 'अभी शुरू करें',
    
    // Footer
    'footer.rights': 'सर्वाधिकार सुरक्षित',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    
    // Language Switcher
    'language.switch': 'Change Language',
    'language.en': 'English',
    'language.hi': 'हिंदी',
  }
};

// Language Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check for saved language preference or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  // Persist language preference
  useEffect(() => {
    localStorage.setItem('language', language);
    // Optionally set html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
