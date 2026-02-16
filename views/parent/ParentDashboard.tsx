
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 6 },
  { name: 'Wed', value: 3 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 5 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 1 },
];

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-24 font-display">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/login')} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary">
            <span className="material-symbols-outlined">logout</span>
          </button>
          <h1 className="text-lg font-bold">Liam's Progress</h1>
          <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        <section className="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Weekly Summary</span>
            <h2 className="text-2xl font-bold mt-1">Excellent Progress!</h2>
            <p className="mt-3 text-white/90 leading-relaxed text-sm">
              Liam showed great improvement in 'S' sounds this week. He completed 85% of his practice and remains highly engaged.
            </p>
          </div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold mb-4">Tasks Completed</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4a8fe3" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-around">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">12</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Assigned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">10</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-500">83%</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Rate</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {[
              { date: 'Oct 12', type: 'In-person', duration: '45m', status: 'Attended', color: 'emerald' },
              { date: 'Oct 05', type: 'Remote', duration: '30m', status: 'Attended', color: 'emerald' },
              { date: 'Sep 28', type: 'In-person', duration: 'N/A', status: 'Excused', color: 'amber' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className={`h-10 w-10 rounded-full bg-${s.color}-100 dark:bg-${s.color}-900/30 flex items-center justify-center text-${s.color}-600`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {s.status === 'Attended' ? 'check_circle' : 'event_busy'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{s.date} - {s.type}</p>
                  <p className="text-xs text-slate-500">{s.duration} • {s.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95">
          <span className="material-symbols-outlined">download</span>
          Download PDF Report
        </button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-3">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            <span className="text-[10px] font-medium">Progress</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ParentDashboard;
