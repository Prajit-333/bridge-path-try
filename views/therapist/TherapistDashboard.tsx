
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS } from '../../constants';

type TherapistTab = 'dashboard' | 'students' | 'schedule' | 'settings';

const TherapistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TherapistTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderDashboard = () => (
    <>
      <section className="flex gap-4 mb-8">
        <div className="flex-1 bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-xl">group</span>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Students</p>
          </div>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="flex-1 bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-orange-400 text-xl">pending_actions</span>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Pending Tasks</p>
          </div>
          <p className="text-3xl font-bold">4</p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          <button className="text-xs font-semibold text-primary">View All</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100/50 dark:border-blue-900/50">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="flex-1">
              <p className="text-sm"><span className="font-semibold">Jamie L.</span> completed a game</p>
              <p className="text-[10px] text-gray-500 uppercase font-medium">10m ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <div className="flex-1">
              <p className="text-sm">Session note due for <span className="font-semibold">Liam M.</span></p>
              <p className="text-[10px] text-gray-500 uppercase font-medium">1h ago</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Priority Follow-up</h2>
          <span className="material-symbols-outlined text-gray-400">priority_high</span>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Jamie hasn't logged in for 3 days. Consider checking in with the parent.
          </p>
        </div>
      </section>
    </>
  );

  const renderStudents = () => (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Student Directory</h2>
        <button className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-sm">add</span>
          ADD STUDENT
        </button>
      </div>
      <div className="space-y-3">
        {filteredStudents.length > 0 ? filteredStudents.map((student) => (
          <button
            key={student.id}
            onClick={() => navigate(`/therapist/student/${student.id}`)}
            className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-all text-left group"
          >
            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            <div className="flex-1">
              <h3 className="font-bold text-base">{student.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{student.age} yrs</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{student.diagnosis}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-500">{student.progress}%</p>
              <p className="text-[8px] text-gray-400 uppercase">Progress</p>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        )) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-slate-300 text-6xl mb-2">person_search</span>
            <p className="text-slate-400 font-medium">No students found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderSchedule = () => (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Upcoming Sessions</h2>
          <p className="text-xs text-slate-500">Thursday, Oct 26</p>
        </div>
        <button className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </div>
      <div className="space-y-4">
        {[
          { time: '09:00 AM', name: 'Jamie L.', type: 'Remote', color: 'blue' },
          { time: '10:30 AM', name: 'Liam M.', type: 'In-person', color: 'green' },
          { time: '01:00 PM', name: 'Sarah K.', type: 'Remote', color: 'blue' },
          { time: '02:30 PM', name: 'Noah W.', type: 'Remote', color: 'blue' },
        ].map((session, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-16 pt-1">
              <p className="text-[10px] font-bold text-slate-400">{session.time}</p>
            </div>
            <div className={`flex-1 p-4 rounded-xl border-l-4 border-${session.color}-500 bg-white dark:bg-slate-800 shadow-sm flex items-center justify-between`}>
              <div>
                <h4 className="font-bold text-sm">{session.name}</h4>
                <p className="text-[10px] text-slate-500 uppercase font-medium">{session.type} Therapy</p>
              </div>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400 text-xl">video_call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold text-sm flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">add</span>
        SCHEDULE NEW SESSION
      </button>
    </section>
  );

  const renderSettings = () => (
    <section className="pb-8 space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4">
          <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">person</span>
          </div>
          <div>
            <h4 className="font-bold">Dr. Emily Rivera</h4>
            <p className="text-xs text-slate-500">Speech-Language Pathologist</p>
          </div>
        </div>
        <div className="p-2">
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">badge</span>
              <span className="text-sm font-medium">Edit Profile</span>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">notifications</span>
              <span className="text-sm font-medium">Notification Settings</span>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-2">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">dark_mode</span>
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <div className="w-10 h-5 bg-slate-200 dark:bg-primary rounded-full relative cursor-pointer transition-colors">
             <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm translate-x-0 dark:-translate-x-5 transition-transform"></div>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">psychology</span>
            <span className="text-sm font-medium">AI Voice Feedback</span>
          </div>
          <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
             <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/login')} className="w-full py-4 text-red-500 font-bold text-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
        <span className="material-symbols-outlined">logout</span>
        LOG OUT
      </button>
    </section>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display transition-colors">
      <div className="max-w-md mx-auto flex flex-col min-h-screen relative">
        <header className="pt-8 px-5 pb-4 sticky top-0 bg-background-light dark:bg-background-dark z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight capitalize">{activeTab === 'dashboard' ? 'Therapist Dashboard' : activeTab}</h1>
            <div className="flex gap-2">
               <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                <span className="material-symbols-outlined">notifications</span>
                <div className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></div>
              </button>
            </div>
          </div>
          
          {(activeTab === 'dashboard' || activeTab === 'students') && (
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 text-xl">search</span>
              <input 
                className="block w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 text-sm placeholder-gray-400" 
                placeholder="Search students..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </header>

        <main className="px-5 pb-24 flex-1">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'schedule' && renderSchedule()}
          {activeTab === 'settings' && renderSettings()}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-20">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "" }}>grid_view</span>
            <span className="text-[10px] font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'students' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'students' ? "'FILL' 1" : "" }}>group</span>
            <span className="text-[10px] font-medium">Students</span>
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'schedule' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'schedule' ? "'FILL' 1" : "" }}>calendar_today</span>
            <span className="text-[10px] font-medium">Schedule</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'settings' ? "'FILL' 1" : "" }}>settings</span>
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TherapistDashboard;
