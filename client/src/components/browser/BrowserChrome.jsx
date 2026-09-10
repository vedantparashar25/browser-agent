import React from 'react';
import BrowserTabs from './BrowserTabs';
import BrowserToolbar from './BrowserToolbar';
import BrowserBookmarks from './BrowserBookmarks';
import BrowserWebView from './BrowserWebView';

export default function BrowserChrome({
  tabs = [],
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  currentUrl,
  onNavigate,
  onReload,
  onGoHome,
  canGoBack,
  canGoForward,
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
  onOpenStudio,
  productData,
  onStageOrder,
  isPlacingOrder,
  orderStatus,
  children // The Copilot Workspace content
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100/90 text-slate-900 font-sans antialiased">
      {/* 1. Top Window Tab Bar */}
      <BrowserTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
        onNewTab={onNewTab}
      />

      {/* 2. Navigation Toolbar & Omnibar */}
      <BrowserToolbar
        currentUrl={currentUrl}
        onNavigate={onNavigate}
        onReload={onReload}
        onGoHome={onGoHome}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        viewMode={viewMode}
        onChangeViewMode={onChangeViewMode}
        isLoading={isLoading}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        isListening={isListening}
        onToggleMic={onToggleMic}
        voiceEnabled={voiceEnabled}
        onToggleVoice={onToggleVoice}
        onOpenStudio={onOpenStudio}
      />

      {/* 3. Bookmarks Bar */}
      <BrowserBookmarks
        onNavigate={onNavigate}
        currentUrl={currentUrl}
      />

      {/* 4. Active Viewport Mode */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {viewMode === 'copilot' && (
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        )}

        {viewMode === 'web' && (
          <div className="flex-1 flex overflow-hidden">
            <BrowserWebView
              url={currentUrl}
              productData={productData}
              onStageOrder={onStageOrder}
              onAnalyzeWithAgent={(url) => onNavigate(url)}
              isPlacingOrder={isPlacingOrder}
              orderStatus={orderStatus}
            />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden border-t border-slate-200">
            {/* Left Split Viewport: Live Web View */}
            <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-300 overflow-hidden min-h-[400px]">
              <div className="bg-slate-200/90 px-3 py-1.5 border-b border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>🌐 Interactive Web View</span>
                <span className="text-[10px] font-mono text-slate-500">{currentUrl}</span>
              </div>
              <BrowserWebView
                url={currentUrl}
                productData={productData}
                onStageOrder={onStageOrder}
                onAnalyzeWithAgent={(url) => onNavigate(url)}
                isPlacingOrder={isPlacingOrder}
                orderStatus={orderStatus}
              />
            </div>

            {/* Right Split Viewport: Autonomous AI Copilot */}
            <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto bg-slate-50">
              <div className="bg-sky-50 px-3 py-1.5 border-b border-sky-200 text-xs font-bold text-sky-800 flex items-center justify-between sticky top-0 z-20">
                <span>🤖 Aria AI Copilot & Price Intelligence</span>
                <span className="text-[10px] bg-sky-200/80 text-sky-900 px-2 py-0.5 rounded font-semibold">Live Arbitrage</span>
              </div>
              <div className="p-3 sm:p-4">
                {children}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Browser Bottom Status Bar */}
      <footer className="bg-white border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 font-medium select-none shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-700 font-semibold">PATHFINDER Browser Engine</span>
          <span className="text-slate-300">|</span>
          <span>Status: Online</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="hidden sm:inline">TLS 1.3 &bull; 256-Bit Strong Encryption</span>
        </div>

        <div className="flex items-center space-x-3 text-slate-400">
          <span className="hidden md:inline italic">"Your Destination, Our Path"</span>
          <span>Zoom: 100%</span>
        </div>
      </footer>
    </div>
  );
}
