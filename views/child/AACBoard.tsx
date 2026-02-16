
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AAC_SYMBOLS } from '../../constants';
import { speakSentence } from '../../services/geminiService';
import { SymbolItem } from '../../types';

const AACBoard: React.FC = () => {
  const navigate = useNavigate();
  const [currentParentId, setCurrentParentId] = useState<string>('root');
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [sentence, setSentence] = useState<SymbolItem[]>([]);

  const filteredSymbols = useMemo(() => {
    return AAC_SYMBOLS.filter(s => s.parentId === currentParentId);
  }, [currentParentId]);

  const handleSymbolClick = (symbol: SymbolItem) => {
    // If it's a category, we navigate deeper
    if (symbol.isCategory) {
      setNavigationHistory([...navigationHistory, currentParentId]);
      setCurrentParentId(symbol.id);
      
      // If the label is part of the sentence structure (like "I want", "I feel")
      // we usually want to add it to the sentence too.
      if (symbol.parentId === 'root') {
        setSentence([...sentence, symbol]);
      }
    } else {
      // It's a final item, add to sentence
      setSentence([...sentence, symbol]);
      // After picking a final item, often users want to go back to root or want categories
      // But for flexibility, we stay here or provide a "Home" button.
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
    setCurrentParentId('root');
    setNavigationHistory([]);
  };

  const clearSentence = () => {
    setSentence([]);
    goHome();
  };

  const speak = async () => {
    const text = sentence.map(s => s.label).join(' ');
    await speakSentence(text);
  };

  // Find current category label for the header
  const currentCategoryLabel = useMemo(() => {
    if (currentParentId === 'root') return 'Home';
    return AAC_SYMBOLS.find(s => s.id === currentParentId)?.label || 'Menu';
  }, [currentParentId]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-primary/10 shadow-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          {/* Sentence Builder Display */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/child')} 
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 transition-colors"
              title="Exit Board"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            
            <div className="flex-1 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center px-4 overflow-x-auto gap-3 no-scrollbar shadow-inner">
              {sentence.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-white dark:bg-slate-700 border border-primary/20 rounded-lg p-1 min-w-[56px] h-[56px] shadow-sm animate-in zoom-in duration-200">
                  <span className={`material-symbols-outlined ${s.color} text-2xl`}>{s.icon}</span>
                  <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-200 truncate w-full text-center">{s.label}</span>
                </div>
              ))}
              {sentence.length === 0 && (
                <p className="text-slate-400 text-sm font-medium animate-pulse italic">Start building your message...</p>
              )}
            </div>

            <button 
              onClick={clearSentence} 
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-900/20 hover:bg-red-100 transition-colors"
              title="Clear Message"
            >
              <span className="material-symbols-outlined text-3xl">delete</span>
            </button>
            
            <button 
              onClick={speak}
              disabled={sentence.length === 0}
              className="flex h-14 px-8 items-center justify-center gap-2 rounded-xl bg-primary text-white shadow-lg disabled:opacity-40 disabled:grayscale transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
              <span className="text-lg font-black uppercase tracking-wider">Talk</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {currentParentId !== 'root' && (
              <button 
                onClick={goBack} 
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-sm shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                Back
              </button>
            )}
            <div className="flex-1 flex items-center justify-center">
               <span className="text-xs font-black uppercase tracking-widest text-primary/60 dark:text-primary/40">
                  Category: {currentCategoryLabel}
               </span>
            </div>
            {currentParentId !== 'root' && (
              <button 
                onClick={goHome} 
                className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-lg text-primary font-bold text-sm shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">home</span>
                Home
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24">
          {filteredSymbols.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSymbolClick(s)}
              className={`group relative flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all active:scale-95 h-48 md:h-56 shadow-sm ${
                s.isCategory 
                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-secondary'
              }`}
            >
              {/* Folder indicator for categories */}
              {s.isCategory && (
                <div className="absolute top-2 right-2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg">folder_open</span>
                </div>
              )}

              <div className="flex-1 flex items-center justify-center w-full">
                <span className={`material-symbols-outlined ${s.color} text-7xl md:text-8xl group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </span>
              </div>
              
              <div className="w-full text-center mt-2">
                <p className="text-slate-800 dark:text-slate-100 text-lg md:text-xl font-black uppercase tracking-wider leading-none">
                  {s.label}
                </p>
                <div className="h-1.5 w-8 bg-slate-100 dark:bg-slate-700 rounded-full mx-auto mt-2 group-hover:bg-primary/30 transition-colors"></div>
              </div>
            </button>
          ))}
          
          {/* Empty state within category */}
          {filteredSymbols.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
               <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
               <p className="font-bold text-lg">Nothing here yet!</p>
               <button onClick={goHome} className="mt-4 text-primary font-black uppercase text-sm border-b-2 border-primary/20">Return Home</button>
            </div>
          )}
        </div>
      </main>
      
      {/* Visual Indicator of breadcrumbs at bottom for better context */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Path:</span>
            <span className="text-[10px] font-bold text-primary uppercase">Root</span>
            {navigationHistory.map((histId, i) => (
              <React.Fragment key={histId}>
                <span className="material-symbols-outlined text-[10px] text-slate-300">chevron_right</span>
                <span className="text-[10px] font-bold text-primary uppercase">
                  {AAC_SYMBOLS.find(s => s.id === histId)?.label || histId}
                </span>
              </React.Fragment>
            ))}
            {currentParentId !== 'root' && (
              <>
                <span className="material-symbols-outlined text-[10px] text-slate-300">chevron_right</span>
                <span className="text-[10px] font-bold text-primary uppercase">{currentCategoryLabel}</span>
              </>
            )}
         </div>
      </footer>
    </div>
  );
};

export default AACBoard;
