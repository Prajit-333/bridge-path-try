
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from 'recharts';

const ChildProgress: React.FC = () => {
  const navigate = useNavigate();

  const activityData = [
    { day: 'M', val: 3 },
    { day: 'T', val: 5 },
    { day: 'W', val: 2 },
    { day: 'T', val: 6 },
    { day: 'F', val: 4 },
    { day: 'S', val: 1 },
    { day: 'S', val: 0 },
  ];

  const badges = [
    { id: 1, name: 'Speech Star', icon: 'stars', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 2, name: 'Game Hero', icon: 'sports_esports', color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 3, name: 'First Word', icon: 'record_voice_over', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 4, name: 'Daily Streak', icon: 'local_fire_department', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col font-display"
      style={{
        backgroundColor: '#f1f8e9',
        backgroundImage:
          'linear-gradient(rgba(241, 248, 233, 0.82), rgba(241, 248, 233, 0.82)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <header className="p-6 pt-8 flex items-center justify-between bg-white/85 backdrop-blur-md border-b border-white/60 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/child')} className="size-10 rounded-full hover:bg-slate-100/70 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold">My Progress</h1>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/50">
           <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
           <span className="text-primary font-bold">1,250</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full space-y-6 pb-24">
        {/* Weekly Chart */}
        <section className="bg-white/88 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white/60">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">This Week</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Days</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} 
                />
                <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.val > 0 ? '#4a8fe3' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 font-medium">You've practiced 5 days this week! Keep it up! 🚀</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-green-50/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 text-center shadow-sm">
            <p className="text-2xl font-black text-green-600 dark:text-green-400">24</p>
            <p className="text-[10px] font-bold text-green-700/60 dark:text-green-300 uppercase">Activities</p>
          </div>
          <div className="bg-blue-50/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">3</p>
            <p className="text-[10px] font-bold text-blue-700/60 dark:text-blue-300 uppercase">Day Streak</p>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h3 className="font-bold mb-4 px-1 text-slate-800">My Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div key={badge.id} className={`${badge.bg} p-4 rounded-xl border border-white/60 flex flex-col items-center text-center shadow-sm backdrop-blur-md`}>
                <div className={`size-12 rounded-full bg-white/95 flex items-center justify-center mb-2 shadow-sm ${badge.color}`}>
                  <span className="material-symbols-outlined !text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-700">{badge.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Log */}
        <section>
          <h3 className="font-bold mb-4 px-1 text-slate-800">Recent Activity</h3>
          <div className="space-y-2">
            {[
              { type: 'Speech', name: 'Hello Practice', time: 'Today', icon: 'mic', color: 'green' },
              { type: 'AAC', name: 'Sent 5 Messages', time: 'Yesterday', icon: 'chat', color: 'blue' },
              { type: 'Game', name: 'Foundational Sounds', time: '2 days ago', icon: 'extension', color: 'orange' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white/88 backdrop-blur-md rounded-xl shadow-sm border border-white/60">
                <div className={`size-10 rounded-full flex items-center justify-center bg-${item.color}-50 text-${item.color}-500`}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase">{item.type} • {item.time}</p>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/60 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => navigate('/child')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => navigate('/child/progress')} className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
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

export default ChildProgress;
