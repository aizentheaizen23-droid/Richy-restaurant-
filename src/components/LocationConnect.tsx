/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, Compass, Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { CONTACT_INFO, REVIEWS } from '../data';

interface LocationConnectProps {
  isAr: boolean;
}

export default function LocationConnect({ isAr }: LocationConnectProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`;

  return (
    <section id="location" className="py-24 bg-gold-50 relative">
      <div className="absolute inset-0 pattern-arabesque pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-charcoal-900 leading-tight">
            {isAr ? 'تواصل معنا وزُرنا في قلب إربد' : 'Find Us on Abu Rashid Street'}
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base">
            {isAr
              ? 'موقع حيوي مريح، جلسات هادئة من الصباح الباكر وحتى أطراف الليل الجميل لتستمتع بأجمل الجلسات.'
              : 'Our doors remain open wide everyday, bringing you premium hospitality right in Irbid’s lively cultural quarters.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Card 1: Contact Coordinates & Hours (Span 5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gold-200/50 space-y-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 border-b border-gold-250/20 pb-4">
                {isAr ? 'ساعات المقهى والاتصال' : 'Hours & Coordinates'}
              </h3>

              {/* Coordinates block */}
              <div className="space-y-4 text-sm">
                
                {/* Location */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div className={`${isAr ? 'mr-3' : 'ml-3'}`}>
                    <h4 className="font-semibold text-charcoal-950">
                      {isAr ? 'العنوان الجغرافي' : 'Physical Address'}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Operations Hours */}
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div className={`${isAr ? 'mr-3' : 'ml-3'}`}>
                    <h4 className="font-semibold text-charcoal-950">
                      {isAr ? 'ساعات الدوام اليومية' : 'Service Schedule'}
                    </h4>
                    <p className="text-gray-650 font-mono text-xs mt-1">
                      {isAr ? 'يومياً: من 8:00 صباحاً وحتى 2:00 بعد منتصف الليل' : CONTACT_INFO.workingHours}
                    </p>
                  </div>
                </div>

                {/* Phone dialer */}
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div className={`${isAr ? 'mr-3' : 'ml-3'}`}>
                    <h4 className="font-semibold text-charcoal-950">
                      {isAr ? 'رقم الهاتف المباشر الكافيه' : 'Direct Phone Line'}
                    </h4>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-gold-700 hover:underline font-mono text-xs mt-1 block"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div className={`${isAr ? 'mr-3' : 'ml-3'}`}>
                    <h4 className="font-semibold text-charcoal-950">
                      {isAr ? 'البريد الإلكتروني للإدارة' : 'Email Enquiries'}
                    </h4>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-gold-700 hover:underline text-xs mt-1 block"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Action Guides */}
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                >
                  <Compass className="w-4 h-4 mr-1 inline" />
                  <span>{isAr ? 'افتح الاتجاهات في خرائط Google' : 'Open Directions in Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Simulated aesthetic Map layout */}
            <div className="bg-charcoal-800 rounded-2xl overflow-hidden border border-gold-400/20 aspect-[16/9] relative group shadow-lg">
              <div className="absolute inset-0 pattern-arabesque pointer-events-none opacity-25" />
              
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 divide-x divide-y divide-gold-500/10 pointer-events-none">
                <div className="col-span-full row-span-full" />
              </div>

              {/* Drawn Simulated Map Elements */}
              <div className="absolute top-1/2 left-1/4 w-32 h-6 bg-charcoal-950/80 rounded-full border border-gold-400/15 flex items-center justify-center text-[9px] font-bold text-gray-400 rotate-12">
                Yarmouk District
              </div>
              
              {/* Main Abu Rashid Road indicator */}
              <div className="absolute top-1/3 left-0 w-full h-8 bg-charcoal-900 border-y border-gold-400/30 flex items-center justify-center text-[10px] uppercase font-mono tracking-widest text-gold-300 transform -rotate-6">
                Abu Rashid St. (شارع أبو راشد)
              </div>

              {/* Marker Pulsing Anchor of Richy Coffee */}
              <div className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-650 border-2 border-white items-center justify-center shadow-lg">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </span>
                </span>
                
                <div className="mt-1 bg-charcoal-950 border border-gold-400/30 text-[10px] font-bold py-1 px-2.5 rounded shadow-xl text-gold-200 whitespace-nowrap">
                  Richy Café & Restaurant 📍
                </div>
              </div>
              
            </div>
          </div>

          {/* Card 2: Reviews Panel (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gold-200/50 space-y-6 h-full">
              <div className="flex justify-between items-center border-b border-gold-250/20 pb-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-charcoal-900">
                    {isAr ? 'آراء وروايات جيران المقهى' : 'Authentic Guest Reviews'}
                  </h3>
                  <p className="text-xs text-gray-450 mt-0.5">
                    {isAr ? 'مقتبسة من مراجعات Google لشارع أبو راشد' : 'Verified reviews of diners around Irbid'}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                    <span className="text-xl font-bold font-display text-charcoal-950 font-black">4.4</span>
                  </div>
                  <span className="text-[10px] text-gray-400">~80 Google reviews</span>
                </div>
              </div>

              {/* Map Reviews List */}
              <div className="space-y-6">
                {REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-xl border border-gold-200/50 bg-[#F2EDE4]/30 hover:bg-[#F2EDE4]/50 transition duration-300 rounded-tr-[30px] border-l-4 border-l-gold-500"
                    style={{ direction: isAr ? 'rtl' : 'ltr' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover mr-3 border border-gold-200 shrink-0"
                          style={{ marginRight: isAr ? '0' : '0.75rem', marginLeft: isAr ? '0.75rem' : '0' }}
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-charcoal-950 leading-none">
                            {rev.author}
                          </h4>
                          <span className="text-[10px] text-gray-400 mt-1 block font-mono">
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      {/* Score stars */}
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-3.5 h-3.5 text-gold-500 ${
                              index < Math.floor(rev.rating) ? 'fill-gold-500' : 'opacity-30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-650 leading-relaxed italic">
                      " {isAr && rev.textAr ? rev.textAr : rev.text} "
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-gold-100/50 flex space-x-3 text-[10px] text-gray-450">
                      <button className="flex items-center space-x-1 hover:text-gold-700 cursor-pointer">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful (1)</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-gold-700 cursor-pointer">
                        <MessageSquare className="w-3 h-3" />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
