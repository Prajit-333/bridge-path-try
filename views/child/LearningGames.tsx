
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SortingGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'APPLE'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [jumbled, setJumbled] = useState<{ id: number; char: string; used: boolean }[]>([]);
  const [selected, setSelected] = useState<{ id: number; char: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    startNewWord();
  }, [currentWordIndex]);

  const startNewWord = () => {
    const chars = currentWord.split('');
    // Simple shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setJumbled(chars.map((char, index) => ({ id: index, char, used: false })));
    setSelected([]);
    setIsSuccess(false);
  };

  const handleSelect = (item: { id: number; char: string; used: boolean }) => {
    if (item.used || isSuccess) return;
    setJumbled(prev => prev.map(x => x.id === item.id ? { ...x, used: true } : x));
    setSelected(prev => {
      const newSelected = [...prev, { id: item.id, char: item.char }];
      if (newSelected.length === currentWord.length) {
        if (newSelected.map(x => x.char).join('') === currentWord) {
          setIsSuccess(true);
          setTimeout(() => {
            if (currentWordIndex < words.length - 1) {
              setCurrentWordIndex(prev => prev + 1);
            } else {
              setCurrentWordIndex(0); // loop back or show end screen
            }
          }, 1500);
        } else {
          // Reset if wrong
          setTimeout(() => {
            setJumbled(prev => prev.map(x => ({ ...x, used: false })));
            setSelected([]);
          }, 800);
        }
      }
      return newSelected;
    });
  };

  const handleDeselect = (item: { id: number; char: string }) => {
    if (isSuccess) return;
    setSelected(prev => prev.filter(x => x.id !== item.id));
    setJumbled(prev => prev.map(x => x.id === item.id ? { ...x, used: false } : x));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full mb-8">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Word Sorting</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full text-center">
        <h3 className="text-lg text-slate-500 mb-6">Spell the word correctly!</h3>

        {/* Selected Slots */}
        <div className="flex justify-center gap-3 mb-10 min-h-[4rem]">
          {Array.from({ length: currentWord.length }).map((_, i) => {
            const sel = selected[i];
            return (
              <div
                key={i}
                onClick={() => sel && handleDeselect(sel)}
                className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-3xl font-bold cursor-pointer transition-all ${sel ? 'bg-primary text-white border-primary shadow-md' : 'border-dashed border-slate-300 bg-slate-50'
                  } ${isSuccess ? 'bg-green-500 border-green-500' : ''}`}
              >
                {sel ? sel.char : ''}
              </div>
            );
          })}
        </div>

        {/* Jumbled Letters */}
        <div className="flex justify-center gap-3 flex-wrap">
          {jumbled.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              disabled={item.used}
              className={`w-16 h-16 rounded-xl text-3xl font-bold transition-all ${item.used
                  ? 'bg-slate-100 text-slate-300 scale-90 cursor-default'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              {item.char}
            </button>
          ))}
        </div>

        {isSuccess && (
          <div className="mt-8 text-green-500 font-bold text-xl animate-bounce">
            Great Job!
          </div>
        )}
      </div>
    </div>
  );
};

const MemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const deck = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match
        setTimeout(() => {
          setCards(prev => prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          ));
          setFlippedIndices([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          ));
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWin = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full mb-8">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Memory Match</h2>
        <button onClick={startNewGame} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200" title="Restart">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full max-w-md">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform-gpu preserve-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
              } ${card.isMatched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ perspective: '1000px' }}
          >
            <div className={`w-full h-full absolute inset-0 backface-hidden rounded-xl shadow-sm border-2 border-slate-200 bg-white flex items-center justify-center transition-all duration-300 ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100 hover:border-primary hover:shadow-md'}`}>
              <span className="material-symbols-outlined text-4xl text-slate-300">help</span>
            </div>
            <div className={`w-full h-full absolute inset-0 backface-hidden rounded-xl shadow-md border-2 border-primary bg-primary/10 flex items-center justify-center transition-all duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-5xl">{card.emoji}</span>
            </div>
          </div>
        ))}
      </div>

      {isWin && (
        <div className="mt-8 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-green-500 mb-4">You found all pairs!</h3>
          <button onClick={startNewGame} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const LearningGames: React.FC = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<'menu' | 'sorting' | 'memory'>('menu');

  const levels = [
    {
      id: 'sorting' as const,
      level: 'Level 1',
      title: 'Foundational Sounds',
      desc: 'Focusing on vowel sounds and basic phonemes through interactive audio puzzles.',
      status: 'Passed',
      statusIcon: 'check_circle',
      statusClass: 'bg-green-100 text-green-700',
      icon: 'flutter_dash',
      iconWrap: 'bg-blue-100',
      iconColor: 'text-blue-500',
      accent: 'border-l-leaf-green',
      progressLabel: 'Complete',
      progress: 100,
      progressBar: 'from-leaf-green to-jungle-green',
      footerBg: 'bg-leaf-green/5',
      buttonClass: 'bg-jungle-green text-white hover:bg-jungle-green/90',
      buttonText: 'Review',
      buttonIcon: 'refresh',
      clickable: true,
    },
    {
      id: 'memory' as const,
      level: 'Level 2',
      title: 'Matching Words',
      desc: 'Object-word association using visual cards and pronunciation practice.',
      status: 'Active',
      statusIcon: 'trending_up',
      statusClass: 'bg-blue-50 text-blue-700 border border-blue-100',
      icon: 'cruelty_free',
      iconWrap: 'bg-orange-100',
      iconColor: 'text-orange-500',
      accent: 'border-l-orange-400',
      progressLabel: 'Progress',
      progress: 45,
      progressBar: 'from-orange-400 to-orange-600',
      footerBg: 'bg-orange-50',
      buttonClass: 'bg-earth-brown text-white hover:brightness-105',
      buttonText: 'Continue',
      buttonIcon: 'play_arrow',
      clickable: true,
    },
    {
      id: 'locked' as const,
      level: 'Level 3',
      title: 'Sentence Building',
      desc: 'Constructing simple sentences using subject-verb-object structures.',
      status: '',
      statusIcon: '',
      statusClass: '',
      icon: 'pest_control_rodent',
      iconWrap: 'bg-gray-200',
      iconColor: 'text-gray-500',
      accent: 'border-l-gray-300',
      progressLabel: 'Locked',
      progress: 0,
      progressBar: 'from-gray-300 to-gray-300',
      footerBg: 'bg-black/5',
      buttonClass: '',
      buttonText: '',
      buttonIcon: '',
      clickable: false,
    },
  ];

  if (activeGame === 'sorting') return <SortingGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame('menu')} />;

  return (
    <div
      className="min-h-screen flex flex-col text-[#111417]"
      style={{
        backgroundColor: '#f1f8e9',
        backgroundImage:
          'linear-gradient(rgba(241, 248, 233, 0.85), rgba(241, 248, 233, 0.85)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-leaf-green/20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/child')} className="size-10 rounded-full hover:bg-leaf-green/10 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-jungle-green">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight text-jungle-green">Learning Games</h1>
        </div>
        <div className="bg-yellow-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-yellow-200">
          <span className="material-symbols-outlined text-yellow-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          <span className="text-yellow-700 font-bold text-sm">1,250</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full space-y-6 relative">
        <div className="absolute top-10 left-5 -z-10 opacity-30 animate-bounce">
          <span className="material-symbols-outlined text-4xl text-leaf-green">eco</span>
        </div>
        <div className="absolute top-40 right-10 -z-10 opacity-30">
          <span className="material-symbols-outlined text-5xl text-jungle-green">filter_vintage</span>
        </div>

        {levels.map((level) => (
          <div
            key={level.id}
            onClick={() => level.clickable && setActiveGame(level.id)}
            className={`${level.clickable ? 'cursor-pointer hover:scale-[1.01]' : ''} rounded-2xl shadow-lg overflow-hidden transform transition-transform border-l-4 ${level.accent} ${
              level.clickable ? 'bg-white/90 backdrop-blur-md border border-white/50' : 'bg-white/40 backdrop-blur-[4px] border border-white/30'
            }`}
          >
            <div className={`p-5 ${level.clickable ? '' : 'opacity-60'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`size-12 rounded-full ${level.iconWrap} flex items-center justify-center border-2 border-white shadow-sm overflow-hidden`}>
                    <span className={`material-symbols-outlined ${level.iconColor} text-3xl`}>{level.icon}</span>
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${level.id === 'sorting' ? 'text-leaf-green' : level.id === 'memory' ? 'text-orange-500' : 'text-gray-500'}`}>
                      {level.level}
                    </span>
                    <h2 className={`text-xl font-bold mt-0.5 ${level.clickable ? 'text-jungle-green' : 'text-gray-700'}`}>{level.title}</h2>
                  </div>
                </div>

                {level.status && (
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${level.statusClass}`}>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: level.id === 'sorting' ? "'FILL' 1" : undefined }}>
                      {level.statusIcon}
                    </span>
                    <span className="text-[10px] font-bold uppercase">{level.status}</span>
                  </div>
                )}
              </div>

              <p className={`${level.clickable ? 'text-[#647487]' : 'text-gray-500'} text-sm mb-5 leading-relaxed pl-1`}>
                {level.desc}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className={`text-xs font-bold ${level.id === 'sorting' ? 'text-leaf-green' : level.id === 'memory' ? 'text-orange-500' : 'text-gray-400'}`}>
                    {level.progressLabel}
                  </span>
                  <span className={`text-xs font-black ${level.clickable ? 'text-jungle-green' : 'text-gray-400'}`}>{level.progress}%</span>
                </div>
                <div className={`h-3 w-full rounded-full overflow-hidden border ${level.clickable ? 'bg-gray-200 border-gray-100' : 'bg-gray-200/50 border-gray-100/30'}`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${level.progressBar}`}
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {level.clickable ? (
              <div className={`px-5 py-3 ${level.footerBg} border-t border-white/50 flex justify-end`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGame(level.id);
                  }}
                  className={`${level.buttonClass} px-6 py-2 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2`}
                >
                  {level.buttonText}
                  <span className="material-symbols-outlined text-sm">{level.buttonIcon}</span>
                </button>
              </div>
            ) : (
              <div className="px-5 py-3 bg-black/5 border-t border-white/20 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-gray-500 text-lg">lock</span>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">Complete Level 2 to unlock</span>
              </div>
            )}
          </div>
        ))}

        <div className="h-10"></div>
      </main>
    </div>
  );
};

export default LearningGames;
