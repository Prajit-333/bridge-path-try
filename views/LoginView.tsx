
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('Child');
  const navigate = useNavigate();

  const theme = {
    Child: {
      surface: 'bg-white/90',
  pageBg: '#fdfcfb',
  pageOverlay: `
    radial-gradient(circle at 10% 20%, rgba(255, 200, 150, 0.12) 0%, transparent 25%), 
    radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.5) 0%, transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(252, 250, 242, 0.8) 100%)
  `,
  titleAccent: 'linear-gradient(135deg, #6dd5fa, #2980b9)',
      brand: 'linear-gradient(135deg, #7cb8ff 0%, #4a8fe3 100%)',
      chipActive: 'bg-white text-primary shadow-md',
      chipInactive: 'text-slate-400',
      fieldIcon: 'text-slate-400',
      fieldFocus: 'focus:border-primary focus:ring-primary',
      loginBtn: 'linear-gradient(135deg, #7cb8ff 0%, #4a8fe3 100%)',
      footerAccent: 'text-primary',
    },
    Parent: {
   surface: 'bg-white/90',
  pageBg: '#f7f1ff',
  pageOverlay: `
    radial-gradient(circle at 10% 20%, rgba(212, 124, 255, 0.15) 0%, transparent 25%), 
    radial-gradient(circle at 90% 20%, rgba(155, 92, 246, 0.15) 0%, transparent 25%), 
    linear-gradient(180deg, #ffffff 0%, #f9f7ff 100%)
  `,
  titleAccent: '#9b5cf6',
      brand: 'linear-gradient(135deg, #d47cff 0%, #9b5cf6 100%)',
      chipActive: 'bg-white text-fuchsia-500 shadow-md',
      chipInactive: 'text-slate-400',
      fieldIcon: 'text-fuchsia-400',
      fieldFocus: 'focus:border-fuchsia-400 focus:ring-fuchsia-400',
      loginBtn: 'linear-gradient(135deg, #d47cff 0%, #9b5cf6 100%)',
      footerAccent: 'text-fuchsia-600',
    },
    Therapist: {
     surface: 'bg-white/90',
  pageBg: '#eff8f8', // Matches your previous rgba base color
  pageOverlay: `
    radial-gradient(circle at 5% 10%, rgba(102, 214, 204, 0.12) 0%, transparent 20%), 
    radial-gradient(circle at 95% 15%, rgba(102, 214, 204, 0.08) 0%, transparent 25%), 
    linear-gradient(180deg, #ffffff 0%, #f4faf9 100%)
  `,
  titleAccent: '#66d6cc',
      brand: 'linear-gradient(135deg, #7be3d8 0%, #66d6cc 100%)',
      chipActive: 'bg-white text-teal-500 shadow-md',
      chipInactive: 'text-slate-400',
      fieldIcon: 'text-teal-400',
      fieldFocus: 'focus:border-teal-400 focus:ring-teal-400',
      loginBtn: 'linear-gradient(135deg, #7be3d8 0%, #66d6cc 100%)',
      footerAccent: 'text-teal-500',
    },
    Admin: {
      surface: 'bg-[#0a4a3c]/90',
      pageBg: '#0f5a49',
      pageOverlay:
        'radial-gradient(circle at 10% 8%, rgba(28, 209, 164, 0.18) 0%, transparent 20%), radial-gradient(circle at 90% 10%, rgba(8, 92, 73, 0.42) 0%, transparent 30%), linear-gradient(180deg, #0f5a49 0%, #0a4a3c 100%)',
      titleAccent: '#21d0a6',
      brand: 'linear-gradient(135deg, #21d0a6 0%, #14b88f 100%)',
      chipActive: 'bg-[#19c89f] text-white shadow-md',
      chipInactive: 'text-[#7aa99c]',
      fieldIcon: 'text-[#21d0a6]',
      fieldFocus: 'focus:border-[#21d0a6] focus:ring-[#21d0a6]',
      loginBtn: 'linear-gradient(135deg, #21d0a6 0%, #18bb93 100%)',
      footerAccent: 'text-[#21d0a6]',
    },
  }[role];

  const roleTitle = role === 'Admin' ? 'Admin Console' : 'BridgePath';
  const cardTitle = role === 'Admin' ? 'Welcome Back' : 'Welcome Back';
  const cardSubtitle = role === 'Admin'
    ? 'Please select your role and sign in to continue'
    : 'Please select your role and sign in to continue';
  const loginLabel = role === 'Admin' ? 'Sign In to Console' : 'Login';

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
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4 font-display antialiased transition-colors"
      style={{
        backgroundColor: theme.pageBg,
        backgroundImage: theme.pageOverlay,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: theme.brand }}>
          <span className="material-symbols-outlined text-3xl">record_voice_over</span>
        </div>
        <h1 className={`text-2xl font-bold tracking-tight ${role === 'Admin' ? 'text-white' : 'text-slate-900'}`}>{roleTitle}</h1>
      </div>
      <div className={`w-full max-w-[440px] rounded-[2rem] ${theme.surface} backdrop-blur-md p-8 shadow-2xl ${role === 'Admin' ? 'border border-[#1b6b59]' : 'border border-white/60'}`}>
        <div className="mb-8 text-center">
          <h2 className={`text-2xl font-black ${role === 'Admin' ? 'text-white' : 'text-slate-900'}`}>{cardTitle}</h2>
          <p className={`mt-2 text-sm ${role === 'Admin' ? 'text-[#9fc5bc]' : 'text-slate-500'}`}>{cardSubtitle}</p>
        </div>
        <div className="mb-8">
          <div className={`flex h-14 w-full items-center justify-center rounded-full p-1 shadow-inner ${role === 'Admin' ? 'bg-[#105a49] border border-[#1b6b59]' : 'bg-slate-100/70 border border-slate-200/60'}`}>
            {(['Child', 'Parent', 'Therapist', 'Admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex h-full flex-1 items-center justify-center rounded-full px-2 text-[11px] font-bold transition-all uppercase tracking-tighter ${
                  role === r ? theme.chipActive : theme.chipInactive
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className={`text-sm font-semibold uppercase tracking-wide ${role === 'Admin' ? 'text-[#9fc5bc]' : 'text-slate-700'}`}>Email Address</label>
            <div className="relative">
              <span className={`material-symbols-outlined absolute left-3 top-3 text-lg ${theme.fieldIcon}`}>mail</span>
              <input 
                className={`block w-full rounded-full border py-4 pl-10 pr-3 shadow-sm ${theme.fieldFocus} ${role === 'Admin' ? 'border-[#1b6b59] bg-[#105a49] text-[#d7ece7] placeholder-[#6f9e93]' : 'border-slate-200 bg-white text-slate-900'}`}
                placeholder={role === 'Admin' ? 'admin@system.com' : 'admin@bridgepath.com'}
                type="email" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={`text-sm font-semibold uppercase tracking-wide ${role === 'Admin' ? 'text-[#9fc5bc]' : 'text-slate-700'}`}>Password</label>
              <a className={`text-xs font-bold hover:opacity-80 transition-colors ${theme.footerAccent}`} href="#">Forgot password?</a>
            </div>
            <div className="relative">
              <span className={`material-symbols-outlined absolute left-3 top-3 text-lg ${theme.fieldIcon}`}>lock</span>
              <input 
                className={`block w-full rounded-full border py-4 pl-10 pr-3 shadow-sm ${theme.fieldFocus} ${role === 'Admin' ? 'border-[#1b6b59] bg-[#105a49] text-[#d7ece7] placeholder-[#6f9e93]' : 'border-slate-200 bg-white text-slate-900'}`}
                placeholder="••••••••" 
                type="password" 
                required 
              />
            </div>
          </div>
          <button className="flex w-full items-center justify-center rounded-full py-4 text-base font-bold text-white shadow-xl transition-all active:scale-[0.98]" style={{ background: theme.loginBtn }} type="submit">
            {loginLabel}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
          <span>•</span>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
