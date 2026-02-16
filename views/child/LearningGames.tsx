
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningGames: React.FC = () => {
  const navigate = useNavigate();

  const levels = [
    { id: 1, title: 'Foundational Sounds', desc: 'Vowel sounds and basic phonemes.', progress: 100, difficulty: 'Low', status: 'Complete' },
    { id: 2, title: 'Matching Words', desc: 'Object-word association practice.', progress: 45, difficulty: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Sentence Building', desc: 'Simple subject-verb-object structures.', progress: 0, difficulty: 'High', status: 'Locked' },
  ];

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
        {levels.map((level) => (
          <div key={level.id} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden ${level.status === 'Locked' ? 'opacity-60 grayscale' : ''}`}>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-semibold uppercase text-primary/70">Level {level.id}</span>
                  <h2 className="text-xl font-bold mt-0.5">{level.title}</h2>
                </div>
                <div className="flex gap-0.5 text-primary">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
                  <span className="text-xs font-medium self-center ml-1 text-slate-500">{level.difficulty}</span>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{level.desc}</p>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className={`text-xs font-medium ${level.status === 'Complete' ? 'text-green-500' : 'text-slate-500'}`}>{level.status}</span>
                  <span className="text-xs font-bold">{level.progress}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${level.status === 'Complete' ? 'bg-green-500' : 'bg-primary'}`} 
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              {level.status === 'Locked' ? (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Locked</span>
                </div>
              ) : (
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 flex items-center gap-2">
                  {level.status === 'Complete' ? 'Review' : 'Continue'} 
                  <span className="material-symbols-outlined text-sm">{level.status === 'Complete' ? 'refresh' : 'play_arrow'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default LearningGames;
