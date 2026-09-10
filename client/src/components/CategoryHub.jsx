import React, { useState } from 'react';
import {
  Laptop,
  Home,
  Shirt,
  Sparkles,
  Dumbbell,
  ArrowRight,
  Star
} from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'tech',
    number: 'Category 1',
    label: 'Tech & Electronics',
    shortName: 'Tech',
    icon: Laptop,
    badge: 'Popular',
    description: 'Laptops, 5G smartphones, GaN chargers, ANC audio, and wearables',
    subcategories: [
      { name: 'Laptops under ₹65,000', query: 'laptop under 65000' },
      { name: '5G Phones under ₹25,000', query: '5G smartphone under 25000' },
      { name: 'Fast Chargers under ₹2,500', query: 'fast charger under 2500' },
      { name: 'ANC Earbuds under ₹2,000', query: 'wireless earbuds under 2000' },
      { name: 'Smartwatches under ₹3,000', query: 'smartwatch under 3000' },
      { name: 'Smart TVs under ₹35,000', query: 'smart tv under 35000' }
    ],
    featuredProducts: [
      {
        title: 'ASUS Vivobook 15 (Core i5 12th Gen, 16GB, 512GB SSD)',
        price: '₹42,990',
        rating: 4.4,
        image: 'https://m.media-amazon.com/images/I/71s3fT4VSSL._AC_SL1500_.jpg',
        query: 'ASUS Vivobook 15 under 45000',
        tag: 'Productivity'
      },
      {
        title: 'Anker 65W GaN Fast Charger 3-Port (2x USB-C + USB-A)',
        price: '₹2,999',
        rating: 4.5,
        image: 'https://m.media-amazon.com/images/I/51sHbgzvn4L._AC_UY218_.jpg',
        query: 'charger under 3000',
        tag: 'Fast Power'
      },
      {
        title: 'boAt Airdopes 141 ANC with 32dB Active Noise Cancelling',
        price: '₹1,299',
        rating: 4.4,
        image: 'https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg',
        query: 'wireless earbuds under 2000',
        tag: 'Best Value'
      }
    ]
  },
  {
    id: 'household',
    number: 'Category 2',
    label: 'Household & Appliances',
    shortName: 'Household',
    icon: Home,
    badge: 'Essential',
    description: 'Digital air fryers, robot vacuums, RO purifiers, cookware & coffee makers',
    subcategories: [
      { name: 'Digital Air Fryer under ₹8,000', query: 'digital air fryer under 8000' },
      { name: 'Robot Vacuum Cleaner under ₹25,000', query: 'robot vacuum cleaner under 25000' },
      { name: 'RO Water Purifier under ₹10,000', query: 'water purifier ro under 10000' },
      { name: 'Espresso Coffee Machine under ₹18,000', query: 'espresso coffee machine under 18000' },
      { name: 'Granite Cookware Set under ₹5,000', query: 'cookware set non stick under 5000' },
      { name: 'Steam Iron under ₹2,000', query: 'garment steam iron under 2000' }
    ],
    featuredProducts: [
      {
        title: 'Ninja Air Fryer MAX PRO (6.2L, 6-in-1 Air Fry, Bake & Roast)',
        price: '₹9,999',
        rating: 4.6,
        image: 'https://m.media-amazon.com/images/I/61NEz27pw3L._AC_UY218_.jpg',
        query: 'air fryer digital under 10000',
        tag: 'Kitchen Hero'
      },
      {
        title: 'ILIFE A30 Robot Vacuum & Mop (LiDAR Navigation, 13000Pa)',
        price: '₹17,898',
        rating: 4.3,
        image: 'https://m.media-amazon.com/images/I/61rLOrMnfvL._AC_UY218_.jpg',
        query: 'robot vacuum cleaner under 20000',
        tag: 'Smart Clean'
      },
      {
        title: 'Pureit Wave Prime RO+MF 7L Water Purifier for Home',
        price: '₹7,599',
        rating: 4.4,
        image: 'https://m.media-amazon.com/images/I/41+cyXt47qL._AC_UY218_.jpg',
        query: 'water purifier ro under 8000',
        tag: 'Pure Water'
      }
    ]
  },
  {
    id: 'dresses',
    number: 'Category 3',
    label: 'Dresses & Fashion Apparel',
    shortName: 'Dresses',
    icon: Shirt,
    badge: 'Trending',
    description: 'Cotton kurta sets, floral maxi dresses, formal blazers, and linen shirts',
    subcategories: [
      { name: 'Cotton Kurta Set with Dupatta', query: 'women cotton kurta set under 1500' },
      { name: 'Floral Tiered Maxi Dress', query: 'women floral maxi dress under 1200' },
      { name: 'Men 100% French Linen Shirt', query: 'men linen shirt under 2000' },
      { name: 'Men Formal Tuxedo Blazer', query: 'men formal blazer under 3000' },
      { name: 'Slim Fit Denim Trucker Jacket', query: 'men denim jacket under 2000' },
      { name: 'Party Wear Evening Gown', query: 'evening party gown under 3000' }
    ],
    featuredProducts: [
      {
        title: 'Womens Cotton Embroidered Kurta & Pant Set with Dupatta',
        price: '₹1,499',
        rating: 4.3,
        image: 'https://m.media-amazon.com/images/I/71zO13a6KvL._AC_UL320_.jpg',
        query: 'women cotton kurta set under 1500',
        tag: 'Ethnic Wear'
      },
      {
        title: 'SMOWKLY Floral A-Line Tiered Ruched Maxi Dress with Belt',
        price: '₹745',
        rating: 4.2,
        image: 'https://m.media-amazon.com/images/I/61V5bmyIhxL._AC_UL320_.jpg',
        query: 'women floral maxi dress under 1000',
        tag: 'Western Wear'
      },
      {
        title: 'Cavallo by Linen Club Men 100% Pure French Linen Casual Shirt',
        price: '₹1,089',
        rating: 4.4,
        image: 'https://m.media-amazon.com/images/I/61RXBB4JJ4L._AC_UL320_.jpg',
        query: 'men linen shirt under 1500',
        tag: 'Summer Classic'
      }
    ]
  },
  {
    id: 'beauty',
    number: 'Category 4',
    label: 'Beauty & Personal Care',
    shortName: 'Beauty',
    icon: Sparkles,
    badge: 'Self-Care',
    description: 'Ceramide barrier moisturizers, facial serums, hair styling & grooming',
    subcategories: [
      { name: 'Ceramide Moisturizer under ₹600', query: 'ceramide moisturizer under 600' },
      { name: 'Vitamin C Face Serum under ₹700', query: 'vitamin c serum under 700' },
      { name: 'Professional Hair Dryer under ₹2,000', query: 'hair dryer under 2000' },
      { name: 'Cordless Beard Trimmer under ₹1,500', query: 'beard trimmer under 1500' }
    ],
    featuredProducts: [
      {
        title: 'Minimalist 0.3% Ceramide Face Moisturizer Deep Barrier Repair',
        price: '₹569',
        rating: 4.5,
        image: 'https://m.media-amazon.com/images/I/61zy-+lTFIL._AC_UL320_.jpg',
        query: 'ceramide moisturizer under 600',
        tag: 'Top Rated'
      }
    ]
  },
  {
    id: 'fitness',
    number: 'Category 5',
    label: 'Fitness & Sports Gear',
    shortName: 'Fitness',
    icon: Dumbbell,
    badge: 'Active',
    description: 'Quick-dial adjustable dumbbells, workout mats, running footwear & accessories',
    subcategories: [
      { name: 'Adjustable Dumbbells under ₹18,000', query: 'adjustable dumbbells under 20000' },
      { name: 'Anti-Slip Yoga Mat under ₹1,000', query: 'yoga mat under 1000' },
      { name: 'Nike Running Shoes under ₹4,000', query: 'running shoes under 4000' },
      { name: 'Resistance Bands Set under ₹700', query: 'resistance bands under 700' }
    ],
    featuredProducts: [
      {
        title: 'Flexnest Quick-Dial Adjustable Dumbbells (All-in-One Home Gym)',
        price: '₹16,998',
        rating: 4.5,
        image: 'https://m.media-amazon.com/images/I/61qEWRcwEUL._AC_UL320_.jpg',
        query: 'adjustable dumbbells under 20000',
        tag: 'Home Gym'
      }
    ]
  }
];

