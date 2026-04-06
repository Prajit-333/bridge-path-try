
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AAC_SYMBOLS } from '../../constants';
import { speakSentence } from '../../services/geminiService';
import { SymbolItem } from '../../types';

type BoardTab = 'Main' | 'Actions' | 'Feelings' | 'People' | 'Places';

const PEOPLE_SYMBOLS: SymbolItem[] = [
  { id: 'mom', label: 'Mom', category: 'People', icon: 'female', color: 'text-pink-500', parentId: 'people' },
  { id: 'dad', label: 'Dad', category: 'People', icon: 'male', color: 'text-blue-500', parentId: 'people' },
  { id: 'teacher', label: 'Teacher', category: 'People', icon: 'school', color: 'text-amber-600', parentId: 'people' },
  { id: 'friend', label: 'Friend', category: 'People', icon: 'group', color: 'text-green-600', parentId: 'people' },
  { id: 'sibling', label: 'Sibling', category: 'People', icon: 'family_restroom', color: 'text-purple-500', parentId: 'people' },
  { id: 'doctor', label: 'Doctor', category: 'People', icon: 'medical_services', color: 'text-red-500', parentId: 'people' },
];

const PLACE_SYMBOLS: SymbolItem[] = [
  { id: 'home', label: 'Home', category: 'Places', icon: 'home', color: 'text-brown-500', parentId: 'places' },
  { id: 'school', label: 'School', category: 'Places', icon: 'school', color: 'text-blue-500', parentId: 'places' },
  { id: 'park', label: 'Park', category: 'Places', icon: 'park', color: 'text-green-600', parentId: 'places' },
  { id: 'store', label: 'Store', category: 'Places', icon: 'storefront', color: 'text-orange-500', parentId: 'places' },
  { id: 'playground', label: 'Playground', category: 'Places', icon: 'toys', color: 'text-purple-500', parentId: 'places' },
  { id: 'hospital', label: 'Hospital', category: 'Places', icon: 'local_hospital', color: 'text-red-500', parentId: 'places' },
];

