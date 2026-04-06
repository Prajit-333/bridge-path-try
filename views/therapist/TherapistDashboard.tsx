
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS } from '../../constants';

type TherapistTab = 'dashboard' | 'students' | 'schedule' | 'settings';

const TherapistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TherapistTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const palette = {
    pageBg: '#eaf2f1',
    title: '#24395a',
    muted: '#8a9ab3',
    accent: '#75d5c8',
    accentSoft: '#e7f4f1',
    white: '#ffffff',
    border: '#e6eef2',
    warning: '#f3b323',
    subtleDot: '#d6deea',
  };

  const therapistBackground = {
    backgroundColor: '#eaf2f1',
    backgroundImage:
      'linear-gradient(rgba(234, 242, 241, 0.92), rgba(234, 242, 241, 0.92)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  };

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderDashboard = () => (
    <>
      <section className="flex gap-4 mb-8">
        <div className="flex-1 p-5 rounded-[2rem] shadow-sm" style={{ backgroundColor: palette.accent }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-white text-xl">group</span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Total Students</p>
          </div>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
        <div className="flex-1 p-5 rounded-[2rem] shadow-sm border" style={{ backgroundColor: palette.white, borderColor: palette.border }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-xl" style={{ color: palette.accent }}>pending_actions</span>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#556b8a' }}>Pending Sessions</p>
          </div>
          <p className="text-3xl font-bold" style={{ color: palette.title }}>4</p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: palette.title }}>Recent Activity</h2>
          <button className="text-xs font-semibold" style={{ color: palette.accent }}>View All</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-[1.75rem] border" style={{ backgroundColor: palette.white, borderColor: palette.border }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.warning }}></div>
            <div className="flex-1">
              <p className="text-sm" style={{ color: palette.title }}><span className="font-semibold">Jamie L.</span> completed a game</p>
              <p className="text-[10px] uppercase font-bold" style={{ color: '#5d7392' }}>10m ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-[1.75rem] border" style={{ backgroundColor: palette.white, borderColor: palette.border }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.subtleDot }}></div>
            <div className="flex-1">
              <p className="text-sm" style={{ color: palette.title }}>Session note due for <span className="font-semibold">Liam M.</span></p>
              <p className="text-[10px] uppercase font-bold" style={{ color: '#5d7392' }}>1h ago</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: palette.title }}>Priority Follow-up</h2>
          <span className="material-symbols-outlined" style={{ color: palette.muted }}>priority_high</span>
        </div>
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#fff9e8', borderColor: '#ffedbc' }}>
          <p className="text-sm" style={{ color: '#97731f' }}>
            Jamie hasn't logged in for 3 days. Consider checking in with the parent.
          </p>
        </div>
      </section>
    </>
  );

  const renderStudents = () => (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: palette.title }}>My Students</h2>
        <button className="flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform" style={{ backgroundColor: palette.accent }}>
          <span className="material-symbols-outlined text-sm">add</span>
          ADD STUDENT
        </button>
      </div>
      <div className="space-y-3">
        {filteredStudents.length > 0 ? filteredStudents.map((student) => (
          <button
            key={student.id}
            onClick={() => navigate(`/therapist/student/${student.id}`)}
            className="w-full flex items-center gap-4 p-4 rounded-[2rem] shadow-sm border transition-all text-left group"
            style={{ backgroundColor: palette.white, borderColor: palette.border }}
          >
            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            <div className="flex-1">
              <h3 className="font-bold text-base" style={{ color: palette.title }}>{student.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#556b8a' }}>{student.age} yrs</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ color: palette.accent, backgroundColor: palette.accentSoft }}>{student.diagnosis}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold" style={{ color: palette.accent }}>{student.progress}%</p>
              <p className="text-[8px] text-gray-400 uppercase">Progress</p>
            </div>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ color: '#c0ccdb' }}>chevron_right</span>
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
          <h2 className="text-lg font-bold" style={{ color: palette.title }}>Upcoming Sessions</h2>
          <p className="text-xs text-slate-500">Thursday, Oct 26</p>
        </div>
        <button className="p-2 rounded-lg" style={{ backgroundColor: '#f3f7f8', color: '#6a7f9e' }}>
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
            <div className="flex-1 p-4 rounded-xl bg-white shadow-sm flex items-center justify-between border-l-4" style={{ borderLeftColor: session.color === 'green' ? '#75d5c8' : '#8ca8d8' }}>
              <div>
                <h4 className="font-bold text-sm">{session.name}</h4>
                <p className="text-[10px] text-slate-500 uppercase font-medium">{session.type} Therapy</p>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400 text-xl">video_call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-4 border-2 border-dashed rounded-xl font-bold text-sm flex items-center justify-center gap-2" style={{ backgroundColor: '#f5f9fa', borderColor: '#d7e4ea', color: '#8a9ab3' }}>
        <span className="material-symbols-outlined">add</span>
        SCHEDULE NEW SESSION
      </button>
    </section>
  );

  const renderSettings = () => (
    <section className="pb-8 space-y-6">
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: palette.border }}>
        <div className="p-4 border-b flex items-center gap-4" style={{ borderColor: '#f0f4f8' }}>
          <div className="size-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: palette.accent }}>
            <span className="material-symbols-outlined text-2xl">person</span>
          </div>
          <div>
            <h4 className="font-bold">Dr. Emily Rivera</h4>
            <p className="text-xs text-slate-500">Speech-Language Pathologist</p>
          </div>
        </div>
        <div className="p-2">
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">badge</span>
              <span className="text-sm font-medium">Edit Profile</span>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
          <button className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">notifications</span>
              <span className="text-sm font-medium">Notification Settings</span>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-2" style={{ borderColor: palette.border }}>
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">dark_mode</span>
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <div className="w-10 h-5 rounded-full relative cursor-pointer transition-colors" style={{ backgroundColor: '#dce5ee' }}>
             <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm translate-x-0 transition-transform"></div>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">psychology</span>
            <span className="text-sm font-medium">AI Voice Feedback</span>
          </div>
          <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ backgroundColor: palette.accent }}>
             <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/login')} className="w-full py-4 font-bold text-sm bg-white border rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all" style={{ color: '#5f6f88', borderColor: palette.border }}>
        <span className="material-symbols-outlined">logout</span>
        LOG OUT
      </button>
    </section>
  );

  return (
    <div className="text-slate-900 min-h-screen font-display transition-colors" style={therapistBackground}>
      <div className="max-w-md mx-auto flex flex-col min-h-screen relative overflow-hidden">
        <header className="pt-8 px-5 pb-4 sticky top-0 z-10" style={{ backgroundColor: 'rgba(234, 242, 241, 0.86)', backdropFilter: 'blur(8px)' }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight capitalize" style={{ color: palette.title }}>{activeTab === 'dashboard' ? 'Therapist Dashboard' : activeTab}</h1>
            <div className="flex gap-2">
               <button className="w-12 h-12 rounded-full flex items-center justify-center relative shadow-sm" style={{ backgroundColor: palette.accentSoft, color: palette.accent }}>
                <span className="material-symbols-outlined">notifications</span>
                <div className="absolute top-3 right-3 size-2 rounded-full border-2 border-white" style={{ backgroundColor: palette.accent }}></div>
              </button>
            </div>
          </div>
          
          {(activeTab === 'dashboard' || activeTab === 'students') && (
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-xl" style={{ color: palette.accent }}>search</span>
              <input 
                className="block w-full pl-10 pr-4 py-3 border-none rounded-full shadow-sm focus:ring-2 text-sm placeholder-gray-400"
                style={{ backgroundColor: palette.white }}
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

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto backdrop-blur-md border-t px-6 py-3 flex justify-between items-center z-20" style={{ backgroundColor: 'rgba(248, 251, 252, 0.95)', borderColor: palette.border }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex flex-col items-center gap-1 transition-colors"
            style={{ color: activeTab === 'dashboard' ? palette.accent : palette.muted }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "" }}>grid_view</span>
            <span className="text-[10px] font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className="flex flex-col items-center gap-1 transition-colors"
            style={{ color: activeTab === 'students' ? palette.accent : palette.muted }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'students' ? "'FILL' 1" : "" }}>group</span>
            <span className="text-[10px] font-medium">Students</span>
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className="flex flex-col items-center gap-1 transition-colors"
            style={{ color: activeTab === 'schedule' ? palette.accent : palette.muted }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'schedule' ? "'FILL' 1" : "" }}>calendar_today</span>
            <span className="text-[10px] font-medium">Schedule</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className="flex flex-col items-center gap-1 transition-colors"
            style={{ color: activeTab === 'settings' ? palette.accent : palette.muted }}
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
