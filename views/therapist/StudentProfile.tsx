
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS } from '../../constants';

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = MOCK_STUDENTS.find(s => s.id === id);

  const palette = {
    pageBg: '#eaf2f1',
    title: '#24395a',
    muted: '#8a9ab3',
    accent: '#75d5c8',
    accentSoft: '#e7f4f1',
    white: '#ffffff',
    border: '#e6eef2',
  };

  if (!student) return <div>Student not found</div>;

  return (
    <div
      className="font-display min-h-screen flex flex-col"
      style={{
        backgroundColor: '#eaf2f1',
        backgroundImage:
          'linear-gradient(rgba(234, 242, 241, 0.92), rgba(234, 242, 241, 0.92)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(234, 242, 241, 0.86)', borderColor: palette.border }}>
        <div className="flex items-center justify-between px-4 h-16 max-w-md mx-auto w-full">
          <button onClick={() => navigate('/therapist')} className="size-10 rounded-full flex items-center justify-center" style={{ color: palette.accent, backgroundColor: palette.accentSoft }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight" style={{ color: palette.title }}>Student Profile</h1>
          <button className="size-10 rounded-full flex items-center justify-center" style={{ color: palette.accent, backgroundColor: palette.accentSoft }}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full flex-1">
        <section className="p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img src={student.avatar} alt={student.name} className="size-28 rounded-full border-4 border-white shadow-sm object-cover" />
            <div className="absolute bottom-1 right-1 size-4 rounded-full border-2 border-white" style={{ backgroundColor: palette.accent }}></div>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: palette.title }}>{student.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm font-medium">
            <span>Age {student.age}</span>
            <span className="size-1 rounded-full bg-slate-300"></span>
            <span>{student.diagnosis}</span>
          </div>
          <div className="flex w-full gap-3 mt-6">
            <button className="flex-1 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95" style={{ background: 'linear-gradient(135deg, #7adccf 0%, #63cfc2 100%)' }}>
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Start Session</span>
            </button>
            <button className="flex-1 backdrop-blur-md border font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: palette.border }}>
              <span className="material-symbols-outlined text-[20px]">edit</span>
              <span>Edit</span>
            </button>
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Last Session', val: 'Oct 24' },
              { label: 'Total Hours', val: '12.5h' },
              { label: 'Progress', val: `${student.progress}%`, primary: true },
            ].map((m, i) => (
              <div key={i} className="backdrop-blur-md p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: palette.border }}>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-lg font-bold" style={{ color: m.primary ? palette.accent : palette.title }}>{m.val}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold">Therapy Goals</h3>
            <button className="text-sm font-semibold" style={{ color: palette.accent }}>View All</button>
          </div>
          <div className="space-y-3">
            {student.goals.map((goal) => (
              <div key={goal.id} className="backdrop-blur-md p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: palette.border }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{goal.title}</span>
                  <span className="text-sm font-bold" style={{ color: palette.accent }}>{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%`, background: 'linear-gradient(135deg, #7adccf 0%, #63cfc2 100%)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold">Last Session Note</h3>
            <span className="text-slate-400 text-xs font-medium">Oct 24, 2023</span>
          </div>
          <div className="backdrop-blur-md p-5 rounded-xl border shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: palette.border }}>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Jamie showed significant improvement in eye contact today. We practiced 'S' sound clusters and he was able to self-correct on 3/5 attempts when prompted with visual cues..."
            </p>
            <button className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: palette.accent }}>
              <span>Read Full Note</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </section>
      </main>
      <div className="h-16"></div>
    </div>
  );
};

export default StudentProfile;