export default function CategoryHub({ onSelectQuery, activeCategory = 'tech' }) {
  const [selectedCatId, setSelectedCatId] = useState(activeCategory);

  const currentCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];

  const handleTabClick = (catId) => {
    setSelectedCatId(catId);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Category Header with Title & Live E-Commerce Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
              Department Explorer
            </span>
            <span className="text-xs text-slate-400">Click any category to browse</span>
          </div>
          <h2 className="text-sm font-semibold text-slate-900 mt-1">
            Top E-Commerce Shopping Categories
          </h2>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Multi-store live index</span>
        </div>
      </div>

      {/* Main 3 + Extended Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === selectedCatId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleTabClick(cat.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between relative group ${
                isActive
                  ? 'bg-sky-50/70 border-sky-300 text-sky-950 shadow-xs ring-1 ring-sky-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-sky-200/60 text-sky-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.number}
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold leading-tight line-clamp-1">
                  {cat.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {cat.shortName} Department
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Content Section */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 sm:p-4 space-y-3.5 transition-all">
        {/* Active Category Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-900">
              {currentCategory.label}
            </span>
            <span className="text-[11px] text-slate-500 hidden md:inline">
              &mdash; {currentCategory.description}
            </span>
          </div>
          <span className="text-[11px] text-sky-700 font-medium">
            Click any option to run autonomous agent search
          </span>
        </div>

        {/* Subcategory Query Chips */}
        <div className="flex flex-wrap gap-2">
          {currentCategory.subcategories.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectQuery(sub.query)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition-colors shadow-2xs flex items-center space-x-1.5 group"
            >
              <span>{sub.name}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>

        {/* Curated Bestseller Spotlight Cards for Selected Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {currentCategory.featuredProducts.map((prod, idx) => (
            <div
              key={idx}
              onClick={() => onSelectQuery(prod.query)}
              className="bg-white border border-slate-200/80 hover:border-sky-300 rounded-xl p-2.5 flex items-center space-x-3 cursor-pointer transition-all hover:shadow-xs group"
            >
              <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {prod.tag}
                  </span>
                  <div className="flex items-center text-[10px] text-amber-600 font-medium">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                    {prod.rating}
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-900 truncate group-hover:text-sky-700">
                  {prod.title}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-slate-900">{prod.price}</span>
                  <span className="text-[10px] text-sky-600 font-medium group-hover:underline flex items-center">
                    Search Pick <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
