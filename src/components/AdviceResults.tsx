
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, Seedling, Calendar, DollarSign, ArrowDownCircle } from "lucide-react";

type AdviceResultsProps = {
  adviceResult: {
    recommendations: {
      cropName: string;
      bestPractices: string[];
      expectedYield: string;
      timeline: string;
      marketValue: string;
    }[];
    soilHealth: {
      recommendations: string[];
    };
    waterManagement: {
      recommendations: string[];
    };
  };
  onReset: () => void;
};

const AdviceResults = ({ adviceResult, onReset }: AdviceResultsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-kisan-green-800">
          {t('advice.results.title')}
        </h2>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="border-kisan-green-300 text-kisan-green-700"
        >
          {t('advice.results.newAdvice')}
        </Button>
      </div>

      {/* Crop Recommendations */}
      {adviceResult.recommendations.map((recommendation, index) => (
        <Card key={index} className="border-kisan-green-200">
          <CardHeader className="bg-kisan-green-50 border-b border-kisan-green-100">
            <CardTitle className="text-xl text-kisan-green-800 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-kisan-green-700" />
              {t('advice.results.cropRecommendations')} - {recommendation.cropName}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-kisan-cream-50 p-4 rounded-md">
                <h4 className="font-medium text-kisan-charcoal-700 flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  {t('advice.results.timeline')}
                </h4>
                <p>{recommendation.timeline}</p>
              </div>
              <div className="bg-kisan-cream-50 p-4 rounded-md">
                <h4 className="font-medium text-kisan-charcoal-700 flex items-center gap-2 mb-2">
                  <ArrowDownCircle className="h-4 w-4" />
                  {t('advice.results.expectedYield')}
                </h4>
                <p>{recommendation.expectedYield}</p>
              </div>
              <div className="bg-kisan-cream-50 p-4 rounded-md">
                <h4 className="font-medium text-kisan-charcoal-700 flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  {t('advice.results.marketValue')}
                </h4>
                <p>{recommendation.marketValue}</p>
              </div>
            </div>

            <h4 className="font-medium text-kisan-charcoal-700 mb-2">
              {t('advice.results.bestPractices')}
            </h4>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
              {recommendation.bestPractices.map((practice, idx) => (
                <li key={idx} className="text-kisan-charcoal-600">{practice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      {/* Soil and Water Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-kisan-brown-200">
          <CardHeader className="bg-kisan-brown-50 border-b border-kisan-brown-100">
            <CardTitle className="text-lg text-kisan-brown-800 flex items-center gap-2">
              <Seedling className="h-5 w-5 text-kisan-brown-700" />
              {t('advice.results.soilManagement')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc list-inside space-y-2 pl-2">
              {adviceResult.soilHealth.recommendations.map((rec, idx) => (
                <li key={idx} className="text-kisan-charcoal-600">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-kisan-gold-200">
          <CardHeader className="bg-kisan-gold-50 border-b border-kisan-gold-100">
            <CardTitle className="text-lg text-kisan-gold-800 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-kisan-gold-700" />
              {t('advice.results.waterManagement')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="list-disc list-inside space-y-2 pl-2">
              {adviceResult.waterManagement.recommendations.map((rec, idx) => (
                <li key={idx} className="text-kisan-charcoal-600">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdviceResults;
