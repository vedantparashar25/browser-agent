export const STORE_CATALOGS = {
  amazon: {
    storeName: 'Amazon India',
    domain: 'amazon.in',
    theme: {
      headerBg: 'bg-[#131921]',
      headerText: 'text-white',
      accentBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      badgeText: 'Prime Eligible • Fast 1-Day Delivery',
      buyButtonBg: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900',
      buyButtonLabel: 'Proceed to Buy on Amazon India',
      secondaryAction: 'Stage on Amazon',
      logoText: 'amazon.in'
    },
    defaultProduct: {
      title: 'boAt Airdopes 141 ANC TWS Earbuds (42H Playtime, 32dB ANC, Fast Charge)',
      price: '₹1,299',
      originalPrice: '₹4,490',
      discount: '71% Off Deal',
      rating: 4.4,
      reviewsCount: '184,210+ verified ratings',
      seller: 'Appario Retail (Authorized Brand Partner)',
      image: 'https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg',
      specs: [
        'Active Noise Cancellation (ANC up to 32dB) with Ambient Mode',
        '42 Hours Total Playback Time with ASAP Quick Charge (10m = 100m)',
        'Quad Microphones with AI Environmental Noise Cancellation (ENx)',
        '10mm Titanium Drivers & Beast 50ms Low-Latency Gaming Mode',
        'IPX5 Water & Sweat Resistance with 1-Year Brand Replacement Warranty'
      ],
      warranty: '1-Year Official Brand Doorstep Warranty',
      actionUrl: 'https://www.amazon.in/dp/B0F5BDRQN3'
    }
  },

  flipkart: {
    storeName: 'Flipkart Marketplace',
    domain: 'flipkart.com',
    theme: {
      headerBg: 'bg-[#2874f0]',
      headerText: 'text-white',
      accentBadge: 'bg-blue-100 text-blue-900 border-blue-300',
      badgeText: 'Flipkart Assured • SuperCoins & 5% Cashback',
      buyButtonBg: 'bg-[#fb641b] hover:bg-[#e65a16] text-white',
      buyButtonLabel: 'Proceed to Buy on Flipkart',
      secondaryAction: 'Stage on Flipkart',
      logoText: 'Flipkart'
    },
    defaultProduct: {
      title: 'Ninja Air Fryer MAX PRO (6.2L XL Family Capacity, 6-in-1 Cooking Modes, 2000W)',
      price: '₹8,999',
      originalPrice: '₹13,999',
      discount: '35% Off Festive Deal',
      rating: 4.6,
      reviewsCount: '48,620+ Flipkart verified buyers',
      seller: 'RetailNet (Flipkart Assured Verified Seller)',
      image: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=800&auto=format&fit=crop&q=80',
      specs: [
        '6.2 Litre XL Family Cooking Basket with Non-Stick Crisper Plate',
        '6 Versatile Cooking Functions: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
        'Rapid 2000W Cyclonic Air Circulation (Cooks up to 50% Faster than Fan Ovens)',
        'Variable Precision Temperature: 40°C to 240°C with Digital Touchscreen',
        'Official 2-Year Brand Replacement Guarantee & Free Doorstep Return'
      ],
      warranty: '2-Year Brand Warranty with Free Doorstep Service',
      actionUrl: 'https://www.flipkart.com'
    }
  },

  croma: {
    storeName: 'Croma Electronics',
    domain: 'croma.com',
    theme: {
      headerBg: 'bg-[#191919]',
      headerText: 'text-white',
      accentBadge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      badgeText: 'Tata NeuCoins Eligible • 24hr Express Store Pickup',
      buyButtonBg: 'bg-teal-500 hover:bg-teal-600 text-white',
      buyButtonLabel: 'Proceed to Buy on Croma',
      secondaryAction: 'Stage on Croma',
      logoText: 'croma'
    },
    defaultProduct: {
      title: 'OnePlus Nord 4 5G (12GB RAM, 256GB Storage, Oasis Green Edition)',
      price: '₹29,999',
      originalPrice: '₹32,999',
      discount: '₹3,000 Instant Bank Discount',
      rating: 4.5,
      reviewsCount: '28,140+ verified buyers',
      seller: 'Croma Official Retail Stores & Online',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      specs: [
        'Snapdragon 7+ Gen 3 High-Performance AI Chipset',
        '6.74" 120Hz Ultra-Fluid AMOLED Display with Aqua Touch',
        '5500mAh All-Day Battery with 100W SUPERVOOC Fast Flash Charge',
        '50MP Sony LYT-600 OIS Primary Camera + 8MP Ultra-Wide',
        'Official 1-Year Manufacturer Warranty with 1000+ Croma Stores Nationwide'
      ],
      warranty: '1-Year Official Brand Doorstep Warranty',
      actionUrl: 'https://www.croma.com'
    }
  },

  myntra: {
    storeName: 'Myntra Fashion',
    domain: 'myntra.com',
    theme: {
      headerBg: 'bg-[#ff3f6c]',
      headerText: 'text-white',
      accentBadge: 'bg-pink-100 text-pink-900 border-pink-300',
      badgeText: 'Myntra Insider • 14-Day Free Doorstep Returns',
      buyButtonBg: 'bg-[#ff3f6c] hover:bg-[#e0355d] text-white',
      buyButtonLabel: 'Proceed to Buy on Myntra',
      secondaryAction: 'Stage on Myntra',
      logoText: 'Myntra'
    },
    defaultProduct: {
      title: 'Pure Cotton Embroidered Anarkali Kurta Set with Handcrafted Zari Dupatta',
      price: '₹1,394',
      originalPrice: '₹4,399',
      discount: '68% Off Festive Clearance',
      rating: 4.4,
      reviewsCount: '19,800+ customer reviews',
      seller: 'Libas Brand Store (Myntra Verified Partner)',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      specs: [
        '100% Breathable Lightweight Pure Cotton Fabric',
        'Handcrafted Zari Yoke Embroidery with Flared Tiered Hemline',
        'Includes Matching Tonal Cotton Palazzos and Printed Dupatta',
        'Fade-Resistant Eco-Friendly Organic Dye',
        '14 Days Hassle-Free Exchange or Instant Return Pickup'
      ],
      warranty: '100% Genuine Brand Certified',
      actionUrl: 'https://www.myntra.com'
    }
  },

  nykaa: {
    storeName: 'Nykaa Beauty',
    domain: 'nykaa.com',
    theme: {
      headerBg: 'bg-[#fc2779]',
      headerText: 'text-white',
      accentBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      badgeText: 'Nykaa Prive • 100% Authentic Brand Verification',
      buyButtonBg: 'bg-[#fc2779] hover:bg-[#e02069] text-white',
      buyButtonLabel: 'Proceed to Buy on Nykaa',
      secondaryAction: 'Stage on Nykaa',
      logoText: 'NYKAA'
    },
    defaultProduct: {
      title: 'Advanced Night Repair Synchronized Multi-Recovery Complex Serum (50ml)',
      price: '₹7,100',
      originalPrice: '₹8,900',
      discount: '20% Off + Free Deluxe Mini',
      rating: 4.7,
      reviewsCount: '34,200+ authentic reviews',
      seller: 'Estee Lauder Official India Flagship Store',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
      specs: [
        '0.3% Active Ceramides Formulation with Cholesterol & Fatty Acids',
        'Infused with Madecassoside & Centella Asiatica for Calming Irritation',
        'Non-Comedogenic Lightweight Gel Cream for Deep Barrier Hydration',
        'Fragrance-Free, Dye-Free, Sulfate-Free & Dermatologically Tested',
        'Suitable for Sensitive, Combination, and Acne-Prone Skin'
      ],
      warranty: '100% Authentic Product Guarantee',
      actionUrl: 'https://www.nykaa.com'
    }
  }
};

export function getStoreByUrl(url = '') {
  const lower = (url || '').toLowerCase();
  if (lower.includes('flipkart')) return 'flipkart';
  if (lower.includes('croma')) return 'croma';
  if (lower.includes('myntra')) return 'myntra';
  if (lower.includes('nykaa')) return 'nykaa';
  if (lower.includes('google')) return 'google';
  if (lower.includes('amazon')) return 'amazon';
  return 'generic';
}