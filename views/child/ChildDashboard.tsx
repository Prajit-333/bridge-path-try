
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChildDashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Communication Board', icon: 'chat_bubble', color: 'blue', path: '/child/aac' },
    { title: 'Speech Practice', icon: 'mic', color: 'green', path: '/child/speech' },
    { title: 'Learning Games', icon: 'extension', color: 'orange', path: '/child/games' },
    { title: 'Stories & Rhymes', icon: 'menu_book', color: 'purple', path: '/child/games' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <header className="p-6 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20 bg-white">
              <img src="https://picsum.photos/seed/alex/100" alt="Alex" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Hello, <span className="text-primary">Alex</span>!</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Ready to play and learn?</p>
            </div>
          </div>
          <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm text-slate-600">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>
      <main className="flex-1 px-6 pb-24">
        <div className="grid grid-cols-2 gap-4 h-full max-w-md mx-auto">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-transform active:scale-95 text-center aspect-square"
            >
              <div className={`size-16 rounded-full bg-${card.color}-50 dark:bg-${card.color}-900/30 flex items-center justify-center mb-4 text-${card.color}-500`}>
                <span className="material-symbols-outlined !text-4xl">{card.icon}</span>
              </div>
              <span className="text-slate-800 dark:text-slate-100 font-bold text-base leading-tight">{card.title}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 p-5 bg-primary/10 rounded-xl border border-primary/20 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Today's Progress</span>
            <span className="text-primary font-bold">3/5</span>
          </div>
          <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-3">
            <div className="bg-primary h-3 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="mt-3 text-xs text-slate-500 font-medium text-center">2 more activities to reach your goal!</p>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => navigate('/child')} className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => navigate('/child/progress')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">monitoring</span>
          <span className="text-[10px] font-bold">PROGRESS</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-bold">LOGOUT</span>
        </button>
      </nav>
    </div>
  );
};

export default ChildDashboard;
