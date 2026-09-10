import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import QueryInput from './components/QueryInput';
import CategoryHub from './components/CategoryHub';
import Timeline from './components/Timeline';
import ResultCard from './components/ResultCard';
import AgentStudioModal from './components/AgentStudioModal';
import VoiceAssistantBanner from './components/VoiceAssistantBanner';
import BrowserChrome from './components/browser/BrowserChrome';
import { voiceEngine } from './services/voice/voiceEngine';
import { STORE_CATALOGS, getStoreByUrl } from './services/storeCatalogs';

const WS_URL = 'ws://localhost:5000';

// Default Initial Recommendation so graph and correct image are rendered immediately on browser open
const DEFAULT_INITIAL_RESULT = {
  intent: "wireless earbuds under 2000 rupees",
  category: "shop",
  summary: "Autonomous Playwright browsing discovered the top value choice: boAt Airdopes 141 ANC with 32dB Active Noise Cancellation, 42H playtime, and ₹1,299 deal price.",
  spokenSummary: "Namaste! Maine aapke liye boAt Airdopes 141 ANC find kiya hai, bas ₹1,299 me Amazon par! Isme 32dB active noise cancellation hai. Aur usi category me 10% budget range ka Noise Buds alternative bhi ready hai ₹1,199 me. Bataiye, kya main direct link open kar doon?",
  topPick: {
    title: "boAt Airdopes 141 ANC TWS Earbuds (42H Playtime, 32dB ANC, Fast Charge)",
    price: "₹1,299",
    originalPrice: "₹4,490",
    discount: "71% Off Deal",
    rating: 4.4,
    reviewsCount: "184,210+ verified ratings",
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX522_.jpg",
    reasoning: "Best-selling ANC earbuds under ₹2,000 offering rich punchy bass, ASAP 10-minute fast charging, and 42 hours total battery life.",
    specs: [
      "Active Noise Cancellation (ANC up to 32dB) with Transparency Mode",
      "42 Hours Total Playback Time with Fast ASAP Charging (10m = 100m)",
      "Quad Microphones with AI Environmental Noise Cancellation (ENx)",
      "10mm Titanium Drivers & Beast Low-Latency Gaming Mode",
      "IPX5 Water & Sweat Resistance with 1-Year Brand Replacement Warranty"
    ],
    featuresNarrative: "Equipped with 32dB Active Noise Cancellation, 42 hours playback, and Quad AI-ENx mics for crystal clear calls. Backed by official 1-year replacement warranty.",
    directProductUrl: "https://www.amazon.in/dp/B0F5BDRQN3",
    keyFeaturesHighlights: [
      { label: "Active Noise Canceling", value: "32dB ANC with Transparency Ambient Mode" },
      { label: "Total Playback", value: "42 Hours Playtime with ASAP Quick Charge" },
      { label: "Call Quality", value: "Quad Mics with AI Environmental Noise Cancellation" },
      { label: "Acoustics & Drivers", value: "10mm Titanium Drivers & Beast Low-Latency Mode" },
      { label: "Water Protection", value: "IPX5 Splash & Sweat Resistance" }
    ],
    bestPlatform: {
      name: "Amazon India",
      reason: "Offers the lowest verified live price with Prime 1-day delivery and official manufacturer warranty guarantee."
    },
    buyBeforeDate: {
      date: "September 18, 2026",
      daysRemaining: 8,
      urgencyText: "Order before September 18 to lock in the ₹1,299 promotional price before the festive price adjustments."
    },
    returnPolicies: [
      {
        platform: "Amazon India",
        duration: "7 Days",
        type: "Free Doorstep Replacement",
        policy: "7-day replacement guarantee with free doorstep pickup if damaged or defective.",
        isRecommended: true
      },
      {
        platform: "Flipkart",
        duration: "7 Days",
        type: "Brand Service Replacement",
        policy: "7-day brand service center inspection & replacement warranty.",
        isRecommended: false
      },
      {
        platform: "Croma",
        duration: "14 Days",
        type: "Store Exchange & Support",
        policy: "14-day hassle-free store exchange with direct technical support.",
        isRecommended: false
      }
    ],
    directCheckoutUrl: "https://www.amazon.in/dp/B0F5BDRQN3",
    source: "Amazon India",
    sourceUrl: "https://www.amazon.in/dp/B0F5BDRQN3",
    actionUrl: "https://www.amazon.in/dp/B0F5BDRQN3",
    actionLabel: "View Product on Amazon"
  },
  tenPercentAlternative: {
    title: "Noise Buds VS102 Plus with 70H Playtime, 11mm Drivers & Instacharge (Jet Black)",
    price: "₹1,199",
    numPrice: 1199,
    priceRange: "₹1,169 – ₹1,429",
    priceDiff: "-₹100 (-8% vs Top Pick)",
    category: "Wireless Earbuds / TWS",
    whyAlternative: "Falls directly within the ±10% price bracket (₹1,169 – ₹1,429) in the exact same wireless earbuds category. Delivers an extraordinary 70 hours of total playtime, punchy 11mm sound drivers, and fast 10-minute Instacharge.",
    keyHighlight: "70H Total Playback + 11mm Drivers + Instacharge (10m = 120m)",
    specs: [
      "Up to 70 Hours Total Playtime with Compact Charging Case",
      "11mm Deep Bass Drivers for Rich Immersive Acoustic Sound",
      "Instacharge Fast Technology: 10 Minutes Charge = 120 Minutes Playtime",
      "Environmental Noise Cancellation (ENC) with Quad Microphones for Clear Calling",
      "IPX5 Splash & Sweat Resistance with 1-Year Brand Replacement Warranty"
    ],
    image: "https://m.media-amazon.com/images/I/61wemCOc3vL._SL1500_.jpg",
    source: "Amazon India",
    sourceUrl: "https://www.amazon.in/dp/B0DS2Y94LS",
    directProductUrl: "https://www.amazon.in/dp/B0DS2Y94LS",
    actionUrl: "https://www.amazon.in/dp/B0DS2Y94LS",
    actionLabel: "View Alternative on Amazon"
  },
  upgradeAlternative: {
    title: "OnePlus Buds Pro 2 with Spatial Audio, Dual Dynaudio Drivers & 48dB Smart Adaptive ANC",
    price: "₹8,999",
    numPrice: 8999,
    budgetDiff: "+₹7,000 Upgrade Pick",
    whyWorthIt: "Upgrades to co-created Dynaudio dual melody drivers, 48dB Smart Adaptive Active Noise Cancellation, and Google Spatial Audio with real-time head tracking.",
    keyHighlight: "48dB Smart ANC + Dynaudio Dual Drivers + Spatial Audio",
    specs: [
      "MelodyBoost Dual Drivers (11mm Woofer + 6mm Tweeter) Co-Created with Dynaudio",
      "48dB Ultra-Wide Smart Adaptive Active Noise Cancellation with Transparency Mode",
      "Google Spatial Audio with Real-Time Head Tracking for 3D Cinematic Sound",
      "LHDC 4.0 Hi-Res Audio Wireless Certification with 54ms Ultra-Low Latency",
      "Up to 39 Hours Total Playback with Qi Wireless Charging & Fast Warp Charge"
    ],
    image: "https://m.media-amazon.com/images/I/512ch1TdARL._SL1500_.jpg",
    source: "Amazon India",
    sourceUrl: "https://www.amazon.in/dp/B0BRSLXGCN",
    directProductUrl: "https://www.amazon.in/dp/B0BRSLXGCN",
    actionUrl: "https://www.amazon.in/dp/B0BRSLXGCN",
    actionLabel: "View +₹10k Upgrade on Amazon"
  },
  alternatives: [
    {
      title: "Noise Buds VS102 Plus with 70H Playtime",
      price: "₹1,199",
      priceDiff: "-8% vs Top Pick (Within ±10%)",
      rating: 4.3,
      source: "Amazon India",
      reasoning: "Matches the wireless earbuds category at ₹1,199 (within ±10% range of ₹1,169 – ₹1,429). Features 70 hours playtime and 11mm drivers.",
      actionUrl: "https://www.amazon.in/dp/B0DS2Y94LS"
    },
    {
      title: "Boult Audio Z40 with 60H Playtime & Zen ENC Mic",
      price: "₹1,299",
      priceDiff: "Exact Price Match (0% Diff)",
      rating: 4.2,
      source: "Amazon India",
      reasoning: "Exact same price bracket of ₹1,299 in the wireless earbuds category with Zen ENC and low latency gaming mode.",
      actionUrl: "https://www.amazon.in/dp/B0GXBBD73Q"
    }
  ],
  priceTrends: {
    verdict: "BUY NOW",
    verdictBadge: "Near All-Time Low (Only ₹100 diff)",
    verdictColor: "emerald",
    verdictReason: "Current live price of ₹1,299 is strongly discounted (71% off peak) and close to the historical low of ₹1,199. Excellent time to buy.",
    currentPrice: 1299,
    allTimeLow: 1199,
    allTimeHigh: 4490,
    averagePrice: 1699,
    expectedLowestUpcoming: 1099,
    savingsIfWait: 200,
    history: [
      { date: "90d Ago", price: 2499, event: "Retail Launch" },
      { date: "60d Ago", price: 1899, event: "Mid-Season Promotion" },
      { date: "45d Ago", price: 1199, event: "Flash Sale (All-Time Low)" },
      { date: "30d Ago", price: 1599, event: "Standard Market Price" },
      { date: "14d Ago", price: 1399, event: "Recent Benchmark" },
      { date: "Today", price: 1299, event: "Current Live Price", isCurrent: true }
    ],
    forecast: [
      { date: "Today", price: 1299, isCurrent: true },
      { date: "Next 5 Days", price: 1299, event: "Steady Price Window", projected: true },
      { date: "Upcoming Sale (8-12d)", price: 1099, event: "Festive Super Value Drop", isLowest: true, projected: true },
      { date: "Post-Sale Recovery", price: 1499, event: "Return to Normal", projected: true }
    ],
    upcomingSales: [
      {
        platform: "Amazon India",
        saleName: "Great Indian Festival / Super Value Days",
        timeline: "Expected in 8–12 days",
        discountRange: "15% – 25% Off Electronics",
        targetPrice: "₹1,099",
        bankOffers: "Instant 10% on SBI / HDFC cards",
        likelihood: "High"
      },
      {
        platform: "Flipkart",
        saleName: "Big Billion Days / Big Saving Days",
        timeline: "Upcoming Festive Window",
        discountRange: "Up to 30% Price Drop on Gadgets",
        targetPrice: "₹1,079",
        bankOffers: "Axis & Kotak Card Instant Cashback",
        likelihood: "High"
      },
      {
        platform: "Croma",
        saleName: "Festive Electronics Carnival",
        timeline: "Weekend Special",
        discountRange: "Extended Warranty Included",
        targetPrice: "₹1,299 + Free Perks",
        bankOffers: "Zero Cost EMI Available",
        likelihood: "Medium"
      }
    ]
  },
  safetyCheckpoint: {
    status: "safe_checkpoint_reached",
    message: "Safe Checkpoint: Product specifications and live pricing verified on Amazon India. Payment and login require your personal authorization.",
    actionUrl: "https://www.amazon.in/dp/B0CK19K91B"
  }
};

