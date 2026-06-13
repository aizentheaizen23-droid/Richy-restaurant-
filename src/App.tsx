/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowDown, LogOut, Check, Phone, Send, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import AboutAmbiance from './components/AboutAmbiance';
import DiningAssistant from './components/DiningAssistant';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import LocationConnect from './components/LocationConnect';
import CartSidebar from './components/CartSidebar';
import { HERO_RESOURCES, CONTACT_INFO } from './data';
import { Dish, CartItem } from './types';

export default function App() {
  const [isAr, setIsAr] = useState<boolean>(true); // Default to Arabic for authenticity, user can toggle to English!
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from client-side localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('richy_cart_cache');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
  }, []);

  // Save cart to localStorage on modification
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('richy_cart_cache', JSON.stringify(items));
  };

  const handleAddToCart = (dish: Dish) => {
    const existing = cartItems.find((item) => item.dish.id === dish.id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        dish,
        quantity: 1,
        selectedSpiciness: 'Regular',
        specialInstructions: '',
      };
      saveCart([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (dishId: string, qty: number) => {
    const updated = cartItems.map((item) =>
      item.dish.id === dishId ? { ...item, quantity: qty } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (dishId: string) => {
    const updated = cartItems.filter((item) => item.dish.id !== dishId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollDownToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#menu');
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gold-50/20 text-charcoal-900 overflow-x-hidden selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* 1. STICKY GLASSMORPHIC NAVIGATION HEADER */}
      <Header
        isAr={isAr}
        setIsAr={setIsAr}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. MAJESTIC CALL-TO-ACTION HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal-950"
      >
        {/* Dark dimming layer & background image placement */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_RESOURCES.heroBanner}
            alt="Richy Restaurant and Cafe Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-transparent to-charcoal-950" />
        </div>

        {/* Hero typography content block */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 p-2 px-4 rounded-full border border-gold-400/25 text-gold-300">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-semibold tracking-widest uppercase font-mono">
              {isAr ? 'شارع أبو راشد، إربد، الأردن' : 'Abu Rashid Street, Irbid, Jordan'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-none uppercase drop-shadow-xl">
            {isAr ? (
              <>
                مطعم ومقهى <span className="text-gold-400">ريتشي</span>
              </>
            ) : (
              <>
                Richy <span className="text-gold-400">Cafe & Resto</span>
              </>
            )}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-250 leading-relaxed drop-shadow-md">
            {isAr
              ? 'تذوق أصالة المطبخ العربي والمشاوي الفاخرة ع الفحم والحلويات المشرقية الدافئة في جلسة مميزة تفتح أبوابها يومياً حتى الساعة الثانية صباحاً.'
              : 'Immerse in authentic Levantine sharing platters, succulent charcoal grills, and warm Arabic desserts on Abu Rashid Street. Open daily until 2:00 AM.'}
          </p>

          {/* Interactive Hero buttons */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#menu"
              onClick={scrollDownToMenu}
              className="w-full sm:w-auto p-4 px-8 bg-gold-500 hover:bg-gold-450 text-charcoal-900 font-bold rounded-xl transition duration-300 cursor-pointer text-sm shadow-lg hover:shadow-gold-500/20 shadow-black/40 text-center font-display uppercase tracking-wider"
            >
              {isAr ? 'اطلب طعامك الآن سفري' : 'Order Quick Delivery'}
            </a>

            <a
              href="#reservation"
              className="w-full sm:w-auto p-4 px-8 bg-charcoal-900/60 hover:bg-charcoal-900 text-gold-300 hover:text-white font-semibold rounded-xl border border-gold-500/30 transition duration-300 cursor-pointer text-sm backdrop-blur-sm text-center font-display"
            >
              {isAr ? 'احجز طاولة سهرة' : 'Reserve Social Table'}
            </a>
          </div>

          <p className="text-[11px] text-gold-300/70 font-mono">
            ⭐ {isAr ? 'حاصل على تقييم 4.4 نجوم من زوارنا' : 'Rating of 4.4 stars in local directories'}
          </p>
        </div>

        {/* Scroll helper anchor */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <a
            href="#about"
            className="text-gold-400 hover:text-white flex flex-col items-center text-xs font-mono select-none"
          >
            <span>{isAr ? 'اكتشف المزيد' : 'Scroll to explore'}</span>
            <ArrowDown className="w-4 h-4 mt-1" />
          </a>
        </div>
      </section>

      {/* 3. HISTORIC BIO & SOCIAL AMBIANCE */}
      <AboutAmbiance isAr={isAr} />

      {/* 4. SMART USER INTELLIGENT CULINARY MATCHMAKER */}
      <DiningAssistant isAr={isAr} onAddToCart={handleAddToCart} />

      {/* 5. LIVE SEARCH CATEGORIZED MENU & CART HOOKS */}
      <MenuSection isAr={isAr} onAddToCart={handleAddToCart} />

      {/* 6. BOOKING TICKET & RESERVATION COORDINATION */}
      <ReservationSection isAr={isAr} />

      {/* 7. GEOGRAPHIC LOCATION & GUEST REVIEWS */}
      <LocationConnect isAr={isAr} />

      {/* 8. LUXURIOUS ARABIC RESTAURANT FOOTER */}
      <footer className="bg-charcoal-950 text-gray-300 pt-16 pb-12 relative overflow-hidden border-t border-gold-550/25">
        <div className="absolute inset-0 pattern-arabesque pointer-events-none opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gold-500/10 pb-12 mb-12">
            
            {/* Logo description */}
            <div className="space-y-4">
              <span className="font-display font-black text-2xl tracking-widest text-gold-400 block">
                RICHY CAFE
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                {isAr
                  ? 'ملتقى ريادي مميز يجمع كرم الضيافة والجميد السائل ونسمات المساء العطرة في شارع أبو راشد، إربد.'
                  : 'A prominent Levantine hub uniting Middle Eastern cuisine, generous shared menus, and aromatic coffee vibes on Abu Rashid Street, Irbid.'}
              </p>
              <p className="text-[10px] text-gray-500 font-mono">
                Rating: 4.4 ★ (82 Verified reviews)
              </p>
            </div>

            {/* Quick Links Map */}
            <div className="space-y-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <h4 className="font-display font-bold text-sm text-gold-300 uppercase tracking-widest">
                {isAr ? 'زوايا الموقع' : 'Navigation'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-gold-400 transition-colors">{isAr ? 'تراثنا وسهراتنا' : 'Our Story'}</a></li>
                <li><a href="#menu" className="hover:text-gold-400 transition-colors">{isAr ? 'ركن المأكولات والمشروبات' : 'Culinary Menu'}</a></li>
                <li><a href="#advisor" className="hover:text-gold-400 transition-colors">{isAr ? 'مرشح الأطباق الذكي' : 'Food Matchmaker'}</a></li>
                <li><a href="#reservation" className="hover:text-gold-400 transition-colors">{isAr ? 'تأكيد حجز طاولة' : 'Table Booking'}</a></li>
              </ul>
            </div>

            {/* Late hour schedules */}
            <div className="space-y-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <h4 className="font-display font-bold text-sm text-gold-300 uppercase tracking-widest">
                {isAr ? 'طاعة لقروبك الساهر' : 'Late Service'}
              </h4>
              <p className="text-xs leading-relaxed text-gray-400">
                {isAr
                  ? 'نهيئ لكم صالات مكيفة دافئة ومقاعد خارجية مطلة تناسب السهر والمذاكرة والنقاشات حتى الساعة 2:00 صباحاً.'
                  : 'Our dining terraces are fully conditioned. Enjoy your late chats, studying, or soccer watching nights until 2:00 AM daily.'}
              </p>
            </div>

            {/* Jordan Direct Contacts stamp */}
            <div className="space-y-4 text-xs" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <h4 className="font-display font-bold text-sm text-gold-300 uppercase tracking-widest">
                {isAr ? 'قنوات التواصل' : 'Direct Channels'}
              </h4>
              <p className="text-gray-400">📍 {CONTACT_INFO.address}</p>
              <p className="font-mono text-gold-400 hover:underline">
                <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>
              </p>
              <p className="text-gray-400">{CONTACT_INFO.email}</p>
            </div>

          </div>

          {/* Legal copyrights */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 text-center gap-4 border-t border-gold-550/10 pt-4">
            <p>
              &copy; {new Date().getFullYear()} Richy Restaurant & Cafe. All Rights Reserved.
            </p>
            <p className="font-semibold text-gold-400/80">
              {isAr
                ? 'موقع مصمم لمطعم ومقهى ريتشي بشارع أبو راشد، إربد'
                : 'Designed for Richy Restaurant & Cafe, Irbid, Jordan'}
            </p>
          </div>
        </div>
      </footer>

      {/* 9. CART SLIDEOUT OVERLAY WITH CHECKOUT FLOW */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        isAr={isAr}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
