
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  full_name: z.string().min(1, { message: "Full name is required" }),
  user_type: z.enum(["farmer", "expert"]),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Auth() {
  const { user, signIn, signUp, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      full_name: "",
      user_type: "farmer",
    },
  });

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSignupSubmit(values: z.infer<typeof signupSchema>) {
    try {
      setIsSubmitting(true);
      const { confirmPassword, ...userData } = values;
      await signUp(values.email, values.password, userData);
      toast({
        title: t('auth.signupSuccess'),
        description: t('auth.checkEmail'),
      });
      setActiveTab("login");
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (user && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-kisan-cream-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-kisan-green-700">{t('appName')}</h1>
          <p className="mt-2 text-kisan-charcoal-600">{t('auth.welcomeMessage')}</p>
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="p-6">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.password')}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-kisan-green-600 hover:bg-kisan-green-700" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t('auth.login')}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.fullName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('auth.fullNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.password')}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="user_type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{t('auth.userType')}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="farmer" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t('auth.farmer')}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="expert" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t('auth.expert')}
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-kisan-green-600 hover:bg-kisan-green-700" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t('auth.signup')}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
