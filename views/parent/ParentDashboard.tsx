
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LineChart, Line } from 'recharts';

type ParentTab = 'dashboard' | 'progress' | 'profile';

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ParentTab>('dashboard');

  const dailyActivityData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 6 },
    { name: 'Wed', value: 3 },
    { name: 'Thu', value: 8 },
    { name: 'Fri', value: 5 },
    { name: 'Sat', value: 2 },
    { name: 'Sun', value: 1 },
  ];

  const speechProgressData = [
    { month: 'Jul', score: 45 },
    { month: 'Aug', score: 52 },
    { month: 'Sep', score: 68 },
    { month: 'Oct', score: 85 },
  ];

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Weekly Summary</span>
            <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold">WEEK 42</span>
          </div>
          <h2 className="text-2xl font-black leading-tight">Liam is doing great!</h2>
          <p className="mt-2 text-white/90 leading-relaxed text-sm font-medium">
            Liam improved his accuracy with 'S' sounds by 15% this week. He's currently ranked in the top 10% for consistency!
          </p>
          <button className="mt-4 bg-white text-primary px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider active:scale-95 transition-transform">
            Review Details
          </button>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-sm uppercase tracking-wider text-slate-400">Daily Practice</h3>
          <span className="text-emerald-500 text-xs font-bold">+20% vs Last Week</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivityData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {dailyActivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? '#4a8fe3' : '#e2e8f0'} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-around">
          <div className="text-center">
            <p className="text-xl font-black text-primary">12</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Assigned</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-800 dark:text-white">10</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-emerald-500">83%</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Rate</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-sm uppercase tracking-wider text-slate-400">Next Session</h3>
          <button className="text-xs font-bold text-primary">Reschedule</button>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="size-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
            <span className="text-xs font-black">OCT</span>
            <span className="text-xl font-black">28</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-800 dark:text-white">Speech Evaluation</p>
            <p className="text-xs text-slate-500">10:30 AM with Dr. Rivera</p>
          </div>
          <button className="size-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined">videocam</span>
          </button>
        </div>
      </section>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h3 className="font-black text-sm uppercase tracking-wider text-slate-400 mb-6 text-center">Learning Curve</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speechProgressData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
              <Line type="monotone" dataKey="score" stroke="#4a8fe3" strokeWidth={4} dot={{ r: 6, fill: '#4a8fe3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-4 uppercase font-bold tracking-widest">Monthly Competency Score</p>
      </section>

      <section>
        <h3 className="font-black text-sm uppercase tracking-wider text-slate-400 mb-4">Therapy Milestones</h3>
        <div className="space-y-3">
          {[
            { title: 'Sentence Formation', status: '85%', color: 'blue' },
            { title: 'Articulation (S, Z sounds)', status: '62%', color: 'emerald' },
            { title: 'Social Cues', status: '40%', color: 'amber' },
            { title: 'Eye Contact', status: 'Completed', color: 'purple' },
          ].map((m, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">{m.title}</span>
                <span className="text-xs font-black text-primary">{m.status}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${m.color}-500 transition-all duration-1000`} 
                  style={{ width: m.status === 'Completed' ? '100%' : m.status }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 uppercase tracking-widest text-xs">
        <span className="material-symbols-outlined">description</span>
        Generate Progress Report
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 text-center">
        <div className="relative inline-block mb-4">
           <img src="https://picsum.photos/seed/parent/200" alt="Parent" className="size-24 rounded-full border-4 border-primary/10 p-1" />
           <button className="absolute bottom-0 right-0 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
             <span className="material-symbols-outlined text-sm">edit</span>
           </button>
        </div>
        <h2 className="text-xl font-black">Sarah Thompson</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Liam's Primary Guardian</p>
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-2">
          {[
            { label: 'Child Profile', icon: 'child_care', desc: 'Edit Liam\'s information' },
            { label: 'Payment Methods', icon: 'payments', desc: 'Manage billing and insurance' },
            { label: 'Privacy & Security', icon: 'security', desc: 'Password and permissions' },
            { label: 'Notification Settings', icon: 'notifications', desc: 'Customize alerts' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-xl group">
              <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </button>
          ))}
        </div>
      </section>

      <button onClick={() => navigate('/login')} className="w-full py-4 text-red-500 font-black text-xs uppercase tracking-[0.2em] bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20 active:scale-95 transition-all">
        Sign Out
      </button>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display transition-colors">
      <div className="max-w-md mx-auto flex flex-col min-h-screen relative bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-black leading-none tracking-tight">BridgePath</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1.5">{activeTab}</p>
          </div>
          <div className="flex gap-2">
             <button className="relative size-11 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500">
               <span className="material-symbols-outlined">notifications</span>
               <div className="absolute top-3 right-3 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></div>
             </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 pb-32">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'progress' && renderProgress()}
          {activeTab === 'profile' && renderProfile()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-8 pb-8 pt-4 z-40">
          <div className="flex justify-between items-center">
            {[
              { id: 'dashboard', icon: 'home', label: 'Home' },
              { id: 'progress', icon: 'insights', label: 'Stats' },
              { id: 'profile', icon: 'person', label: 'You' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ParentTab)}
                className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === tab.id ? 'text-primary scale-110' : 'text-slate-400 opacity-60'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "" }}>
                  {tab.icon}
                </span>
                <p className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</p>
                {activeTab === tab.id && <div className="size-1 bg-primary rounded-full"></div>}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ParentDashboard;
