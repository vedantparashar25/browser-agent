import React from 'react';
import { Compass, ShoppingBag, Laptop, Shirt, Sparkles, Plus, ExternalLink } from 'lucide-react';

const DEFAULT_BOOKMARKS = [
  {
    id: 'b-copilot',
    title: 'Pathfinder Workspace',
    url: 'pathfinder://workspace',
    icon: <Compass className="w-3 h-3 text-sky-600" />,
    badgeColor: 'bg-sky-50 text-sky-700'
  },
  {
    id: 'b-amazon',
    title: 'Amazon India',
    url: 'https://www.amazon.in',
    icon: <span className="font-bold text-[10px] text-amber-700">a</span>,
    badgeColor: 'bg-amber-50 text-amber-800'
  },
  {
    id: 'b-flipkart',
    title: 'Flipkart Deals',
    url: 'https://www.flipkart.com',
    icon: <span className="font-bold text-[10px] text-blue-700">fk</span>,
    badgeColor: 'bg-blue-50 text-blue-800'
  },
  {
    id: 'b-croma',
    title: 'Croma Retail',
    url: 'https://www.croma.com',
    icon: <Laptop className="w-3 h-3 text-emerald-600" />,
    badgeColor: 'bg-emerald-50 text-emerald-800'
  },
  {
    id: 'b-myntra',
    title: 'Myntra Fashion',
    url: 'https://www.myntra.com',
    icon: <Shirt className="w-3 h-3 text-rose-600" />,
    badgeColor: 'bg-rose-50 text-rose-800'
  },
  {
    id: 'b-nykaa',
    title: 'Nykaa Beauty',
    url: 'https://www.nykaa.com',
    icon: <ShoppingBag className="w-3 h-3 text-pink-600" />,
    badgeColor: 'bg-pink-50 text-pink-800'
  },
  {
    id: 'b-arbitrage',
    title: 'Live Price Radar',
    url: 'pathfinder://radar',
    icon: <Sparkles className="w-3 h-3 text-indigo-600" />,
    badgeColor: 'bg-indigo-50 text-indigo-800'
  }
];

export default function BrowserBookmarks({ onNavigate, currentUrl }) {
  return (
    <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-1 flex items-center space-x-1.5 overflow-x-auto scrollbar-none select-none text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pr-1.5 shrink-0">
        Bookmarks
      </span>

      {DEFAULT_BOOKMARKS.map((item) => {
        const isCurrent = currentUrl === item.url;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.url)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all shrink-0 font-medium ${
              isCurrent
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
            title={`Navigate to ${item.url}`}
          >
            <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}