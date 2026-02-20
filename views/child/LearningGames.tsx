
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

  const games = [
    { id: 'sorting', title: 'Word Sorting', desc: 'Arrange the jumbled letters to form words.', icon: 'sort_by_alpha', color: 'bg-blue-500' },
    { id: 'memory', title: 'Memory Match', desc: 'Find the matching pairs of cards.', icon: 'style', color: 'bg-green-500' },
  ];

  if (activeGame === 'sorting') return <SortingGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame('menu')} />;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/child')} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Learning Games</h1>
        </div>
        <div className="bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          <span className="text-primary font-bold text-sm">1,250</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setActiveGame(game.id as any)}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
          >
            <div className="p-5 flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl ${game.color} text-white flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{game.icon}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{game.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{game.desc}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">play_arrow</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default LearningGames;
