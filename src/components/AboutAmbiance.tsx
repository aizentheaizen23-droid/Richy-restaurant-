/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Clock, MapPin, Users, Heart } from 'lucide-react';
import { HERO_RESOURCES, CONTACT_INFO } from '../data';

interface AboutAmbianceProps {
  isAr: boolean;
}

export default function AboutAmbiance({ isAr }: AboutAmbianceProps) {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative floral watermark background */}
      <div className="absolute inset-0 pattern-arabesque pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isAr ? 'lg:direction-rtl' : ''}`}>
          
          {/* Image Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-200 aspect-[4/3] group">
              <img
                src={HERO_RESOURCES.socialDining}
                alt={isAr ? 'أجواء عائلية اجتماعية في ريتشي' : 'Social friendly dining environment at Richy'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <p className="text-gold-300 text-xs font-mono tracking-wider uppercase font-semibold">
                    {isAr ? 'شارع أبو راشد، إربد' : 'Abu Rashid St, Irbid'}
                  </p>
                  <h4 className="text-white font-display text-xl font-bold mt-1">
                    {isAr ? 'الكرم الأصيل وصحبة الأحباب' : 'Genuine Hospitality & Warm Companionship'}
                  </h4>
                </div>
              </div>
            </div>

            {/* Overlapping Quick Rating Badge */}
            <div className={`absolute -bottom-6 ${isAr ? '-left-6' : '-right-6'} bg-[#F2EDE4] p-6 rounded-tr-[60px] border-l-4 border-gold-500 text-[#2A2A2A] shadow-xl max-w-[220px] hidden sm:block`}>
              <p className="font-sans text-[10px] uppercase font-bold mb-2 tracking-wider opacity-60">
                {isAr ? 'تقييمات الضيوف' : 'Guest Reviews'}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-[#2A2A2A]">{CONTACT_INFO.rating}</span>
                <div>
                  <div className="flex text-amber-500 text-xs tracking-tighter">
                    ★★★★★
                  </div>
                  <span className="text-[10px] opacity-60 font-sans font-bold block">
                    {isAr ? `من ${CONTACT_INFO.reviewCount} تقييم` : `Across ${CONTACT_INFO.reviewCount}+ guides`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <div className="inline-flex items-center space-x-2 text-gold-500 font-semibold text-xs tracking-widest uppercase font-sans">
              <Heart className={`w-4 h-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
              <span>{isAr ? 'تراثنا وكرمنا الضيافي' : 'Our Legacy & Warm Welcomes'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-charcoal-900 leading-tight">
              {isAr ? (
                <>
                  نبض المأكولات العربية في <span className="italic font-light underline decoration-1 underline-offset-4 text-gold-500 block sm:inline">إربد الأبية</span>
                </>
              ) : (
                <>
                  The Heartbeat of Arabic Cuisine in <span className="italic font-light underline decoration-1 underline-offset-4 text-gold-500 block sm:inline">Irbid, Jordan</span>
                </>
              )}
            </h2>

            <p className="text-gray-650 leading-relaxed text-base sm:text-lg">
              {isAr ? (
                'يرحب مطعم ومقهى ريتشي برواد المشرق العربي في أرقى زوايا شارع أبو راشد العريق. نحن نفخر تقديم أشهى المأكولات العربية التقليدية والمشاوي المشكلة، وموائد المنسف الكركي الأصيل، بجانب السلطات الطازجة المحضرة بكل شغف يومياً. هنا ليس مجرد مطعم؛ بل مكان يلتقي فيه الأصحاب ليلاً ونسمات إربد تداعب القلوب حتى الساعة الثانية بعد منتصف الليل.'
              ) : (
                'Nestled along the prominent Abu Rashid Street, Richy Restaurant & Cafe stands as a cornerstone of authentic Middle Eastern dining in Irbid. We specialize in generous, social-sharing platters, juicy charcoal-grilled skewered meats, Karaki Jameed Mansaf, and organic fresh garden salads, served alongside rich Arabic mint teas and saffron coffees. Whether seeking a memorable sunset family gathering or a lively late-night conversation, our cozy dining rooms remain vibrantly open until 2:00 AM.'
              )}
            </p>

            {/* Micro Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-charcoal-800">
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-gold-100/50 border border-gold-200/40">
                <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">
                    {isAr ? 'سهرات ممتدة حتى 2:00 صباحاً' : 'Late-Night Sanctuary'}
                  </h4>
                  <p className="text-xs text-gray-550 mt-1">
                    {isAr ? 'مثالي للعشاء المتأخر وسهرات الأصدقاء الممتعة' : 'Open daily until 2:00 AM for coffees & grills.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-xl bg-gold-100/50 border border-gold-200/40">
                <Users className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">
                    {isAr ? 'جلسات عائلية واجتماعية' : 'Community & Shared Platters'}
                  </h4>
                  <p className="text-xs text-gray-550 mt-1">
                    {isAr ? 'مساحات واسعة مصممة للمجموعات والبهجة والمشاركة' : 'Generous platters crafted to foster gathering.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Location Anchor Button */}
            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center justify-center p-3.5 px-6 rounded-lg bg-charcoal-900 text-gold-300 hover:text-white font-medium hover:bg-gold-700 transition-all duration-300 border border-gold-500/20 cursor-pointer shadow-lg hover:shadow-xl font-display text-sm"
              >
                {isAr ? 'استكشف قائمة الطعام الآن' : 'Explore Interactive Menu'}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
