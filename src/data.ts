/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish, Review } from './types';

export const HERO_RESOURCES = {
  heroBanner: '/src/assets/images/richy_hero_banner_1781366703702.jpg',
  coffeePouring: '/src/assets/images/arabic_coffee_pouring_1781366716826.jpg',
  socialDining: '/src/assets/images/social_arabic_dining_1781366730750.jpg',
};

export const CONTACT_INFO = {
  address: 'Abu Rashid Street (شارع أبو راشد), Irbid, Jordan',
  coordinates: { lat: 32.5514, lng: 35.8493 }, // Irbid, Jordan center area near Abu Rashid St
  phone: '+962 7 9123 4567',
  whatsappDirect: '962791234567', // For WhatsApp deep links
  email: 'info@richycafe.com',
  workingHours: 'Daily: 8:00 AM – 2:00 AM (Open Late-Night)',
  rating: 4.4,
  reviewCount: 82,
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Ahmad Al-Momani',
    rating: 5,
    text: 'The best family platters in Irbid. The hummus with meat is exceptional, and their staff is extremely hospitable! Highly recommended for social dining.',
    textAr: 'أفضل الوجبات العائلية في إربد. الحمص باللحمة استثنائي، وطاقم العمل ودود وخدوم لأبعد الحدود! خيار ممتع للمجموعات والعائلات.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    author: 'Layla Haddad',
    rating: 4.5,
    text: 'Richy is our go-to spot for late-night coffee and dessert on Abu Rashid Street. The Kunafeh is freshly prepared, and the cardamom tea is spectacular.',
    textAr: 'مكاني المفضل في شارع أبو راشد للقهوة والحلويات في الليل. الكنافة طازجة وتحضر في وقتها وشاي الهيل لديهم رائع جداً.',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    author: 'Yousef Obeidat',
    rating: 4.5,
    text: 'Authentic Arabic atmosphere, generous platters, and fair prices. The Shish Tawook wraps are tender. The place is lively until 2:00 AM!',
    textAr: 'أجواء عربية أصيلة، كميات سخية وأسعار معقولة جداً. الشيش طاووق طري والخدمة سريعة رغم الازدحام. يفتح حتى السادسة صباحاً ومثالي للسهرات.',
    date: '2 months ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

export const DISHES: Dish[] = [
  // 1. Platters & Mains
  {
    id: 'richy-platter-1',
    name: 'Richy Arabic Mixed Grill Feast',
    nameAr: 'مشاوي ريتشي العربية المشكلة',
    description: 'Generous platter consisting of 2 kebabs, 1 shish tawook, 1 beef tikka, grilled tomatoes, onions, and garlic sauce with hot bread.',
    descriptionAr: 'طبق غني يضم سيخين كباب، سيخ شيش طاووق، سيخ تكة لحم، طماطم وبصل مشوي، كريم ثوم وخبز حار سائل من التنور.',
    price: 9.50,
    category: 'Platters & Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    tags: ['Best Seller', 'Sharing Platter', 'Grills'],
    prepareTime: '20-25 mins',
    isSpecial: true,
    rating: 4.9,
  },
  {
    id: 'platter-mansaf',
    name: 'Authentic Mansaf Karaki (Individual/Sharing)',
    nameAr: 'منسف بلدي ملوكي جميد كركي',
    description: 'Tender Jordanian lamb cooked in rich Karaki Jameed broth, served with aromatic turmeric rice, toasted pine nuts, and shrak bread.',
    descriptionAr: 'لحم خروف بلدي طري مطبوخ بجميد كركي أصيل، يقدم فوق الأرز الأصفر بالكركم المخملي، ومزين باللوز المقلي والخبز الشراك.',
    price: 8.90,
    category: 'Platters & Mains',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
    tags: ['National Dish', 'Local Favorite'],
    prepareTime: '25 mins',
    rating: 4.8,
  },
  {
    id: 'platter-khalijy',
    name: 'Smoked Kabsa with Chicken',
    nameAr: 'كبسة الدجاج المدخنة',
    description: 'Slow-steamed spiced basmati rice topped with roasted half chicken, decorated with toasted nuts and served with fresh hot daqoos sauce.',
    descriptionAr: 'أرز بسمتي فاخر مطبوخ بالبهارات الغنية والمدخن، يعلوه نصف دجاجة محمرة ومقرمشة، مع المكسرات وصلصة الدقوس الحارة.',
    price: 5.50,
    category: 'Platters & Mains',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    tags: ['Rice Specialty'],
    prepareTime: '15-20 mins',
    isSpicy: true,
    rating: 4.6,
  },

  // 2. Grills
  {
    id: 'grill-shish',
    name: 'Golden Shish Tawook Platter',
    nameAr: 'شيش طاووق ريتشي الذهبي',
    description: 'Marinated charbroiled chicken breast skewers flavored with special spices, served with french fries, hummus, and pickles.',
    descriptionAr: 'مكعبات صدر دجاج متبلة وممشوقة على السيخ، مشوية على الفحم، تقدم مع البطاطا المقلية، الحمص، والمخللات الفريش.',
    price: 6.20,
    category: 'Grills',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?w=600&auto=format&fit=crop&q=80',
    tags: ['Skewers', 'Chicken'],
    prepareTime: '15 mins',
    rating: 4.7,
  },
  {
    id: 'grill-kebab',
    name: 'Special Kebab Halabi',
    nameAr: 'كباب حلبي بصلصة الطماطم المشوية',
    description: 'Premium minced lamb skewers grilled over charcoal, resting on a rich stew of charbroiled tomatoes, pine nuts, and fresh parsley.',
    descriptionAr: 'أسياخ كباب مفرومة من لحم الغنم الفاخر المشوي على الفحم، والمنقوع بصلصة الطماطم المشوية الغنية والبقدونس.',
    price: 7.50,
    category: 'Grills',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80',
    tags: ['Classic Lamb'],
    prepareTime: '15 mins',
    rating: 4.8,
  },

  // 3. Fresh Salads
  {
    id: 'salad-tabbouleh',
    name: 'Richy Fine Tabbouleh',
    nameAr: 'تبولة لبنانية فاخرة',
    description: 'Finely chopped fresh parsley, juicy tomatoes, white onions, mint, and fine bulgur wheat, tossed in zesty lemon-infused olive oil.',
    descriptionAr: 'بقدونس بلدي مفروم بدقة مع الطماطم، البصل، النعناع البري والبرغل الناعم، ومتبل بزيت الزيتون البكر وعصير الليمون الصافي.',
    price: 2.20,
    category: 'Fresh Salads',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    tags: ['Healthy', 'Vegetarian', 'Fresh'],
    prepareTime: '5-8 mins',
    isVegetarian: true,
    rating: 4.7,
  },
  {
    id: 'salad-fattoush',
    name: 'Crispy Pomegranate Fattoush',
    nameAr: 'فتوش بالرمان والخبز المقرمش',
    description: 'Crispy garden lettuce, cucumbers, radish, tomatoes, tossed with tart pomegranate molasses, fresh sumac, and loaded with toasted flatbread.',
    descriptionAr: 'مزيج منعش من الخس، الخيار، الفجل، الطماطم الكرزية، متبل بدبس الرمان الفاخر، السماق البلدي، ويعلوه قطع الخبز المقرمش.',
    price: 2.20,
    category: 'Fresh Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    tags: ['Healthy', 'Vegetarian'],
    prepareTime: '5-8 mins',
    isVegetarian: true,
    rating: 4.8,
  },

  // 4. Appetizers & Sides
  {
    id: 'app-hummus-beef',
    name: 'Hummus with Roasted Pine Nuts & Beef',
    nameAr: 'حمص مدور باللحم والصنوبر المحمص',
    description: 'Creamy house-made chickpea hummus drizzled with authentic olive oil, topped with tender beef sautéed and sizzling golden pine nuts.',
    descriptionAr: 'حمص ريتشي الكلاسيكي الناعم مع تتبيلة الطحينية والليمون، مغطى بقطع اللحم المفرومة المقلية والصنوبر الذهبي والزيت والمقبلات.',
    price: 3.80,
    category: 'Appetizers & Sides',
    image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=600&auto=format&fit=crop&q=80',
    tags: ['Comfort Food', 'Warm Starter'],
    prepareTime: '10 mins',
    rating: 4.9,
  },
  {
    id: 'app-falafel',
    name: 'Golden Stuffed Falafel Platter (6 pcs)',
    nameAr: 'فلافل محشي كرسبي بالبصل والشطة',
    description: 'Crispies of hand-ground fava and chickpeas spiced with coriander, filled with sumac-marinated onions, toasted sesame seeds.',
    descriptionAr: 'حبات فلافل ذهبية مقرمشة محشوة بالبصل المكرمل والسماق والشطة، تقدم مع صلصة الطحينية وصحبة مخلل لفت بلدي.',
    price: 1.80,
    category: 'Appetizers & Sides',
    image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=600&auto=format&fit=crop&q=80', // replacement or similar
    tags: ['Vegetarian', 'Crispy'],
    prepareTime: '10 mins',
    isVegetarian: true,
    rating: 4.6,
  },
  {
    id: 'app-mutabbal',
    name: 'Smoked Mutabbal (Eggplant)',
    nameAr: 'متبل باذنجان مشوي بالرمان',
    description: 'Fire-roasted eggplant mashed with raw cream tahini, lemon juice, whole garlic, and crowned with scarlet sweet pomegranate seeds.',
    descriptionAr: 'متبل باذنجان مشوي على الفحم ومهروس بالطحينة والليمون والثوم البلدي، يعلوه حب الرمان الأحمر وقطرات زيت زيتون فخم.',
    price: 2.20,
    category: 'Appetizers & Sides',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&auto=format&fit=crop&q=80',
    tags: ['Vegetarian', 'Creamy Dip'],
    prepareTime: '8 mins',
    isVegetarian: true,
    rating: 4.5,
  },

  // 5. Desserts & Sweets
  {
    id: 'dessert-kunafeh',
    name: 'Richy Cheesy Kunafeh Nabulsieh',
    nameAr: 'كنافة نابلسية بالجبن العكاوي البلدي',
    description: 'Crispy shredded wheat dough baked with warm Akkawi cheese, soaked in pure orange-blossom syrup and topped with crushed green pistachios.',
    descriptionAr: 'عجينة الكنافة الذهبية بجبنة العكاوي الساخنة والذائبة، محلاة بالقطر المعطر بماء الزهر والمسك ومزينة بالفستق الحلبي.',
    price: 3.50,
    category: 'Desserts & Sweets',
    image: 'https://images.unsplash.com/photo-1517244683807-7ae58e28a0e9?w=600&auto=format&fit=crop&q=80', // Replace search later or picsum
    tags: ['Warm Dessert', 'Tradition', 'Iconic'],
    prepareTime: '12 mins',
    rating: 4.9,
  },

  // 6. Traditional Hot Drinks
  {
    id: 'drink-arabic-coffee',
    name: 'Traditional Arabic Cardamom Coffee (Dallah)',
    nameAr: 'دلة قهوة عربية بالهيل المسمار',
    description: 'Slow-brewed authentic light-roasted Arabic coffee infused with cardamom and premium saffron, served hot in a beautiful traditional brass dallah pot with dates.',
    descriptionAr: 'قهوة عربية شقراء أصيلة مخمرة مع الهيل والزعفران الحر، تقدم ساخنة في دلة نحاسية مع حبات التمر السكري الفاخر.',
    price: 3.00,
    category: 'Traditional Hot Drinks',
    image: HERO_RESOURCES.coffeePouring,
    tags: ['Sip Like a Jordan Native', 'Sharing Hot Pot'],
    prepareTime: '10 mins',
    rating: 4.9,
  },
  {
    id: 'drink-tea',
    name: 'Aromatic Sage or Mint Tea (Arabic Glass)',
    nameAr: 'شاي عجمي معطر بالميرمية أو النعناع',
    description: 'Warm, dark, high-mountain Ceylon tea leaves steeped with fresh wild sage (marmarreyah) or organic fresh mint leaves in small glass cups. Sweetness of your choice.',
    descriptionAr: 'شاي سيلاني فاخر مخمر على الرمل مع أوراق الميرمية البرية أو النعناع الأخضر البلدي في كاسات زجاجية ممشوقة.',
    price: 1.20,
    category: 'Traditional Hot Drinks',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    tags: ['Popular Accent'],
    prepareTime: '5 mins',
    rating: 4.8,
  },

  // 7. Chilled Beverages
  {
    id: 'drink-lemonade',
    name: 'Frozen Mint Lemonade Breeze',
    nameAr: 'ليمون ونعناع مثلج فريش',
    description: 'Blended fresh local lemons with raw sugar syrup and crushed deep-green mint leaves. The ultimate cooling remedy of Irbid.',
    descriptionAr: 'عصير الليمون الطازج المخلوط مع النعناع البلدي والثلج المجروش وسيرو السكر، يمنحك برودة استوائية لا تضاهى.',
    price: 2.50,
    category: 'Chilled Beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    tags: ['Refreshing', 'Cooling Agent'],
    prepareTime: '6 mins',
    rating: 4.7,
  },
];
