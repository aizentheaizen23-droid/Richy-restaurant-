/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Leaf, Sparkles, Clock, Check, Plus } from 'lucide-react';
import { DISHES } from '../data';
import { Dish, Category } from '../types';

interface MenuSectionProps {
  isAr: boolean;
  onAddToCart: (dish: Dish) => void;
}

export default function MenuSection({ isAr, onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories: (Category | 'All')[] = [
    'All',
    'Platters & Mains',
    'Grills',
    'Fresh Salads',
    'Appetizers & Sides',
    'Desserts & Sweets',
    'Traditional Hot Drinks',
    'Chilled Beverages',
  ];

  const getLocalizedCategory = (cat: Category | 'All'): string => {
    if (!isAr) return cat;
    switch (cat) {
      case 'All': return 'الكل';
      case 'Platters & Mains': return 'أطباق رئيسية ومنسف';
      case 'Grills': return 'مشاوي ع الفحم';
      case 'Fresh Salads': return 'سلطات طازجة';
      case 'Appetizers & Sides': return 'مقبلات وجوانب المائدة';
      case 'Desserts & Sweets': return 'حلويات شرقية';
      case 'Traditional Hot Drinks': return 'مشروبات ساخنة ودلّة';
      case 'Chilled Beverages': return 'مشروبات غازية وباردة';
      default: return cat;
    }
  };

  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    
    const lowercaseSearch = searchQuery.toLowerCase();
    const matchesSearch =
      dish.name.toLowerCase().includes(lowercaseSearch) ||
      dish.nameAr.includes(lowercaseSearch) ||
      dish.description.toLowerCase().includes(lowercaseSearch) ||
      dish.descriptionAr.includes(lowercaseSearch);

    const matchesVegetarian = !filterVegetarian || dish.isVegetarian;
    const matchesSpicy = !filterSpicy || dish.isSpicy;

    return matchesCategory && matchesSearch && matchesVegetarian && matchesSpicy;
  });

  const handleAddClick = (dish: Dish) => {
    onAddToCart(dish);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-gold-50 relative">
      <div className="absolute inset-0 pattern-arabesque pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-400/15 p-2 px-4 rounded-full border border-gold-400/25 text-gold-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase font-display">
              {isAr ? 'بلدي طازج ومطهي بشغف' : 'Fresh & Slowly Roasted Daily'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-charcoal-900 leading-tight">
            {isAr ? 'قائمة المأكولات والمشروبات' : 'Explore Culinary & Cafe Menu'}
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base">
            {isAr
              ? 'تذوق ألذ المأكولات العربية التقليدية؛ من المنسف واللحوم والحلويات في شارع أبو راشد بإربد '
              : 'Discover rich Levantine heritage. Hand-crafted hot meals, refreshing authentic garden salads, and premium late-night brews.'}
          </p>
        </div>

        {/* Live Search and Quick Dietary Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gold-200/50 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن منسف، كباب، حمص، كنافة... ' : 'Search culinary items (e.g. Mansaf, Salad, Kunafeh)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-200/50 bg-gold-50/20 text-sm focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500 text-charcoal-900 font-medium"
              style={{ direction: isAr ? 'rtl' : 'ltr', paddingRight: isAr ? '2.5rem' : '1rem', paddingLeft: isAr ? '1rem' : '2.5rem' }}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-end" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {isAr ? 'تصفية سريعة:' : 'Quick Filters:'}
            </span>
            
            {/* Vegetarian Toggle */}
            <button
              onClick={() => setFilterVegetarian(!filterVegetarian)}
              className={`flex items-center space-x-1.5 p-2 px-4 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
                filterVegetarian
                  ? 'bg-emerald-accent/15 border-emerald-580 text-emerald-accent font-semibold'
                  : 'bg-white border-gold-200/50 text-gray-600 hover:border-gold-300'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>{isAr ? 'نباتي فقط' : 'Vegetarian'}</span>
            </button>

            {/* Spicy Toggle */}
            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`flex items-center space-x-1.5 p-2 px-4 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
                filterSpicy
                  ? 'bg-red-50 border-red-200 text-red-650 font-semibold'
                  : 'bg-white border-gold-200/50 text-gray-600 hover:border-gold-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isAr ? 'حار وسبايسي' : 'Spicy'}</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Bar (Scrollable) */}
        <div className="scrollbar-hidden overflow-x-auto flex space-x-2 pb-4 mb-10 overflow-y-hidden" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-charcoal-900 border-charcoal-800 text-gold-300 shadow-md font-bold scale-[1.02]'
                  : 'bg-white border-gold-200/50 text-gray-650 hover:bg-gold-100/50 hover:border-gold-300'
              }`}
            >
              {getLocalizedCategory(cat)}
            </button>
          ))}
        </div>

        {/* Dishes Grid with Animations */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-24 bg-white/70 border border-gold-200/30 rounded-2xl max-w-md mx-auto relative overflow-hidden">
            <h3 className="text-lg font-display font-medium text-gray-600">
              {isAr ? 'عذراً، لم نجد أي مأكولات مطابقة' : 'No Items Match Your Search'}
            </h3>
            <p className="text-xs text-gray-450 mt-1 max-w-xs mx-auto">
              {isAr
                ? 'جرّب كتابة كلمة أخرى أو إعادة تعيين عوامل التصفية بالأعلى!'
                : 'Try adjusting your text queries or clearing some search filters.'}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gold-200/30 hover:border-gold-400/40 group flex flex-col justify-between"
                  id={`dish-card-${dish.id}`}
                >
                  {/* Photo area */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Floating pill tags */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
                      {dish.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-charcoal-900/80 backdrop-blur-md text-gold-350 text-[9px] font-mono font-bold tracking-wider uppercase p-1.5 px-2.5 rounded-md border border-gold-500/20">
                          {isAr && tag === 'Best Seller' ? 'الأكثر مبيعاً' : isAr && tag === 'National Dish' ? 'وجبة وطنية' : isAr && tag === 'Sharing Platter' ? 'طبق مشاركة للمجموعات' : isAr && tag === 'Local Favorite' ? 'مفضل الزوار' : tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-3 right-3 flex space-x-1 z-10">
                      {dish.isVegetarian && (
                        <span className="bg-[#8B7355] text-white p-1.5 rounded-full shadow-md" title="Vegetarian">
                          <Leaf className="w-3.5 h-3.5 fill-white" />
                        </span>
                      )}
                      {dish.isSpicy && (
                        <span className="bg-amber-600 text-white p-1.5 rounded-full shadow-md" title="Spicy Arabic seasoning">
                          <Flame className="w-3.5 h-3.5 fill-white text-white" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2A2A2A] group-hover:text-gold-500 transition-colors">
                          {isAr ? dish.nameAr : dish.name}
                        </h3>
                        <span className="text-[#2A2A2A] font-serif text-xs sm:text-sm font-bold whitespace-nowrap bg-[#EAE4D9]/85 border border-[#2A2A2A]/10 px-2.5 py-1 rounded-lg">
                          {dish.price.toFixed(2)} JOD
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {isAr ? dish.descriptionAr : dish.description}
                      </p>
                    </div>

                    {/* Footer info: Prep Time and Quick Order Hook */}
                    <div className="flex justify-between items-center pt-4 border-t border-gold-200/50 mt-4">
                      <span className="text-[10px] text-gray-450 font-mono font-medium flex items-center">
                        <Clock className="w-3.5 h-3.5 text-gold-500 mr-1 shrink-0" />
                        <span className={isAr ? 'mr-1' : 'ml-1'}>{isAr ? `تجهيز: ${dish.prepareTime}` : `Prep: ${dish.prepareTime}`}</span>
                      </span>

                      <button
                        onClick={() => handleAddClick(dish)}
                        className={`flex items-center space-x-1 p-2 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                          addedItems[dish.id]
                            ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-500/20'
                            : 'bg-gold-500 hover:bg-gold-600 text-white shadow-md font-sans uppercase tracking-wider'
                        }`}
                      >
                        {addedItems[dish.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5 inline text-emerald-600" />
                            <span>{isAr ? 'تمت الإضافة' : 'Added to List'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 inline" />
                            <span>{isAr ? 'أضف للطلب' : 'Add to Order'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
