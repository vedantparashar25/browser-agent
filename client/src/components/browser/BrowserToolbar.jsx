import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Compass,
  Star,
  ExternalLink,
  Mic,
  MicOff,
  Layout,
  Globe,
  Bot,
  Activity,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

export default function BrowserToolbar({
  currentUrl = 'pathfinder://workspace',
  onNavigate,
  onReload,
  onGoHome,
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward,
  viewMode = 'copilot',
  onChangeViewMode,
  isLoading = false,
  isBookmarked = false,
  onToggleBookmark,
  isListening = false,
  onToggleMic,
  voiceEnabled = true,
  onToggleVoice,
  onOpenStudio
}) {
  const [addressValue, setAddressValue] = useState(currentUrl);

  useEffect(() => {
    setAddressValue(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressValue.trim()) return;
    onNavigate(addressValue.trim());
  };

  const isInternalUrl = addressValue.startsWith('pathfinder://');

  return (
    <div className="bg-white border-b border-slate-200/90 px-3 sm:px-4 py-2 flex items-center justify-between gap-2.5 shadow-2xs">
      {/* 1. History & Navigation Controls */}
      <div className="flex items-center space-x-1 shrink-0">
        <button
          type="button"
          onClick={onGoBack}
          disabled={!canGoBack}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Click to go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onGoForward}
          disabled={!canGoForward}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Click to go forward"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onReload}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title="Reload this page"
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-600' : ''}`} />
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title="Go to Pathfinder Home"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Omnibar / URL Address Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 min-w-[200px] max-w-3xl flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white border border-slate-200 focus-within:border-sky-400 focus-within:ring-3 focus-within:ring-sky-100/80 rounded-xl px-3 py-1.5 transition-all shadow-2xs"
      >
        {/* Security & Protocol Icon */}
        <div className="flex items-center space-x-1.5 pr-2 border-r border-slate-200/80 shrink-0 select-none">
          {isInternalUrl ? (
            <div className="flex items-center space-x-1 text-sky-600 font-semibold text-xs">
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-mono text-[11px]">pathfinder://</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-emerald-600 font-medium text-xs" title="Secure connection (TLS 256-bit)">
              <Lock className="w-3 h-3" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-500">https://</span>
            </div>
          )}
        </div>

        {/* Address Input Field */}
        <input
          type="text"
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
          placeholder="Search with Aria or enter web address..."
          className="flex-1 bg-transparent px-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none truncate"
        />

        {/* Omnibar Action Buttons */}
        <div className="flex items-center space-x-1 shrink-0">
          {/* Aria Voice Assistant Mic Button inside Omnibar */}
          <button
            type="button"
            onClick={onToggleMic}
            className={`p-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              isListening
                ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/70'
            }`}
            title={isListening ? 'Listening with Aria (Click to stop)' : 'Voice Search with Aria'}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline text-[11px] font-semibold">
              {isListening ? 'Listening' : 'Aria'}
            </span>
          </button>

          {/* Bookmark Star */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark this page'}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* External Window Popout for Real URLs */}
          {!isInternalUrl && (
            <button
              type="button"
              onClick={() => window.open(currentUrl, '_blank')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              title="Open in external browser window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* 3. View Mode Switcher & Tools */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold select-none">
          <button
            type="button"
            onClick={() => onChangeViewMode('copilot')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'copilot'
                ? 'bg-white text-sky-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Pathfinder AI Copilot View"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copilot</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('web')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'web'
                ? 'bg-white text-sky-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Interactive Web Browser View"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('split')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'split'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Split Screen View (Web + Copilot)"
          >
            <Layout className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split ◨</span>
          </button>
        </div>

        {/* Studio & Inspector Button */}
        <button
          type="button"
          onClick={onOpenStudio}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          title="Open Agent Studio & Telemetry Inspector"
        >
          <Activity className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden xl:inline">Studio</span>
        </button>

        {/* Audio Output Mute/Unmute */}
        <button
          type="button"
          onClick={onToggleVoice}
          className={`p-1.5 rounded-lg border transition-colors ${
            voiceEnabled
              ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          title={voiceEnabled ? 'Mute Aria voice' : 'Enable Aria voice'}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
    </div>
  );
}