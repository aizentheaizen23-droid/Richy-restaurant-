/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Trash2, ShoppingBag, Send, Mail, ChevronRight, MapPin, Tablet } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';
import { CONTACT_INFO } from '../data';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAr: boolean;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  isAr,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  // Checkout Info Form Screen
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'DineIn' | 'Delivery'>('DineIn');
  const [tableOrAddress, setTableOrAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'Delivery' ? 1.50 : 0.0;
  const total = subtotal + deliveryFee;

  const formatOrderText = () => {
    const deliveryLabel = deliveryType === 'DineIn' ? 'Dine-In (داخل المطعم)' : 'Delivery (توصيل)';
    const tableAddrLabel = deliveryType === 'DineIn' ? 'Table/Note (الملاحظة/الطاولة)' : 'Delivery Address (العنوان)';

    let text = `✨ *RICHY RESTAURANT & CAFE - NEW ORDER* ✨\n`;
    text += `------------------------------------------\n`;
    text += `👤 *Customer Name / الاسم:* ${fullName}\n`;
    text += `📞 *Phone / الهاتف:* ${phone}\n`;
    text += `🚚 *Service Type / نوع الخدمة:* ${deliveryLabel}\n`;
    text += `📍 *${tableAddrLabel}:* ${tableOrAddress || 'Self-service'}\n`;
    text += `------------------------------------------\n\n`;
    text += `📝 *ITEMS ORDERED / المأكولات والمشروبات:* \n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.dish.name}* (x${item.quantity}) - ${(item.dish.price * item.quantity).toFixed(2)} JOD\n`;
      if (item.selectedSpiciness) {
        text += `   ↳ *Spice level:* ${item.selectedSpiciness}\n`;
      }
      if (item.specialInstructions) {
        text += `   ↳ *Notes:* ${item.specialInstructions}\n`;
      }
    });

    text += `\n------------------------------------------\n`;
    text += `💰 *Subtotal:* ${subtotal.toFixed(2)} JOD\n`;
    if (deliveryType === 'Delivery') {
      text += `🚚 *Delivery Fee:* ${deliveryFee.toFixed(2)} JOD\n`;
    }
    text += `💵 *GRAND TOTAL / الإجمالي:* ${total.toFixed(2)} JOD\n`;
    text += `------------------------------------------\n`;
    text += `📍 Location: Abu Rashid Street, Irbid, Jordan`;

    return text;
  };

  const handleWhatsAppOrder = () => {
    if (!fullName || !phone) {
      alert(isAr ? 'من فضلك املأ الاسم ورقم الهاتف لإتمام طلبك!' : 'Please provide your name and phone number to place your order!');
      return;
    }
    const message = formatOrderText();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${CONTACT_INFO.whatsappDirect}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleEmailOrder = () => {
    if (!fullName || !phone) {
      alert(isAr ? 'من فضلك املأ الاسم ورقم الهاتف لإتمام طلبك!' : 'Please provide your name and phone number to place your order!');
      return;
    }
    const subject = `Richy Cafe - Order by ${fullName}`;
    const body = formatOrderText();
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart_sidebar_wrapper" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gold-300">
          {/* Header */}
          <div className="px-5 py-6 bg-charcoal-900 text-white flex items-center justify-between border-b border-gold-500/20">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-display text-xl font-bold text-gold-200">
                {checkoutMode
                  ? isAr ? 'إتمام تفاصيل الطلب' : 'Complete Delivery Info'
                  : isAr ? 'حقيبة الطلبات اللذيذة' : 'Your Appeti-List'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white hover:bg-gold-550/10 rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart item elements / details wrapper */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {checkoutMode ? (
              /* Checkout Form Panel */
              <div className="space-y-5 py-2">
                <p className="text-xs text-gray-500 bg-gold-100 p-3 rounded-lg leading-relaxed">
                  {isAr
                    ? 'سيتم تنسيق طلباتك بنقرة واحدة لتفتح محادثة واتساب مباشرة مع مطعم ريتشي، أو إرسالها بالبريد الإلكتروني للتحضير الفوري.'
                    : 'We will format your cart items instantly so you can ping our Abu Rashid Street kitchen team directly via WhatsApp or Email!'}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    {isAr ? 'الاسم بالكامل *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isAr ? 'طلب باسم من؟' : 'Enter your name'}
                    className="w-full text-sm p-3 border border-gold-200 rounded-lg text-charcoal-900 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    {isAr ? 'رقم الهاتف للتواصل والدقوس *' : 'Mobile / Contact Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isAr ? 'مثال: 0791234567' : 'e.g. +962 7 9xxx'}
                    className="w-full text-sm p-3 border border-gold-200 rounded-lg text-charcoal-900 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    {isAr ? 'كيف ترغب في استلام طلبك؟' : 'Dining / Delivery Channel?'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('DineIn')}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition cursor-pointer ${
                        deliveryType === 'DineIn'
                          ? 'border-gold-500 bg-gold-100/50 text-gold-800 font-semibold'
                          : 'border-gray-205 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <Tablet className="w-5 h-5 mb-1" />
                      <span className="text-xs">{isAr ? 'داخل الصالة / طاولة' : 'Dine-In or PickUp'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('Delivery')}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition cursor-pointer ${
                        deliveryType === 'Delivery'
                          ? 'border-gold-500 bg-gold-100/50 text-gold-800 font-semibold'
                          : 'border-gray-205 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <MapPin className="w-5 h-5 mb-1" />
                      <span className="text-xs">{isAr ? 'توصيل في إربد (+1.50 JOD)' : 'Delivery (+1.50 JOD)'}</span>
                    </button>
                  </div>
                </div>

                {/* Diners Note Context */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    {deliveryType === 'DineIn'
                      ? isAr ? 'رقم الطاولة أو تفاصيل الموعد' : 'Table Number or Special Instructions'
                      : isAr ? 'عنوان التوصيل التفصيلي في إربد' : 'Detailed Delivery Address in Irbid'}
                  </label>
                  <textarea
                    rows={2}
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    placeholder={
                      deliveryType === 'DineIn'
                        ? isAr ? 'مثال: طاولة رقم 4 بجانب التراس / استلام سفري' : 'e.g. Table 12, or Takeaway pick-up in 15 mins'
                        : isAr ? 'اسم الحي، الشارع، علامة مميزة بالقرب من شارع أبو راشد' : 'e.g. Al-Nuzha, near Yarmouk University, street...'
                    }
                    className="w-full text-sm p-3 border border-gold-200 rounded-lg text-charcoal-900 focus:outline-none focus:border-gold-550 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutMode(false)}
                  className="text-xs font-semibold text-gold-700 hover:underline flex items-center mt-2 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 mr-0.5 inline rotate-180" />
                  <span>{isAr ? 'الرجوع ومراجعة محتويات السلة' : 'Go back to review meals'}</span>
                </button>
              </div>
            ) : (
              /* Cart list items Panel */
              cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 animate-pulse mb-4" />
                  <p className="font-display font-medium text-gray-500">
                    {isAr ? 'حقيبة طعامك فارغة حالياً' : 'Your appetizing list is empty'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs px-4">
                    {isAr ? 'تصفح قائمتنا الغنية بالمنسف والمشاوي بالأسفل وأضف ألذ الوجبات!' : 'Browse the rich Levantine menu below to fill your hunger list!'}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 text-xs font-bold text-gold-500 bg-charcoal-900 p-2.5 px-5 rounded-lg border border-gold-400/20 shadow-md cursor-pointer"
                  >
                    {isAr ? 'تصفح محتويات القائمة' : 'Browse Dishes Now'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3 bg-gold-50/50 rounded-xl border border-gold-200/50 flex space-x-3 items-start justify-between relative"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gold-200"
                      />

                      <div className="flex-1 mx-3 text-left">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-semibold text-sm text-charcoal-900 line-clamp-1">
                            {isAr ? item.dish.nameAr : item.dish.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-gold-700 whitespace-nowrap">
                            {(item.dish.price * item.quantity).toFixed(2)} JOD
                          </span>
                        </div>

                        {/* Interactive Spiciness Selector */}
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="text-[10px] text-gray-550 font-medium">Spicy:</span>
                          <select
                            value={item.selectedSpiciness || 'Regular'}
                            onChange={(e) => {
                              item.selectedSpiciness = e.target.value as any;
                              onUpdateQuantity(item.dish.id, item.quantity); // force update parent state
                            }}
                            className="bg-white border border-gold-200/50 text-[10px] rounded p-0.5 text-gray-700 pointer-events-auto"
                          >
                            <option value="Regular">{isAr ? 'عادي' : 'Regular'}</option>
                            <option value="Medium Arabic Spicy">{isAr ? 'وسط سبايسي' : 'Medium Arabic'}</option>
                            <option value="Extra Hot">{isAr ? 'شطة إضافية' : 'Extra Hot'}</option>
                          </select>
                        </div>

                        {/* Special request text */}
                        <input
                          type="text"
                          value={item.specialInstructions || ''}
                          onChange={(e) => {
                            item.specialInstructions = e.target.value;
                            onUpdateQuantity(item.dish.id, item.quantity); // force update state
                          }}
                          placeholder={isAr ? 'ملاحظة خاصة (بدون بصل مثلاً)' : 'Special request note'}
                          className="w-full mt-1.5 p-1 px-2 border border-gold-200/30 text-[10px] rounded text-charcoal-900 focus:outline-none focus:border-gold-400 bg-white"
                        />

                        {/* Item Quantity control */}
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-gold-200/20">
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) onUpdateQuantity(item.dish.id, item.quantity - 1);
                              }}
                              className="w-5 h-5 rounded-md bg-gold-200 text-charcoal-900 flex items-center justify-center text-xs font-bold font-mono hover:bg-gold-300 pointer-events-auto"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-gray-800 w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                              className="w-5 h-5 rounded-md bg-gold-200 text-charcoal-900 flex items-center justify-center text-xs font-bold font-mono hover:bg-gold-300 pointer-events-auto"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.dish.id)}
                            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Pricing Math and Action Trigger Board */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gold-300 space-y-4">
              <div className="space-y-1.5 text-sm" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                <div className="flex justify-between text-gray-550">
                  <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono font-semibold">{subtotal.toFixed(2)} JOD</span>
                </div>
                {deliveryType === 'Delivery' && checkoutMode && (
                  <div className="flex justify-between text-gray-550">
                    <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
                    <span className="font-mono font-semibold">+{deliveryFee.toFixed(2)} JOD</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal-900 font-extrabold text-base pt-2 border-t border-gray-200">
                  <span>{isAr ? 'الإجمالي الكلي:' : 'Total Amount:'}</span>
                  <span className="font-mono text-gold-700 text-lg">{total.toFixed(2)} JOD</span>
                </div>
              </div>

              {checkoutMode ? (
                /* Checkout Trigger buttons */
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center space-x-2 p-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-xl text-xs uppercase tracking-wider font-sans transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 mr-0.5" />
                    <span>{isAr ? 'إرسال الطلب عبر واتساب الكافيه' : 'Confirm Order via WhatsApp'}</span>
                  </button>

                  <button
                    onClick={handleEmailOrder}
                    className="w-full flex items-center justify-center space-x-2 p-3 bg-gold-100 hover:bg-gold-200 text-[#2A2A2A] font-semibold rounded-xl text-xs uppercase tracking-wider font-sans transition-all duration-300 cursor-pointer border border-gold-300/30"
                  >
                    <Mail className="w-4 h-4 mr-0.5" />
                    <span>{isAr ? 'إرسال الطلب بالبريد الإلكتروني' : 'Confirm Order via Email'}</span>
                  </button>
                </div>
              ) : (
                /* Proceed to details form */
                <button
                  onClick={() => setCheckoutMode(true)}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-xl text-xs uppercase tracking-wider font-sans transition-all duration-300 cursor-pointer shadow-md"
                >
                  <span>{isAr ? 'خطوة الدفع وتأكيد الاستلام' : 'Proceed to Checkout Details'}</span>
                </button>
              )}

              {!checkoutMode && (
                <div className="text-center">
                  <button
                    onClick={onClearCart}
                    className="text-[10px] text-gray-400 hover:text-red-500 underline font-medium cursor-pointer"
                  >
                    {isAr ? 'إفراغ سلة الطعام' : 'Reset & Clear Cart'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
