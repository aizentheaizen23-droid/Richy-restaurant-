/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChefHat, Flame, HelpCircle, Utensils, RotateCcw, Plus, Check } from 'lucide-react';
import { DISHES } from '../data';
import { Dish, CartItem } from '../types';

interface DiningAssistantProps {
  isAr: boolean;
  onAddToCart: (dish: Dish) => void;
}

export default function DiningAssistant({ isAr, onAddToCart }: DiningAssistantProps) {
  const [mood, setMood] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleReset = () => {
    setMood('');
    setDiet('');
    setPartySize('');
  };

  // Algorithmic matching to filter local DISHES based on selections
  const getMatches = (): Dish[] => {
    if (!mood && !diet && !partySize) return [];

    return DISHES.filter((dish) => {
      // Mood matching
      if (mood === 'feast' && !dish.tags.includes('Sharing Platter') && !dish.tags.includes('National Dish') && dish.price < 5.0) {
        return false;
      }
      if (mood === 'sweet' && dish.category !== 'Desserts & Sweets' && dish.id !== 'dessert-kunafeh') {
        return false;
      }
      if (mood === 'light' && dish.category !== 'Fresh Salads' && !dish.isVegetarian) {
        return false;
      }
      if (mood === 'midday' && (dish.category === 'Desserts & Sweets' || dish.category === 'Traditional Hot Drinks')) {
        return false;
      }

      // Diet matching
      if (diet === 'vegetarian' && !dish.isVegetarian) {
        return false;
      }
      if (diet === 'spicy' && !dish.isSpicy) {
        return false;
      }

      // Party size matching
      if (partySize === 'large' && !dish.tags.includes('Sharing Platter') && !dish.tags.includes('Sharing Hot Pot') && dish.price < 4.0) {
        return false;
      }
      if (partySize === 'single' && dish.tags.includes('Sharing Platter')) {
        return false;
      }

      return true;
    }).slice(0, 3); // Return top 3 matches maximum for elegant cards
  };

  const matches = getMatches();

  const triggerAddToCart = (dish: Dish) => {
    onAddToCart(dish);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <section id="advisor" className="py-20 bg-charcoal-900 text-white relative">
      <div className="absolute inset-0 bg-gold-900/5 mix-blend-color-dodge opacity-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-400/10 p-2 px-4 rounded-full border border-gold-400/20 text-gold-400 mb-4">
            <ChefHat className="w-5 h-5 text-gold-400" />
            <span className="text-xs font-semibold tracking-wider uppercase font-display">
              {isAr ? 'مستشار المأكولات الذكي للشيَف ريتشي' : 'Smart Culinary Matchmaker'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {isAr ? 'ماذا تفضل أن تأكل اليوم؟' : 'Confused What to Eat Today?'}
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            {isAr
              ? 'أجب عن ٣ أسئلة سريعة وسيقوم الشيَف باختيار الوجبات المشرقية المثالية لك ولقروبك!'
              : 'Answer 3 simple questions and our virtual Chef will select the perfect Middle Eastern pairings!'}
          </p>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="bg-charcoal-800/80 border border-gold-400/20 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            
            {/* Question 1: Mood */}
            <div>
              <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                1. {isAr ? 'نوع الجِلسة والشهية؟' : 'Your Appetite / Mood?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'feast', label: isAr ? 'وليمة ومشاوي للمشاركة' : 'Grand Social Feast' },
                  { id: 'light', label: isAr ? 'وجبة خفيفة وصحية (سلطات ومقبلات)' : 'Light & Veggie Garden' },
                  { id: 'sweet', label: isAr ? 'حلويات شرقية حارة وقهوة' : 'Sweets & Hot Cardamom' },
                  { id: 'midday', label: isAr ? 'وجبة مشاوي مشكلة وسريعة' : 'Hearty Main Dishes' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setMood(option.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all border duration-200 cursor-pointer ${
                      mood === option.id
                        ? 'bg-gold-500 border-gold-400 text-charcoal-900 font-medium font-semibold'
                        : 'bg-charcoal-900/40 border-gold-500/10 text-gray-200 hover:border-gold-500/40 hover:bg-charcoal-900'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Diet preferences */}
            <div>
              <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                2. {isAr ? 'تفضيلات الطعام؟' : 'Dietary Accents?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'any', label: isAr ? 'كل المأكولات (لحوم، خضار، دجاج)' : 'No Restrictions (Meat & Poultry)' },
                  { id: 'vegetarian', label: isAr ? 'نباتي فقط (خالٍ من اللحوم)' : 'Vegetarian Specialties' },
                  { id: 'spicy', label: isAr ? 'عشاق النكهة الحارة والشطة' : 'Touch of Arabic Spicy' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDiet(option.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all border duration-200 cursor-pointer ${
                      diet === option.id
                        ? 'bg-gold-500 border-gold-400 text-charcoal-900 font-medium font-semibold'
                        : 'bg-charcoal-900/40 border-gold-500/10 text-gray-200 hover:border-gold-500/40 hover:bg-charcoal-900'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Party size */}
            <div>
              <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                3. {isAr ? 'عدد الساهرين الطاعمين؟' : 'How Many People?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'single', label: isAr ? 'عشاء فردي أو ثنائي' : 'Cozy Dining (1 - 2 Persons)' },
                  { id: 'medium', label: isAr ? 'قروب ودّي ( ٣ - ٥ أشخاص)' : 'Friends Gathering (3 - 5 Persons)' },
                  { id: 'large', label: isAr ? 'عائلة أو جمعة كبيرة (٦+)' : 'Grand Arabic Family (6+ Persons)' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPartySize(option.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all border duration-200 cursor-pointer ${
                      partySize === option.id
                        ? 'bg-gold-500 border-gold-400 text-charcoal-900 font-medium font-semibold'
                        : 'bg-charcoal-900/40 border-gold-500/10 text-gray-200 hover:border-gold-500/40 hover:bg-charcoal-900'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Reset button action */}
          {(mood || diet || partySize) && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 px-4 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-gray-400 text-xs border border-gray-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة تعيين المرشحات' : 'Clear Recommendations'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Matches Area */}
        {(mood || diet || partySize) && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <h3 className="text-lg font-display font-medium text-gold-300 text-center mb-6">
              {isAr ? '✨ اختيارات ورشيديات الشيَف ريتشي المطابقة:' : '✨ Recommended Platters Matches for You:'}
            </h3>

            {matches.length === 0 ? (
              <div className="text-center p-8 bg-charcoal-800/40 border border-dashed border-gold-550/20 rounded-xl max-w-sm mx-auto">
                <HelpCircle className="w-8 h-8 text-gold-400 mx-auto mb-2 opacity-60" />
                <p className="text-sm text-gray-300">
                  {isAr
                    ? 'لم نجد طبق مطابق بدقة لهذه التفضيلات الصارمة. جرّب تعيين مرشحات أخرى من فضلك!'
                    : 'No dishes matched this combination perfectly. Try changing standard filters!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-charcoal-950/60 border border-gold-500/15 rounded-xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 hover:shadow-xl group"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                      />
                      {dish.isSpicy && (
                        <span className="absolute top-2 right-2 bg-red-600/90 text-white p-1 px-2.5 rounded text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1">
                          <Flame className="w-3.5 h-3.5 mr-0.5 fill-white text-white" />
                          <span>{isAr ? 'سبايسي' : 'Spicy'}</span>
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col justify-between h-[180px]" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-base text-gray-100 group-hover:text-gold-300 transition-colors">
                            {isAr ? dish.nameAr : dish.name}
                          </h4>
                          <span className="text-gold-300 font-mono text-sm font-bold ml-2">
                            {dish.price.toFixed(2)} JOD
                          </span>
                        </div>
                        <p className="text-xs text-gray-450 mt-1.5 line-clamp-2 leading-relaxed">
                          {isAr ? dish.descriptionAr : dish.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gold-500/10">
                        <span className="text-[10px] text-gray-400 font-mono font-medium">
                          🕒 {isAr ? `تجهيز: ${dish.prepareTime}` : `Prep: ${dish.prepareTime}`}
                        </span>

                        <button
                          onClick={() => triggerAddToCart(dish)}
                          className={`flex items-center space-x-1 p-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                            addedItems[dish.id]
                              ? 'bg-emerald-accent/20 text-white border border-emerald-500'
                              : 'bg-gold-500 hover:bg-gold-450 text-charcoal-900 border border-gold-400/20'
                          }`}
                        >
                          {addedItems[dish.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isAr ? 'إضافة للطلب' : 'Add to Order'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
