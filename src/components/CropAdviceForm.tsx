
import React from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf } from "lucide-react";

type CropAdviceFormProps = {
  setAdviceResult: (result: any) => void;
};

type FormValues = {
  cropType: string;
  soilType: string;
  landSize: string;
  region: string;
  waterAvailability: string;
  additionalInfo: string;
};

const CropAdviceForm = ({ setAdviceResult }: CropAdviceFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      cropType: "",
      soilType: "",
      landSize: "",
      region: "",
      waterAvailability: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulating API call with a mock response
      // In a real app, you would send this data to an API
      setTimeout(() => {
        const mockResponse = {
          recommendations: [
            {
              cropName: data.cropType,
              bestPractices: [
                `Water ${data.cropType} regularly according to the ${data.waterAvailability} water availability in your region.`,
                `${data.soilType} soil in ${data.region} is excellent for ${data.cropType} cultivation.`,
                "Apply organic fertilizers for better yield.",
                "Monitor for pests regularly, especially during early growth stages.",
              ],
              expectedYield: "15-20 quintals per acre",
              timeline: "3-4 months to harvest",
              marketValue: "Rs. 2000-2500 per quintal",
            },
          ],
          soilHealth: {
            recommendations: [
              "Add organic matter to improve soil structure",
              "Consider crop rotation to maintain soil nutrients",
              "Test soil pH before planting",
            ],
          },
          waterManagement: {
            recommendations: [
              "Implement drip irrigation for water conservation",
              "Morning watering is most effective",
              "Consider rainwater harvesting to supplement irrigation",
            ],
          },
        };

        setAdviceResult(mockResponse);
        toast({
          title: t('advice.success.title'),
          description: t('advice.success.message'),
        });
      }, 1500);
    } catch (error) {
      toast({
        title: t('advice.error.title'),
        description: t('advice.error.message'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="bg-kisan-green-100 p-2 rounded-full mr-4">
          <Leaf className="h-6 w-6 text-kisan-green-700" />
        </div>
        <h2 className="text-xl font-semibold text-kisan-charcoal-800">
          {t('advice.form.title')}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('advice.form.cropType')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('advice.form.selectCrop')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rice">Rice (धान)</SelectItem>
                      <SelectItem value="wheat">Wheat (गेहूं)</SelectItem>
                      <SelectItem value="maize">Maize (मक्का)</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane (गन्ना)</SelectItem>
                      <SelectItem value="cotton">Cotton (कपास)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('advice.form.soilType')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('advice.form.selectSoil')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="clay">Clay (चिकनी मिट्टी)</SelectItem>
                      <SelectItem value="sandy">Sandy (बलुई मिट्टी)</SelectItem>
                      <SelectItem value="loam">Loam (दोमट मिट्टी)</SelectItem>
                      <SelectItem value="silt">Silt (गाद)</SelectItem>
                      <SelectItem value="black">Black (काली मिट्टी)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('advice.form.landSize')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="1.5 acres" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('advice.form.region')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="District/State" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waterAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('advice.form.waterAvailability')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('advice.form.selectWater')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="abundant">Abundant (प्रचुर)</SelectItem>
                      <SelectItem value="adequate">Adequate (पर्याप्त)</SelectItem>
                      <SelectItem value="limited">Limited (सीमित)</SelectItem>
                      <SelectItem value="scarce">Scarce (कम)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('advice.form.additionalInfo')}</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder={t('advice.form.additionalInfoPlaceholder')}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-kisan-green-700 hover:bg-kisan-green-800"
          >
            {t('advice.form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CropAdviceForm;
