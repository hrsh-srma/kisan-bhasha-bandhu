
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CropAdviceForm from "@/components/CropAdviceForm";
import AdviceResults from "@/components/AdviceResults";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for advice results
const generateMockAdviceResult = (formData: any) => {
  const cropName = formData.cropType || "Rice";
  const soilType = formData.soilType || "Loamy";
  const region = formData.region || "Northern India";
  
  return {
    recommendations: [
      {
        cropName: cropName,
        bestPractices: [
          `Use appropriate seeds for ${region} climate.`,
          `Prepare the soil with organic matter for better ${cropName} growth.`,
          `Implement proper spacing between ${cropName} plants.`,
          `Follow recommended watering schedule for ${soilType} soil.`,
          `Apply natural pest control methods suitable for ${cropName}.`
        ],
        expectedYield: `4-5 tons per hectare`,
        timeline: `Planting to harvest: 100-120 days`,
        marketValue: `₹25-30 per kg at current markets`
      }
    ],
    soilHealth: {
      recommendations: [
        `Add organic compost to improve ${soilType} soil structure.`,
        `Conduct pH testing every growing season.`,
        `Practice crop rotation to prevent nutrient depletion.`,
        `Use cover crops during off-season to protect soil.`,
        `Apply natural minerals based on soil test results.`
      ]
    },
    waterManagement: {
      recommendations: [
        `Implement drip irrigation to conserve water.`,
        `Create water channels appropriate for ${region} terrain.`,
        `Collect rainwater during monsoon season.`,
        `Monitor soil moisture regularly.`,
        `Apply mulch to reduce water evaporation.`
      ]
    }
  };
};

const CropAdvice = () => {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();
  const [adviceResult, setAdviceResult] = useState<any>(null);
  const { toast } = useToast();

  // Redirect to auth page if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const handleFormSubmit = (formData: any) => {
    // In a real app, this would be an API call to get advice
    try {
      // Simulate API call delay
      setTimeout(() => {
        const result = generateMockAdviceResult(formData);
        setAdviceResult(result);
        toast({
          title: t('advice.success.title'),
          description: t('advice.success.message'),
        });
      }, 1000);
    } catch (error) {
      toast({
        title: t('advice.error.title'),
        description: t('advice.error.message'),
        variant: 'destructive',
      });
    }
  };

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
            <CropAdviceForm setAdviceResult={handleFormSubmit} />
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
