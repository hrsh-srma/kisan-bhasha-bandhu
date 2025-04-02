
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Profile() {
  const { user, profile, isLoading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    avatar_url: profile?.avatar_url || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t('profile.updateSuccess'),
        description: t('profile.profileUpdated'),
      });
    } catch (error: any) {
      toast({
        title: t('profile.updateError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-kisan-green-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-kisan-green-800 mb-6">
            {t('profile.title')}
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('profile.accountInfo')}</h2>
            <div className="space-y-4">
              <div>
                <Label>{t('auth.email')}</Label>
                <Input value={user.email} disabled className="bg-kisan-cream-50" />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.emailCannotChange')}
                </p>
              </div>
              
              <div>
                <Label>{t('profile.userType')}</Label>
                <Input 
                  value={profile?.user_type === 'farmer' ? t('auth.farmer') : t('auth.expert')} 
                  disabled 
                  className="bg-kisan-cream-50" 
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('profile.personalInfo')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="full_name">{t('auth.fullName')}</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder={t('auth.fullNamePlaceholder')}
                />
              </div>
              
              <div>
                <Label htmlFor="avatar_url">{t('profile.avatarUrl')}</Label>
                <Input
                  id="avatar_url"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  placeholder={t('profile.avatarUrlPlaceholder')}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.avatarUrlHint')}
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="bg-kisan-green-600 hover:bg-kisan-green-700"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('profile.updating')}
                  </>
                ) : (
                  t('profile.updateProfile')
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