const WELCOME_SPEECH =
  "Hello! Welcome to PATHFINDER. Your destination, our path. I am Aria. How can I help you today?";

function App() {
  const [query, setQuery] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showLogs, setShowLogs] = useState(false);
  const [showStudio, setShowStudio] = useState(false);

  // Voice Assistant State
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState(
    "Hello! Welcome to PATHFINDER. Your destination, our path. I am Aria. How can I help you today?"
  );

  // Agent State: start with null so the Command Center / Mission Control is displayed on enter
  const [steps, setSteps] = useState([]);
  const [logs, setLogs] = useState([]);
  const [screenshot, setScreenshot] = useState(null);
  const [result, setResult] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);

  // Autonomous Order Placement State
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // Browser Shell & Multi-Tab State
  const [tabs, setTabs] = useState([
    {
      id: 'tab-workspace',
      title: 'Pathfinder Copilot',
      url: 'pathfinder://workspace',
      type: 'copilot',
      history: ['pathfinder://workspace'],
      historyIdx: 0
    },
    {
      id: 'tab-amazon',
      title: 'Amazon.in: boAt Airdopes',
      url: 'https://www.amazon.in/dp/B0F5BDRQN3',
      type: 'web',
      history: ['https://www.amazon.in/dp/B0F5BDRQN3'],
      historyIdx: 0
    },
    {
      id: 'tab-flipkart',
      title: 'Flipkart: Ninja Air Fryer',
      url: 'https://www.flipkart.com',
      type: 'web',
      history: ['https://www.flipkart.com'],
      historyIdx: 0
    },
    {
      id: 'tab-croma',
      title: 'Croma: OnePlus Nord 4 5G',
      url: 'https://www.croma.com',
      type: 'web',
      history: ['https://www.croma.com'],
      historyIdx: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-workspace');
  const [viewMode, setViewMode] = useState('copilot'); // 'copilot' | 'web' | 'split'
  const [bookmarkedUrls, setBookmarkedUrls] = useState(
    new Set(['pathfinder://workspace', 'https://www.amazon.in', 'https://www.flipkart.com', 'https://www.croma.com'])
  );

  // Voices list for voice selection
  const [voices, setVoices] = useState([]);

  const wsRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasGreetedRef = useRef(false);

  // Sync voiceEnabled with voiceEngine
  useEffect(() => {
    voiceEngine.updateConfig({ enabled: voiceEnabled });
    if (!voiceEnabled) {
      voiceEngine.interrupt('user_disabled_voice');
    }
  }, [voiceEnabled]);

  // Voice Speech Synthesis delegation to Aria Voice Engine
  const speakText = (text, onEnd) => {
    if (!voiceEnabled) return;
    voiceEngine.speak(text, onEnd);
  };

  // Auto-greet user as soon as browser opens
  useEffect(() => {
    const triggerGreeting = () => {
      if (hasGreetedRef.current) return;
      hasGreetedRef.current = true;
      setAssistantMessage(WELCOME_SPEECH);
      if (voiceEnabled) {
        voiceEngine.speak(WELCOME_SPEECH);
      }
    };

    // Attempt audio greeting after short 600ms mount delay
    const timer = setTimeout(triggerGreeting, 600);

    // Global click or keydown listener: bypasses browser autoplay blocking on first user touch
    const onUserGesture = () => {
      triggerGreeting();
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
    };

    window.addEventListener('click', onUserGesture, { once: true });
    window.addEventListener('keydown', onUserGesture, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
    };
  }, [voiceEnabled]);

  // Voice Input (SpeechRecognition with Aria Voice Assistant & Barge-in)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        voiceEngine.setState('LISTENING');
        setAssistantMessage("Sun rahi hoon! Boliye, main sun rahi hoon...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        voiceEngine.setState('THINKING');

        // Check for vocal barge-in stop commands ("stop", "ruko", "cancel", "bas", "chup")
        const lower = transcript.toLowerCase().trim();
        if (lower === 'stop' || lower === 'cancel' || lower === 'ruko' || lower === 'chup' || lower === 'bas' || lower.startsWith('stop')) {
          voiceEngine.interrupt('voice_stop_command');
          setAssistantMessage("Theek hai, maine speech rok di hai. Boliye, aage kya karna hai?");
          return;
        }

        const ackSpeech = "Haan ji! Bas ek second, main check karti hoon...";
        setAssistantMessage(`Haan ji! Bas ek second, main "${transcript}" check karti hoon...`);
        if (voiceEnabled) {
          voiceEngine.speak(ackSpeech, () => {
            handleRunQuery(transcript);
          });
        } else {
          handleRunQuery(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        voiceEngine.setState('IDLE');
        setAssistantMessage("Maaf kijiye, main theek se sun nahi paayi. Kya aap ek baar phir bolenge?");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [voiceEnabled]);

  // WebSocket Connection for real-time telemetry, steps, screenshots, and Aria voice stream
  useEffect(() => {
    let ws;
    let reconnectTimer;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'CONNECTED') {
              setIsConnected(true);
            } else if (data.type === 'STEP_START' || data.type === 'STEP') {
              const s = data.step || data;
              setSteps((prev) => [...prev, s]);
            } else if (data.type === 'SCREENSHOT') {
              setScreenshot(data.screenshot);
            } else if (data.type === 'STEP_LOG' || data.type === 'LOG') {
              const l = data.log || data.message || data;
              setLogs((prev) => [...prev, l]);
            } else if (data.type === 'SPEECH_CHUNK') {
              // Real-time progressive speech chunk streaming from agent!
              setAssistantMessage(data.text);
              if (voiceEnabled) {
                voiceEngine.feedStreamChunk(data.text);
              }
            } else if (data.type === 'RESULT') {
              setIsProcessing(false);
              setResult(data.result);
              if (data.result && data.result.spokenSummary) {
                setAssistantMessage(data.result.spokenSummary);
                if (voiceEnabled) {
                  voiceEngine.speak(data.result.spokenSummary);
                }
              }
            } else if (data.type === 'ORDER_STEP') {
              setOrderStatus({ message: data.message });
            } else if (data.type === 'ORDER_READY') {
              setIsPlacingOrder(false);
              setOrderStatus(data);
              const confirmationSpeech = data.clicked
                ? "Ho gaya ji! Checkout section open ho gaya hai. Aap aaram se verify karke confirm kar lijiye."
                : "Ho gaya ji! Safe direct checkout link ready hai, aap aaram se check kar lijiye.";
              setAssistantMessage(confirmationSpeech);
              if (voiceEnabled) {
                voiceEngine.speak(confirmationSpeech);
              }
            }
          } catch (e) {
            console.error('Error handling WebSocket message:', e);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          reconnectTimer = setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = () => {
          setIsConnected(false);
        };
      } catch (err) {
        setIsConnected(false);
        reconnectTimer = setTimeout(connectWebSocket, 3000);
      }
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, [voiceEnabled]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please try Google Chrome or Microsoft Edge.');
      return;
    }
    // Instant Barge-In: If assistant is speaking when user activates mic, silence assistant immediately!
    voiceEngine.interrupt('user_mic_barge_in');

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      voiceEngine.setState('IDLE');
    } else {
      try {
        voiceEngine.setState('LISTENING');
        recognitionRef.current.start();
      } catch (e) {
        recognitionRef.current.stop();
      }
    }
  };

  const handleRunQuery = (customQuery) => {
    const targetQuery = (customQuery || query).trim();
    if (!targetQuery || isProcessing) return;

    setIsProcessing(true);
    voiceEngine.setState('THINKING');
    setResult(null);
    setOrderStatus(null);
    setSteps([]);
    setLogs([]);
    setScreenshot(null);
    setQueryHistory((prev) => [...prev, targetQuery]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'QUERY',
          query: targetQuery,
          history: queryHistory
        })
      );
    } else {
      fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: targetQuery, history: queryHistory })
      })
        .then((res) => res.json())
        .then((data) => {
          setIsProcessing(false);
          if (data.success) {
            setResult(data.result);
            if (data.result && data.result.spokenSummary) {
              setAssistantMessage(data.result.spokenSummary);
              if (voiceEnabled) {
                voiceEngine.speak(data.result.spokenSummary);
              }
            }
          }
        })
        .catch((err) => {
          setIsProcessing(false);
          alert('Server connection error: ' + err.message);
        });
    }
  };

  // Autonomous In-Browser Order Placement Trigger with Aria Voice Confirmation
  const handlePlaceOrder = (productUrl) => {
    if (!productUrl || isPlacingOrder) return;
    setIsPlacingOrder(true);
    const stagingSpeech = "Haan ji! Main product page open karke checkout safely stage kar rahi hoon...";
    setOrderStatus({ message: stagingSpeech });
    setAssistantMessage(stagingSpeech);
    if (voiceEnabled) voiceEngine.speak(stagingSpeech);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'PLACE_ORDER',
          url: productUrl
        })
      );
    } else {
      // Direct jump fallback
      window.open(productUrl, '_blank');
      setIsPlacingOrder(false);
    }
  };

  const handlePreset = (presetText) => {
    setQuery(presetText);
    handleRunQuery(presetText);
  };

  // Browser Navigation Helpers
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const currentUrl = activeTab?.url || 'pathfinder://workspace';
  const canGoBack = (activeTab?.historyIdx || 0) > 0;
  const canGoForward = (activeTab?.historyIdx || 0) < ((activeTab?.history?.length || 1) - 1);

  const handleSelectTab = (tabId) => {
    setActiveTabId(tabId);
    const targetTab = tabs.find((t) => t.id === tabId);
    if (targetTab) {
      if (targetTab.type === 'copilot') setViewMode('copilot');
      else if (targetTab.type === 'web' && viewMode === 'copilot') setViewMode('web');
    }
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === tabId);
    const remaining = tabs.filter((t) => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId) {
      const nextActive = remaining[Math.max(0, idx - 1)];
      setActiveTabId(nextActive.id);
      if (nextActive.type === 'copilot') setViewMode('copilot');
    }
  };

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab = {
      id: newId,
      title: 'New Tab',
      url: 'pathfinder://workspace',
      type: 'copilot',
      history: ['pathfinder://workspace'],
      historyIdx: 0
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setViewMode('copilot');
  };

  const handleOmnibarNavigate = (inputVal) => {
    const val = inputVal.trim();
    if (!val) return;

    const isExplicitUrl =
      val.startsWith('http://') ||
      val.startsWith('https://') ||
      val.startsWith('pathfinder://') ||
      /^[a-zA-Z0-9-]+\.(com|in|org|net|co|io|dev|app)(\/.*)?$/i.test(val);

    if (isExplicitUrl) {
      let finalUrl = val;
      if (!val.startsWith('http://') && !val.startsWith('https://') && !val.startsWith('pathfinder://')) {
        finalUrl = `https://${val}`;
      }

      setTabs((prev) =>
        prev.map((t) => {
          if (t.id === activeTabId) {
            const newHistory = [...t.history.slice(0, t.historyIdx + 1), finalUrl];
            return {
              ...t,
              url: finalUrl,
              title: finalUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] || finalUrl,
              type: finalUrl.startsWith('pathfinder://') ? 'copilot' : 'web',
              history: newHistory,
              historyIdx: newHistory.length - 1
            };
          }
          return t;
        })
      );

      if (finalUrl.startsWith('pathfinder://')) {
        setViewMode('copilot');
      } else {
        if (viewMode === 'copilot') setViewMode('web');
      }
    } else {
      setQuery(val);
      handleRunQuery(val);
      setViewMode('copilot');
      setTabs((prev) =>
        prev.map((t) => {
          if (t.id === activeTabId) {
            return {
              ...t,
              title: `Search: ${val.slice(0, 18)}`,
              url: `pathfinder://search?q=${encodeURIComponent(val)}`
            };
          }
          return t;
        })
      );
    }
  };

  const handleGoBack = () => {
    if (!canGoBack) return;
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          const nextIdx = t.historyIdx - 1;
          const prevUrl = t.history[nextIdx];
          return {
            ...t,
            historyIdx: nextIdx,
            url: prevUrl,
            type: prevUrl.startsWith('pathfinder://') ? 'copilot' : 'web'
          };
        }
        return t;
      })
    );
  };

  const handleGoForward = () => {
    if (!canGoForward) return;
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          const nextIdx = t.historyIdx + 1;
          const nextUrl = t.history[nextIdx];
          return {
            ...t,
            historyIdx: nextIdx,
            url: nextUrl,
            type: nextUrl.startsWith('pathfinder://') ? 'copilot' : 'web'
          };
        }
        return t;
      })
    );
  };

  const handleReload = () => {
    if (activeTab?.url?.startsWith('pathfinder://')) {
      if (query) handleRunQuery(query);
    }
  };

  const handleGoHome = () => {
    handleOmnibarNavigate('pathfinder://workspace');
  };

  const isBookmarked = bookmarkedUrls.has(currentUrl);
  const handleToggleBookmark = () => {
    setBookmarkedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(currentUrl)) next.delete(currentUrl);
      else next.add(currentUrl);
      return next;
    });
  };

  // Derive tab-isolated product data matching the active tab's domain
  const activeStoreKey = getStoreByUrl(currentUrl);
  const activeStoreConfig = STORE_CATALOGS[activeStoreKey];
  const activeProductData = (activeStoreKey === 'amazon' && result)
    ? result
    : (activeStoreConfig?.defaultProduct
        ? { topPick: activeStoreConfig.defaultProduct }
        : (result || DEFAULT_INITIAL_RESULT));

  return (
    <BrowserChrome
      tabs={tabs}
      activeTabId={activeTabId}
      onSelectTab={handleSelectTab}
      onCloseTab={handleCloseTab}
      onNewTab={handleNewTab}
      currentUrl={currentUrl}
      onNavigate={handleOmnibarNavigate}
      onReload={handleReload}
      onGoHome={handleGoHome}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
      onGoBack={handleGoBack}
      onGoForward={handleGoForward}
      viewMode={viewMode}
      onChangeViewMode={setViewMode}
      isLoading={isProcessing}
      isBookmarked={isBookmarked}
      onToggleBookmark={handleToggleBookmark}
      isListening={isListening}
      onToggleMic={toggleMic}
      voiceEnabled={voiceEnabled}
      onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
      onOpenStudio={() => setShowStudio(true)}
      productData={activeProductData}
      onStageOrder={handlePlaceOrder}
      isPlacingOrder={isPlacingOrder}
      orderStatus={orderStatus}
    >
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Aria Voice Assistant Dynamic State & Waveform Banner */}
        {assistantMessage && (
          <VoiceAssistantBanner
            assistantMessage={assistantMessage}
            onDismiss={() => setAssistantMessage(null)}
            voiceEnabled={voiceEnabled}
            setVoiceEnabled={setVoiceEnabled}
            onStartListening={toggleMic}
          />
        )}

        <QueryInput
          query={query}
          setQuery={setQuery}
          isListening={isListening}
          toggleMic={toggleMic}
          isProcessing={isProcessing}
          onSubmit={handleRunQuery}
          onPreset={handlePreset}
        />

        {/* 3 Categories + Additional E-Commerce Hub */}
        <CategoryHub onSelectQuery={handlePreset} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
          {/* Transparency / Timeline Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <Timeline
              steps={steps}
              isProcessing={isProcessing}
              screenshot={screenshot}
              logs={logs}
              showLogs={showLogs}
              setShowLogs={setShowLogs}
              onPreset={handlePreset}
            />
          </div>

          {/* Result Card Panel with Price Graph & Accurate Product Image */}
          <div className="lg:col-span-7 flex flex-col">
            <ResultCard
              result={result}
              isProcessing={isProcessing}
              onSpeak={speakText}
              onPlaceOrder={handlePlaceOrder}
              isPlacingOrder={isPlacingOrder}
              orderStatus={orderStatus}
              onPreset={handlePreset}
              onReset={() => setResult(null)}
            />
          </div>
        </div>
      </div>

      {/* Agent Studio & Telemetry Inspector Modal */}
      <AgentStudioModal
        isOpen={showStudio}
        onClose={() => setShowStudio(false)}
        onPreset={(q) => {
          setShowStudio(false);
          handlePreset(q);
        }}
      />
    </BrowserChrome>
  );
}

export default App;
