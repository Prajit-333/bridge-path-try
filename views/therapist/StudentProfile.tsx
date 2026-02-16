
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS } from '../../constants';

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = MOCK_STUDENTS.find(s => s.id === id);

  if (!student) return <div>Student not found</div>;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 h-16 max-w-md mx-auto w-full">
          <button onClick={() => navigate('/therapist')} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight">Student Profile</h1>
          <button className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full flex-1">
        <section className="p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img src={student.avatar} alt={student.name} className="size-28 rounded-full border-4 border-white dark:border-slate-800 shadow-sm object-cover" />
            <div className="absolute bottom-1 right-1 bg-green-500 size-4 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm font-medium">
            <span>Age {student.age}</span>
            <span className="size-1 rounded-full bg-slate-300"></span>
            <span>{student.diagnosis}</span>
          </div>
          <div className="flex w-full gap-3 mt-6">
            <button className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Start Session</span>
            </button>
            <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95">
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
              <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-lg font-bold ${m.primary ? 'text-primary' : ''}`}>{m.val}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold">Therapy Goals</h3>
            <button className="text-primary text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {student.goals.map((goal) => (
              <div key={goal.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{goal.title}</span>
                  <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
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
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
              "Jamie showed significant improvement in eye contact today. We practiced 'S' sound clusters and he was able to self-correct on 3/5 attempts when prompted with visual cues..."
            </p>
            <button className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold">
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
