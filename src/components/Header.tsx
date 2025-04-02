
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const { user, profile, signOut } = useAuth();

  // For small screen navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('contact'), href: '#contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  // Get initials from full name for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white/95 backdrop-blur-sm border-b border-kisan-green-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center gap-2 text-kisan-green-800">
          <div className="w-10 h-10 bg-kisan-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
            KB
          </div>
          <h1 className="text-xl md:text-2xl font-bold hidden sm:block">Kisan Bhasha Bandhu</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-kisan-charcoal-700 hover:text-kisan-green-700 font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitcher />
          
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                      <AvatarFallback className="bg-kisan-green-100 text-kisan-green-800">
                        {profile?.full_name ? getInitials(profile.full_name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    {profile?.full_name || user.email}
                    <p className="text-xs text-muted-foreground mt-1">
                      {profile?.user_type === 'farmer' ? t('auth.farmer') : t('auth.expert')}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('profile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Button variant="outline" className="font-medium" asChild>
                <Link to="/auth">{t('login')}</Link>
              </Button>
              <Button className="bg-kisan-green-700 hover:bg-kisan-green-800 text-white font-medium" asChild>
                <Link to="/auth?tab=signup">{t('signup')}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[70vw]">
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    className="text-kisan-charcoal-700 hover:text-kisan-green-700 font-medium text-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                
                {user ? (
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                        <AvatarFallback className="bg-kisan-green-100 text-kisan-green-800">
                          {profile?.full_name ? getInitials(profile.full_name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile?.full_name || user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {profile?.user_type === 'farmer' ? t('auth.farmer') : t('auth.expert')}
                        </p>
                      </div>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 py-2 text-kisan-charcoal-700">
                      <User className="h-4 w-4" />
                      <span>{t('profile')}</span>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full font-medium" 
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-4">
                    <Button variant="outline" className="w-full font-medium" asChild>
                      <Link to="/auth">{t('login')}</Link>
                    </Button>
                    <Button className="w-full bg-kisan-green-700 hover:bg-kisan-green-800 text-white font-medium" asChild>
                      <Link to="/auth">{t('signup')}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
