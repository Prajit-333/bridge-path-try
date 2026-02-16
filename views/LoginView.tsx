
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('Child');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
    const paths: Record<UserRole, string> = {
      'Child': '/child',
      'Parent': '/parent',
      'Therapist': '/therapist',
      'Admin': '/admin'
    };
    navigate(paths[role]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark font-display antialiased">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
          <span className="material-symbols-outlined text-3xl">record_voice_over</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">BridgePath</h1>
      </div>
      <div className="w-full max-w-[440px] rounded-xl bg-white p-8 shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">Select your role to continue</p>
        </div>
        <div className="mb-8">
          <div className="flex h-11 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
            {(['Child', 'Parent', 'Therapist', 'Admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex h-full flex-1 items-center justify-center rounded-md px-2 text-[11px] font-bold transition-all uppercase tracking-tighter ${
                  role === r ? 'bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-gray-200">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-lg text-slate-400">mail</span>
              <input 
                className="block w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white" 
                placeholder="admin@bridgepath.com" 
                type="email" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-gray-200">Password</label>
              <a className="text-xs font-medium text-slate-500 hover:text-primary transition-colors" href="#">Forgot?</a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-lg text-slate-400">lock</span>
              <input 
                className="block w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white" 
                placeholder="••••••••" 
                type="password" 
                required 
              />
            </div>
          </div>
          <button className="flex w-full items-center justify-center rounded-lg bg-primary py-3.5 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