const AACBoard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BoardTab>('Main');
  const [currentParentId, setCurrentParentId] = useState<string>('root');
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [sentence, setSentence] = useState<SymbolItem[]>([]);

  // Add CSS styles on mount
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        -webkit-tap-highlight-color: transparent;
      }
      .glass-panel {
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }
      .wood-panel {
        background-color: #d7bc95 !important;
        background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXvUreW3ZjMcDuMTowd1BZsK9CYJdk7eKJw_teU-LMFB3KANv-kEQD7QPNgzXVWKRMHhBUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW_ZoR2HC_IVV9l2Gzup7UPtPb8oMnVWQexKYTbm01VOLHq00kEWiJNJ1KOE11YdFMawgwCS3bw5hftWse27PI1LMGPX3yzI8nNqEq7vYeZOcJBsDk9DX6jDDU8FrBcV-p4eJN1VFxSIEsOpkLm4eB1dhsoPg) !important;
        border: 4px solid #9e714b !important;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .symbol-card:active {
        transform: scale(0.96);
        background-color: rgba(45, 90, 39, 0.05);
      }
      .content-overlay {
        background: rgba(240, 250, 240, 0.4);
      }
      .tab-pill-active {
        background: #2d5a27 !important;
        color: #ffffff !important;
        border-color: #1f431d !important;
        box-shadow: 0 10px 20px rgba(45, 90, 39, 0.22);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const filteredSymbols = useMemo(() => {
    if (activeTab === 'Actions') return AAC_SYMBOLS.filter(s => s.parentId === 'action');
    if (activeTab === 'Feelings') return AAC_SYMBOLS.filter(s => s.parentId === 'feel');
    if (activeTab === 'People') return PEOPLE_SYMBOLS;
    if (activeTab === 'Places') return PLACE_SYMBOLS;

    if (currentParentId === 'root') return AAC_SYMBOLS.filter(s => s.parentId === 'root');
    return AAC_SYMBOLS.filter(s => s.parentId === currentParentId);
  }, [activeTab, currentParentId]);

  const handleTabClick = (tab: BoardTab) => {
    setActiveTab(tab);
    setNavigationHistory([]);

    if (tab === 'Main') {
      setCurrentParentId('root');
    } else if (tab === 'Actions') {
      setCurrentParentId('action');
    } else if (tab === 'Feelings') {
      setCurrentParentId('feel');
    } else if (tab === 'People') {
      setCurrentParentId('people');
    } else if (tab === 'Places') {
      setCurrentParentId('places');
    }
  };

  const handleSymbolClick = (symbol: SymbolItem) => {
    // If it's a category, navigate deeper in the main board
    if (symbol.isCategory) {
      setActiveTab('Main');
      setNavigationHistory([...navigationHistory, currentParentId]);
      setCurrentParentId(symbol.id);
      
      // Root starters should also be added to the sentence.
      if (symbol.parentId === 'root') {
        setSentence([...sentence, symbol]);
      }
    } else {
      setSentence([...sentence, symbol]);
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1];
      setCurrentParentId(prev);
      setNavigationHistory(navigationHistory.slice(0, -1));
    }
  };

  const goHome = () => {
    setActiveTab('Main');
    setCurrentParentId('root');
    setNavigationHistory([]);
  };

  const clearSentence = () => {
    setSentence([]);
    goHome();
  };

  const speak = async () => {
    const text = sentence.map((s: SymbolItem) => s.label).join(' ');
    await speakSentence(text);
  };

  // Find current category label for the header
  const currentCategoryLabel = useMemo(() => {
    if (activeTab !== 'Main') return activeTab;
    if (currentParentId === 'root') return 'Home';
    return AAC_SYMBOLS.find(s => s.id === currentParentId)?.label || 'Menu';
  }, [activeTab, currentParentId]);

  const tabs: BoardTab[] = ['Main', 'Actions', 'Feelings', 'People', 'Places'];

  return (
    <div 
      className="min-h-screen flex flex-col font-display text-[#111417]"
      style={{
        backgroundImage: `url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Navigation / Sentence Preview Bar */}
      <header className="sticky top-0 z-10 glass-panel border-b-4 border-jungle-leaf/20 shadow-lg px-4 py-3 md:py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/child')}
            aria-label="Back to child dashboard"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-jungle-leaf hover:bg-white transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>

          <div className="flex-1 flex items-center justify-between gap-3 rounded-2xl bg-white/85 backdrop-blur-md px-4 py-3 shadow-sm border border-white/60">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-jungle-leaf/70 font-bold">AAC Board</p>
              <p className="text-sm font-semibold text-slate-600">Build and speak your message</p>
            </div>
            <button
              onClick={goHome}
              className="flex items-center gap-2 rounded-full px-3 py-2 bg-jungle-leaf text-white font-bold text-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Home
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex items-center gap-3">
          {/* Clear Button */}
          <button 
            onClick={clearSentence}
            aria-label="Clear sentence" 
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-3xl">backspace</span>
          </button>
          
          {/* Sentence Area: Wood Themed */}
          <div className="flex-1 h-14 wood-panel rounded-2xl flex items-center px-4 overflow-x-auto gap-2 shadow-inner scrollbar-hide">
            <div className="flex items-center gap-2">
              {sentence.map((s: SymbolItem, idx: number) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-white border border-jungle-wood/40 rounded-xl p-1 min-w-[48px] h-[48px] shadow-sm">
                  <span className={`material-symbols-outlined text-xl ${s.color}`}>{s.icon}</span>
                  <span className="text-[9px] font-bold uppercase text-slate-500">{s.label.toUpperCase().slice(0, 3)}</span>
                </div>
              ))}
              {sentence.length > 0 && <div className="w-1.5 h-8 bg-jungle-wood/60 rounded-full animate-pulse"></div>}
            </div>
            {sentence.length === 0 && (
              <p className="hidden sm:block text-jungle-wood/80 text-sm font-bold ml-2">Building sentence...</p>
            )}
          </div>
          
          {/* Speak Button */}
          <button 
            onClick={speak}
            disabled={sentence.length === 0}
            className="flex h-14 px-6 items-center justify-center gap-2 rounded-2xl bg-jungle-leaf text-white shadow-lg shadow-jungle-leaf/30 hover:bg-jungle-leaf/90 transition-all active:scale-95 border-b-4 border-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-2xl">volume_up</span>
            <span className="text-base font-bold tracking-wide uppercase">Speak</span>
          </button>
        </div>
      </header>

      {/* Main AAC Grid */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 overflow-y-auto content-overlay">
        {/* Category Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm shadow-md border-b-4 transition-all ${
                activeTab === tab
                  ? 'tab-pill-active border-green-900'
                  : 'bg-white/90 text-jungle-leaf border-2 border-jungle-leaf/20 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Main' && currentParentId === 'root' && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="text-sm text-jungle-leaf font-bold">Tap a category chip above to show options.</div>
          </div>
        )}

        {/* Navigation breadcrumb for non-root */}
        {currentParentId !== 'root' && activeTab === 'Main' && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-white/60">
            <button 
              onClick={goBack}
              className="text-jungle-leaf font-bold text-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Back
            </button>
            <span className="text-jungle-leaf font-bold text-sm ml-auto">{currentCategoryLabel}</span>
            <button 
              onClick={goHome}
              className="text-jungle-leaf font-bold text-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              Home
            </button>
          </div>
        )}

        {/* Symbol Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 pb-24">
          {filteredSymbols.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSymbolClick(s)}
              className="symbol-card group relative flex flex-col items-center justify-between bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-transparent shadow-xl hover:border-jungle-leaf transition-all cursor-pointer aspect-square sm:aspect-auto sm:h-52"
            >
              <div className="flex-1 flex items-center justify-center">
                <span className={`material-symbols-outlined text-6xl md:text-7xl group-hover:scale-110 transition-transform ${s.color}`}>
                  {s.icon}
                </span>
              </div>
              
              <div className="w-full text-center">
                <p className="text-jungle-leaf text-lg md:text-xl font-extrabold uppercase tracking-wider">{s.label}</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">{s.isCategory ? 'Category' : 'Symbol'}</p>
              </div>
            </button>
          ))}
          
          {/* Empty state within category */}
          {filteredSymbols.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
               <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
               <p className="font-bold text-lg">Nothing here yet!</p>
               <button onClick={goHome} className="mt-4 text-jungle-leaf font-black uppercase text-sm border-b-2 border-jungle-leaf/20">Return Home</button>
            </div>
          )}
        </div>
      </main>

      {/* Accessibility Button */}
      <div className="fixed bottom-28 right-4 md:right-8 group z-30">
        <button className="flex size-14 items-center justify-center rounded-full bg-white border-4 border-jungle-leaf text-jungle-leaf shadow-2xl hover:scale-110 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-3xl">visibility</span>
        </button>
      </div>
    </div>
  );
};

export default AACBoard;
