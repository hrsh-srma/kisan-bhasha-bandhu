
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropAdviceForm from "@/components/CropAdviceForm";
import AdviceResults from "@/components/AdviceResults";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const CropAdvice = () => {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();
  const [adviceResult, setAdviceResult] = useState<any>(null);

  // Redirect to auth page if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-kisan-cream-50 to-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-kisan-green-800 mb-4">
            {t('advice.title')}
          </h1>
          <p className="text-lg text-kisan-charcoal-600 max-w-2xl mx-auto">
            {t('advice.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          {!adviceResult ? (
            <CropAdviceForm setAdviceResult={setAdviceResult} />
          ) : (
            <AdviceResults 
              adviceResult={adviceResult} 
              onReset={() => setAdviceResult(null)} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CropAdvice;
