/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Coffee, Mail, CheckCircle2, Clock, Send, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { Reservation } from '../types';

interface ReservationSectionProps {
  isAr: boolean;
}

export default function ReservationSection({ isAr }: ReservationSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(4);
  const [area, setArea] = useState<'Terrace (Outdoors)' | 'Family Section (Cozy)' | 'Main Social Lounge' | 'Quiet Study Corner'>('Main Social Lounge');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState<Reservation | null>(null);

  const popularTimes = [
    { value: '12:00', label: isAr ? '12:00 م (الغداء)' : '12:00 PM (Lunch)' },
    { value: '14:30', label: isAr ? '2:30 م' : '2:30 PM' },
    { value: '17:00', label: isAr ? '5:00 م (المغيب)' : '5:00 PM (Sunset)' },
    { value: '19:30', label: isAr ? '7:30 م (العشاء)' : '7:30 PM (Dinner)' },
    { value: '21:00', label: isAr ? '9:00 م (سهرة)' : '9:10 PM (Prime Late)' },
    { value: '22:30', label: isAr ? '10:30 م' : '10:30 PM' },
    { value: '00:00', label: isAr ? '12:00 ص (سحور وسهرة متأخرة)' : '12:00 AM (Late Social)' },
    { value: '01:00', label: isAr ? '1:00 ص (ساعة ما قبل الإغلاق)' : '1:00 AM (Preround)' },
  ];

  const formatReservationText = () => {
    let text = `📅 *RICHY CAFE - NEW TABLE RESERVATION* 📅\n`;
    text += `------------------------------------------\n`;
    text += `👤 *Name:* ${fullName}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    text += `📧 *Email:* ${email || 'None'}\n`;
    text += `🗓️ *Date:* ${date}\n`;
    text += `⏰ *Time:* ${time}\n`;
    text += `👥 *Number of Guests:* ${guests} Pax\n`;
    text += `🪑 *Preferred Area:* ${area}\n`;
    if (occasion) text += `🎉 *Occasion:* ${occasion}\n`;
    if (notes) text += `📝 *Notes:* ${notes}\n`;
    text += `------------------------------------------\n`;
    text += `Kindly confirm if this table is available for our party. Thank you!`;

    return text;
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !date) {
      alert(isAr ? 'برجاء تعبئة البيانات المطلوبة (الاسم والاتصال والتاريخ) أوّلاً!' : 'Please complete the raw fields first.');
      return;
    }
    
    const message = formatReservationText();
    const url = `https://wa.me/${CONTACT_INFO.whatsappDirect}?text=${encodeURIComponent(message)}`;
    
    // Save locally
    const newBooking: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      phone,
      email,
      date,
      time,
      guests,
      areaPreference: area,
      specialOccasion: occasion,
      notes,
      createdAt: new Date().toISOString(),
    };
    
    setBookingConfirmed(newBooking);
    window.open(url, '_blank');
  };

  const handleEmailBooking = () => {
    if (!fullName || !phone || !date) {
      alert(isAr ? 'برجاء تعبئة البيانات المطلوبة أوّلاً!' : 'Please complete the raw fields first.');
      return;
    }
    
    const subject = `Richy Table Booking - ${fullName} (${date})`;
    const body = formatReservationText();
    const url = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Save locally
    const newBooking: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      phone,
      email,
      date,
      time,
      guests,
      areaPreference: area,
      specialOccasion: occasion,
      notes,
      createdAt: new Date().toISOString(),
    };
    
    setBookingConfirmed(newBooking);
    window.location.href = url;
  };

  const handleResetBooking = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setDate('');
    setTime('20:00');
    setGuests(4);
    setArea('Main Social Lounge');
    setOccasion('');
    setNotes('');
    setBookingConfirmed(null);
  };

  return (
    <section id="reservation" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pattern-arabesque pointer-events-none opacity-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-400/15 p-2 px-4 rounded-full border border-gold-400/25 text-gold-700 mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase font-display">
              {isAr ? 'حجز مباشر وفوري مجاني' : 'Instant & Free Table Booking'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-charcoal-900 leading-tight">
            {isAr ? 'احجز طاولتك وسهرتك معنا' : 'Reserve Your Premium Table'}
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base">
            {isAr
              ? 'تجنّب الانتظار الطويل في شارع أبو راشد! احجز موعد غدائك أو سهرتك حتى الساعة ٢ بعد منتصف الليل وسيتم تنسيق طلبك بدقة.'
              : 'Avoid queues along busy Abu Rashid Street! Book your family spots or late-night social sessions instantly.'}
          </p>
        </div>

        {/* Dynamic Booking Result Screen */}
        {bookingConfirmed ? (
          <div className="bg-gold-50 border border-gold-300 rounded-2xl p-8 shadow-xl text-center max-w-lg mx-auto animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-16 h-16 text-emerald-800 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
              {isAr ? 'تم إرسال طلب الحجز بنجاح!' : 'Reservation Request Transmitted!'}
            </h3>
            
            <p className="text-sm text-gray-650 mb-6 leading-relaxed">
              {isAr
                ? 'لقد قمنا بتوجيه تفاصيل حجزك إلى منسقي الصالة عبر قنوات الاتصال المحددة. إليك نسخة ملخصة من حجزك:'
                : 'We have dispatched your table booking details. Here is your summarized ticket ledger:'}
            </p>

            <div className="bg-white border border-gold-200 rounded-xl p-5 mb-6 text-left space-y-2.5" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-xs text-gray-450">{isAr ? 'الاسم بالكامل' : 'Diner Name'}:</span>
                <span className="text-xs font-bold text-charcoal-900">{bookingConfirmed.fullName}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-2">
                <div>
                  <span className="text-[10px] text-gray-450 block">{isAr ? 'التاريخ' : 'Date'}:</span>
                  <span className="text-xs font-semibold text-charcoal-900">{bookingConfirmed.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-450 block">{isAr ? 'الوقت المحدد' : 'Time Slot'}:</span>
                  <span className="text-xs font-semibold text-charcoal-900">{bookingConfirmed.time}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-2">
                <div>
                  <span className="text-[10px] text-gray-450 block">{isAr ? 'عدد الضيوف' : 'Guests Count'}:</span>
                  <span className="text-xs font-semibold text-charcoal-900">{bookingConfirmed.guests} {isAr ? 'أشخاص' : 'Pax'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-450 block">{isAr ? 'موقع الجلسة المفضل' : 'Dining Room'}:</span>
                  <span className="text-xs font-semibold text-gold-700">{bookingConfirmed.areaPreference}</span>
                </div>
              </div>
              {bookingConfirmed.specialOccasion && (
                <div className="text-xs pt-1">
                  <span className="text-gray-450">{isAr ? 'المناسبة السعيدة' : 'Occasion'}: </span>
                  <span className="font-semibold text-purple-600">{bookingConfirmed.specialOccasion}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleResetBooking}
                className="p-3 px-6 bg-charcoal-900 text-gold-300 hover:text-white rounded-xl text-sm font-semibold hover:bg-gold-700 transition cursor-pointer"
              >
                {isAr ? 'حجز طاولة أخرى' : 'Reserve Another Table'}
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form Wizard */
          <form
            onSubmit={handleWhatsAppBooking}
            className="bg-white border-l-4 border-l-gold-500 border border-gold-200/50 p-6 sm:p-10 rounded-2xl rounded-tr-[50px] shadow-xl space-y-6"
            style={{ direction: isAr ? 'rtl' : 'ltr' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'الاسم بالكامل *' : 'Diner Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'أدخل اسمك بالكامل' : 'e.g. Ahmad Al-Hamad'}
                  className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'رقم الهاتف للتواصل *' : 'Contact Phone *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isAr ? 'مثال: 0791234567' : 'e.g. +962 7 9xxx'}
                  className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'yourname@gmail.com' : 'e.g. you@example.com'}
                  className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              {/* Guests slider */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? `عدد الساهرين: ${guests} أشخاص` : `Guests Count: ${guests} Pax`}
                </label>
                <div className="flex items-center space-x-3 bg-gold-50/20 border border-gold-200 p-2.5 rounded-xl">
                  <Users className="w-5 h-5 text-gold-500 shrink-0" />
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <span className="font-mono font-bold text-sm text-charcoal-900 w-8 text-center">{guests}</span>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'تاريخ الحجز المفضل *' : 'Target Date *'}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gold-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-sm p-3 pl-10 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Time selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'توقيت الحجز (حتى 2 صباحاً)' : 'Time Slot (Late session ready)'}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gold-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-sm p-3 pl-10 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500 appearance-none cursor-pointer"
                  >
                    {popularTimes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prefered Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'موقع الجلسة المفضل' : 'Dining Area Preference'}
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value as any)}
                  className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500 cursor-pointer"
                >
                  <option value="Main Social Lounge">{isAr ? 'الصالة الرئيسية التفاعلية' : 'Main Social Lounge'}</option>
                  <option value="Terrace (Outdoors)">{isAr ? 'تراس الحديقة المفتوح (نسمات الهواء)' : 'Terrace (Outdoors Breeze)'}</option>
                  <option value="Family Section (Cozy)">{isAr ? 'القسم العائلي المستقل والمريح' : 'Family Section (Cozy)'}</option>
                  <option value="Quiet Study Corner">{isAr ? 'ركن الهدوء والقهوة الرايقة' : 'Quiet Study Corner'}</option>
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  {isAr ? 'مناسبة خاصة؟ (اختياري)' : 'Special Occasion? (Optional)'}
                </label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder={isAr ? 'مثال: عيد ميلاد، ذكرى زواج، تخرج' : 'e.g. Birthday, Anniversary, Reunion'}
                  className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                />
              </div>

            </div>

            {/* Note text area */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                {isAr ? 'ملاحظات وتفاصيل إضافية للشيَف' : 'Specific culinary requests / Extra Notes'}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'مثال: نفضل مقاعد بجانب الشباك، نريد كرسي أطفال إضافي، أو تفضيل اللحم مستوي جداً...' : 'e.g. Prefer window seats, require high-chairs, or request specific lamb roast density...'}
                className="w-full text-sm p-3 border border-gold-200 rounded-xl text-charcoal-900 bg-gold-50/10 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            {/* Dual Actions redirection */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <span className="text-[11px] text-gray-500">
                {isAr
                  ? '⚠️ حجزك مجاني بالكامل! سيتم فتح قناتك المفضلة لتأكيد الحجز الفوري مع مسؤول علاقات الضيوف.'
                  : '⚠️ Free reservations! We trigger a direct chat request with our client supervisor instantly.'}
              </span>

              <div className="flex space-x-2 w-full sm:w-auto">
                {/* Email reservation option */}
                <button
                  type="button"
                  onClick={handleEmailBooking}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 p-3 px-5 rounded-xl bg-gold-100 hover:bg-gold-200 text-[#2A2A2A] font-semibold text-xs border border-gold-300/30 transition duration-300 cursor-pointer"
                >
                  <Mail className="w-4 h-4 ml-1 inline text-gray-400" />
                  <span>{isAr ? 'إرسال إيميل' : 'Via Email'}</span>
                </button>

                {/* WhatsApp primary validation option */}
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 p-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs tracking-wider uppercase font-sans transition duration-300 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 mr-1 inline" />
                  <span>{isAr ? 'أكد الحجز عبر واتساب' : 'Confirm via WhatsApp'}</span>
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}
