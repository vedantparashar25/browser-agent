import React, { useState } from 'react';
import { Mic, Loader2, Sparkles, ArrowRight } from 'lucide-react';

const LATEST_BOUGHT_PRODUCTS = [
  // Category 1: Tech & Electronics
  {
    id: 't1',
    category: 'tech',
    categoryLabel: 'Tech',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'boAt Airdopes 141 ANC',
    price: '₹1,299',
    query: 'boAt Airdopes 141 ANC earbuds under 2000',
    stat: '184k bought'
  },
  {
    id: 't2',
    category: 'tech',
    categoryLabel: 'Tech',
    site: 'Croma',
    siteBadge: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/80',
    title: 'OnePlus Nord 4 5G',
    price: '₹29,999',
    query: 'OnePlus Nord 4 5G smartphone under 30000',
    stat: '28k bought'
  },
  {
    id: 't3',
    category: 'tech',
    categoryLabel: 'Tech',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'Anker 65W GaN Fast Charger',
    price: '₹2,499',
    query: 'fast charger under 2500',
    stat: '14k bought'
  },
  {
    id: 't4',
    category: 'tech',
    categoryLabel: 'Tech',
    site: 'Flipkart',
    siteBadge: 'bg-blue-500/10 text-blue-700 border-blue-200/80',
    title: 'Acer Predator Helios Neo 16',
    price: '₹1,14,990',
    query: 'acer predator helios neo 16 gaming laptop',
    stat: '9k bought'
  },

  // Category 2: Household things
  {
    id: 'h1',
    category: 'household',
    categoryLabel: 'Household',
    site: 'Flipkart',
    siteBadge: 'bg-blue-500/10 text-blue-700 border-blue-200/80',
    title: 'Ninja Air Fryer MAX PRO 6.2L',
    price: '₹8,999',
    query: 'air fryer digital under 10000',
    stat: '22k bought'
  },
  {
    id: 'h2',
    category: 'household',
    categoryLabel: 'Household',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'Pureit Wave Prime RO Purifier',
    price: '₹7,599',
    query: 'RO water purifier under 10000',
    stat: '31k bought'
  },
  {
    id: 'h3',
    category: 'household',
    categoryLabel: 'Household',
    site: 'Croma',
    siteBadge: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/80',
    title: "De'Longhi Dedica Espresso Machine",
    price: '₹16,997',
    query: 'espresso coffee machine under 18000',
    stat: '8k bought'
  },
  {
    id: 'h4',
    category: 'household',
    categoryLabel: 'Household',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'ILIFE A30 LiDAR Robot Vacuum',
    price: '₹17,898',
    query: 'robot vacuum cleaner under 25000',
    stat: '15k bought'
  },

  // Category 3: Dresses & Fashion Apparel
  {
    id: 'd1',
    category: 'dresses',
    categoryLabel: 'Dresses',
    site: 'Myntra',
    siteBadge: 'bg-pink-500/10 text-pink-700 border-pink-200/80',
    title: 'Cotton Kurta Set with Dupatta',
    price: '₹1,394',
    query: 'women cotton kurta set under 1500',
    stat: '54k bought'
  },
  {
    id: 'd2',
    category: 'dresses',
    categoryLabel: 'Dresses',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'Floral Tiered Maxi Dress',
    price: '₹745',
    query: 'floral tiered maxi dress under 1000',
    stat: '26k bought'
  },
  {
    id: 'd3',
    category: 'dresses',
    categoryLabel: 'Dresses',
    site: 'Ajio',
    siteBadge: 'bg-indigo-500/10 text-indigo-700 border-indigo-200/80',
    title: 'Cavallo 100% French Linen Shirt',
    price: '₹1,089',
    query: 'men 100% French linen shirt',
    stat: '18k bought'
  },
  {
    id: 'd4',
    category: 'dresses',
    categoryLabel: 'Dresses',
    site: 'Myntra',
    siteBadge: 'bg-pink-500/10 text-pink-700 border-pink-200/80',
    title: 'SaintX Formal Tuxedo Blazer',
    price: '₹1,999',
    query: 'men formal tuxedo party blazer under 2500',
    stat: '12k bought'
  },

  // Category 4: Beauty & Skincare
  {
    id: 'b1',
    category: 'beauty',
    categoryLabel: 'Beauty',
    site: 'Nykaa',
    siteBadge: 'bg-rose-500/10 text-rose-700 border-rose-200/80',
    title: 'Minimalist 0.3% Ceramide Moisturizer',
    price: '₹569',
    query: 'minimalist ceramide moisturizer',
    stat: '76k bought'
  },
  {
    id: 'b2',
    category: 'beauty',
    categoryLabel: 'Beauty',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'Derma Co 10% Vitamin C Serum',
    price: '₹584',
    query: 'vitamin c face serum under 700',
    stat: '42k bought'
  },

  // Category 5: Fitness & Sports
  {
    id: 'f1',
    category: 'fitness',
    categoryLabel: 'Fitness',
    site: 'Amazon',
    siteBadge: 'bg-amber-500/10 text-amber-700 border-amber-200/80',
    title: 'Flexnest Quick-Dial Dumbbells',
    price: '₹16,998',
    query: 'flexnest adjustable dumbbells',
    stat: '11k bought'
  },
  {
    id: 'f2',
    category: 'fitness',
    categoryLabel: 'Fitness',
    site: 'Flipkart',
    siteBadge: 'bg-blue-500/10 text-blue-700 border-blue-200/80',
    title: 'Boldfit High-Density Yoga Mat',
    price: '₹899',
    query: 'yoga mat high density under 1000',
    stat: '64k bought'
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Sites' },
  { id: 'tech', label: 'Tech' },
  { id: 'household', label: 'Household' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'fitness', label: 'Fitness' }
];

export default function QueryInput({
  query,
  setQuery,
  isListening,
  toggleMic,
  isProcessing,
  onSubmit,
  onPreset
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const displayedProducts =
    activeFilter === 'all'
      ? [
          // 1 top latest bought from each category across sites
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'tech' && p.site === 'Amazon'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'household' && p.site === 'Flipkart'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'dresses' && p.site === 'Myntra'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'beauty' && p.site === 'Nykaa'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'tech' && p.site === 'Croma'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'household' && p.site === 'Amazon'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'dresses' && p.site === 'Amazon'),
          LATEST_BOUGHT_PRODUCTS.find((p) => p.category === 'fitness' && p.site === 'Amazon')
        ].filter(Boolean)
      : LATEST_BOUGHT_PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="w-full space-y-2.5">
      {/* Search Bar Container */}
      <div className="bg-white border border-slate-200/90 hover:border-slate-300 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 rounded-2xl p-2 sm:p-2.5 shadow-sm transition-all">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex items-center gap-2"
        >
          <div className="pl-3 text-slate-400">
            <Sparkles className="w-5 h-5 text-slate-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isListening
                ? 'Listening with Aria... Speak your request naturally'
                : 'Speak or type your request (e.g. "ANC earbuds under 2000" or "Gaming laptop under 60k")'
            }
            disabled={isProcessing}
            className="flex-1 bg-transparent py-3 px-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none font-medium"
          />

          <div className="flex items-center space-x-1.5 pr-1 shrink-0">
            {/* Minimal Voice Search Button */}
            <button
              type="button"
              onClick={toggleMic}
              disabled={isProcessing}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                isListening
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Speak with Aria'}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'text-rose-600' : 'text-sky-600'}`} />
              <span className="hidden sm:inline">{isListening ? 'Listening…' : 'Aria Voice'}</span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !query.trim()}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              title="Search"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Latest Products Bought Across E-Commerce Sites */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 px-1 text-xs">
        {/* Header with Live Indicator & Category Filter Chips */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-700 tracking-tight">
              Latest Bought:
            </span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/70">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                  activeFilter === cat.id
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live E-Commerce Product Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
          {displayedProducts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPreset(item.query)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-950 transition-all text-xs flex items-center space-x-1.5 shrink-0 shadow-2xs group"
              title={`Recently bought on ${item.site} (${item.stat}) — Click to run autonomous search`}
            >
              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${item.siteBadge}`}>
                {item.site}
              </span>
              <span className="font-medium text-slate-800 group-hover:text-sky-900 text-[11px] max-w-[150px] sm:max-w-none truncate">
                {item.title}
              </span>
              <span className="text-[11px] font-bold text-slate-900">
                {item.price}
              </span>
              <ArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
