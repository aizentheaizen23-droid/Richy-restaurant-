/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dish {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number; // in JOD
  category: Category;
  image: string;
  tags: string[];
  prepareTime: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isSpecial?: boolean;
  rating?: number;
}

export type Category =
  | 'Grills'
  | 'Platters & Mains'
  | 'Fresh Salads'
  | 'Appetizers & Sides'
  | 'Desserts & Sweets'
  | 'Traditional Hot Drinks'
  | 'Chilled Beverages';

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedSpiciness?: 'Regular' | 'Medium Arabic Spicy' | 'Extra Hot';
  specialInstructions?: string;
}

export interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  areaPreference: 'Terrace (Outdoors)' | 'Family Section (Cozy)' | 'Main Social Lounge' | 'Quiet Study Corner';
  specialOccasion?: string;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; /* out of 5 */
  text: string;
  textAr?: string;
  date: string;
  avatar: string;
}
