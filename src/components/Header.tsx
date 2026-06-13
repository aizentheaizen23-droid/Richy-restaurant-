/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X, ShoppingBag, Globe, PhoneCall } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isAr: boolean;
  setIsAr: (val: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ isAr, setIsAr, cartCount, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isAr ? 'الرئيسية' : 'Home', href: '#home' },
    { label: isAr ? 'من نحن' : 'About', href: '#about' },
    { label: isAr ? 'قائمة الطعام' : 'Menu', href: '#menu' },
    { label: isAr ? 'مستشار المأكولات' : 'Chef’s Advisor', href: '#advisor' },
    { label: isAr ? 'الحجز الطاولة' : 'Book Table', href: '#reservation' },
    { label: isAr ? 'الموقع' : 'Location', href: '#location' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gold-50/95 backdrop-blur-md shadow-md border-b border-charcoal-900/10 py-3 text-charcoal-900 animate-in slide-in-from-top-1 duration-200'
          : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            className="flex flex-col select-none"
            onClick={(e) => handleLinkClick(e, '#home')}
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase font-display flex items-baseline">
              <span className={isScrolled ? 'text-charcoal-900' : 'text-white'}>RICHY</span>
              <span className={`text-sm sm:text-base italic font-light tracking-normal underline decoration-1 underline-offset-4 ${isAr ? 'mr-2' : 'ml-2'} ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`}>
                {isAr ? 'رستو ومقهى' : 'Resto & Cafe'}
              </span>
            </h1>
            <span className={`text-[9px] tracking-[0.3em] uppercase mt-0.5 ${isScrolled ? 'text-charcoal-900/50' : 'text-white/60'}`}>
              {isAr ? 'إربد، الأردن' : 'Irbid, Jordan'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-250 relative group py-1 ${
                  isScrolled ? 'text-charcoal-900 hover:text-gold-600' : 'text-gold-100 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isScrolled ? 'bg-gold-600' : 'bg-gold-450'} transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
          </nav>

          {/* Actions Column */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => setIsAr(!isAr)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer duration-200 ${
                isScrolled
                  ? 'bg-gold-500/5 hover:bg-gold-500/15 text-gold-700 border-gold-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-gold-200 border-white/20'
              }`}
              title={isAr ? 'Change to English' : 'تغيير إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {/* Quick Call */}
            <a
              href="tel:+962791234567"
              className={`hidden lg:flex items-center space-x-1 p-2 rounded-full transition-all ${
                isScrolled
                  ? 'bg-gold-500/10 text-gold-700 hover:bg-gold-500/20'
                  : 'bg-white/10 text-gold-300 hover:bg-white/20'
              }`}
              title="Call Cafe"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Shopping Cart Button */}
            <button
              id="header_cart_btn"
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-full transition-all cursor-pointer duration-200 border ${
                isScrolled
                  ? 'bg-gold-500/10 hover:bg-gold-500/20 text-gold-700 border-gold-500/20'
                  : 'bg-white/10 hover:bg-white/25 text-gold-200 border-white/15'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md md:hidden focus:outline-none ${
                isScrolled ? 'hover:bg-gold-500/10 text-charcoal-900' : 'hover:bg-white/10 text-gold-300'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-charcoal-950/95 border-b border-gold-500/20 p-4 absolute top-full left-0 right-0 shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 py-3" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-gold-100 hover:text-gold-400 hover:bg-gold-500/5 py-2 px-3 rounded-lg transition-colors border-l-2 border-transparent hover:border-gold-400"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gold-500/20 flex justify-between items-center px-3" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <span className="text-xs text-gold-300">
                {isAr ? 'شارع أبو راشد، إربد' : 'Abu Rashid St, Irbid'}
              </span>
              <a
                href="tel:+962791234567"
                className="text-xs font-semibold text-gold-400 hover:underline flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5 inline mr-1" />
                <span>+962 7 9123 4567</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
