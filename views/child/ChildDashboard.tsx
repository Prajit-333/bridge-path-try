
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChildDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Add floating animation styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-sun {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      @keyframes float-monkey {
        0%, 100% { transform: translateY(0px) scaleX(1); }
        50% { transform: translateY(-15px) scaleX(-1); }
      }
      @keyframes float-bear {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-18px); }
      }
      .animal-accent-sun {
        animation: float-sun 3s ease-in-out infinite;
      }
      .animal-accent-monkey {
        animation: float-monkey 4s ease-in-out infinite;
      }
      .animal-accent-bear {
        animation: float-bear 3.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add jungle theme colors to Tailwind
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --jungle-leaf: #2d5a27;
        --jungle-green: #2D5A27;
        --jungle-wood: #9e714b;
        --jungle-sun: #fdf8e1;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const cards = [
    { title: 'Communication Board', icon: 'chat_bubble', path: '/child/aac' },
    { title: 'Speech Practice', icon: 'mic', path: '/child/speech' },
    { title: 'Learning Games', icon: 'extension', path: '/child/games' },
    { title: 'Stories & Rhymes', icon: 'menu_book', path: '/child/stories' },
  ];

  return (
    <div 
      className="font-display min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        backgroundColor: '#A8D5BA',
        backgroundImage: `linear-gradient(rgba(168, 213, 186, 0.7), rgba(168, 213, 186, 0.7)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Leaf Decor Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full opacity-15 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuA9KJWGBs2GCF1c1n8lZWEzOaGFFGH-8mvwe9zO0e_7cdZHXqY2yf1-Cxrk-noZzG6Vhy4CkEgOGGWSiD4nVp0pfZquJO4cbM7gT7oZA4ucZr2a17_NWsJzTtvnHDX9_AgZ-N0_zFt-q_5Ym3LlRVt1UHTqs34f_-2Qt1PbWWqgKDBDorh525uecKaGZD21FGSoCeR_rOQz8k81Z8yXfLrYoMaLsK5wP_jJKq0JZkX6coNltcjuQF196PggfFC32p0aD3gS_ELRXMSrVkhvac)`,
        }}
      ></div>

      {/* Animal Accents */}
      <div className="fixed top-10 -right-6 opacity-80 z-0 pointer-events-none animal-accent-sun">
        <svg height="100" viewBox="0 0 100 100" width="100">
          <circle cx="50" cy="50" fill="#fdbd59" r="40"></circle>
          <circle cx="35" cy="40" fill="#333" r="4"></circle>
          <circle cx="65" cy="40" fill="#333" r="4"></circle>
          <path d="M40 65 Q50 75 60 65" fill="none" stroke="#333" strokeWidth="3"></path>
          <path d="M10 50 Q10 10 50 10 Q90 10 90 50" fill="none" stroke="#fdbd59" strokeLinecap="round" strokeWidth="8"></path>
        </svg>
      </div>

      <div className="fixed bottom-32 -left-4 opacity-80 z-0 pointer-events-none animal-accent-bear">
        <svg height="80" viewBox="0 0 100 100" width="80">
          <circle cx="50" cy="55" fill="#a17a5d" r="35"></circle>
          <circle cx="20" cy="45" fill="#a17a5d" r="12"></circle>
          <circle cx="80" cy="45" fill="#a17a5d" r="12"></circle>
          <circle cx="50" cy="55" fill="#e2b99a" r="25"></circle>
          <circle cx="40" cy="50" fill="#333" r="3"></circle>
          <circle cx="60" cy="50" fill="#333" r="3"></circle>
        </svg>
      </div>

      {/* Top Header */}
      <header className="p-6 pt-8 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
              <img 
                alt="Child Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKhVyzcujvM4LH72ml-MLzEj7_LinmuJRDT4xHkAY-3jWi9dVJ_4a4G_LQ0NfqYuZmWijVaegZ-5OIUXfnytnglu9pRybOv1RqnC9KWRZxC-W-ZwnMh3hvYZotPVfSAfklyeBxCeAhjFBk1f_ayYgGd8YYO23ZBZBpSq4qBLyyZ-qc339hoTVSNyb95UNhnZXUZP46Ncux_vrsyQMi0RxiTs1qhp5C7oD1HV_9cVwvhs_O_ysiT1Q76iGEUheGW3P0lAJVfW_iQW4" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 drop-shadow-sm">Hello, <span className="text-jungle-green">Alex</span>!</h1>
              <p className="text-slate-800 text-sm font-semibold">Ready to play and learn?</p>
            </div>
          </div>
          <button className="size-11 flex items-center justify-center rounded-2xl shadow-sm text-slate-700" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(4px)', border: '2px solid rgba(255, 255, 255, 0.5)' }}>
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 px-6 pb-24 z-10">
        <div className="grid grid-cols-2 gap-5 h-full max-w-md mx-auto">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              className="flex flex-col items-center justify-center p-6 rounded-2xl transition-transform active:scale-95 text-center aspect-square group"
              style={{
                background: 'linear-gradient(135deg, #A67C52 0%, #8B5E3C 100%)',
                border: '3px solid #5D3A1A',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.2), 0 4px 6px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div 
                style={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuARwnddDPaXlGZVqv5Zpzucu1tIZ_vOuUhL92LhmeBZvGze8Uk5And2anOZQSRfV9Jj8_tyPG0Dc6d_lq4i-977q3ZWRhKmL0tSGoomh1OJtms1CEjhG92l0ZOk1JHGl-3Vn31yqW_XFXKRnO90LMjhg68SRhj-sBq6_ZvDP0-djqDACDd0IXyZO6IFSn7V4JsmYWRPJPP5pnNSV2ReQpl1Bzdz9VCfdl_ivEHtCfo_UTiMP0_uORWmW27rS_kuucWBwkLxYAKXNOA)`,
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              ></div>
              <div className="size-16 rounded-full bg-white/20 flex items-center justify-center mb-4 text-white shadow-inner group-active:scale-90 transition-transform z-10">
                <span className="material-symbols-outlined !text-4xl">{card.icon}</span>
              </div>
              <span className="text-white font-bold text-base leading-tight z-10">{card.title}</span>
            </button>
          ))}
        </div>

        {/* Daily Goal Tracker */}
        <div className="mt-8 p-5 rounded-2xl max-w-md mx-auto z-10" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(4px)', border: '2px solid rgba(45, 90, 39, 0.2)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-jungle-green font-extrabold text-xs uppercase tracking-widest">Today's Progress</span>
            <span className="text-jungle-green font-bold text-lg">3/5</span>
          </div>
          <div className="w-full bg-white/40 rounded-full h-5 overflow-hidden border border-white/50 shadow-inner">
            <div 
              className="h-full rounded-full transition-all duration-1000 shadow-sm" 
              style={{
                width: '60%',
                background: 'linear-gradient(to right, #2D5A27, #A8D5BA)'
              }}
            ></div>
          </div>
          <p className="mt-3 text-xs text-slate-700 font-bold text-center">2 more activities to reach your goal!</p>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(16px)', borderTopWidth: '4px', borderTopColor: 'rgba(45, 90, 39, 0.2)' }}>
        <button onClick={() => navigate('/child')} className="flex flex-col items-center gap-1 group" style={{ color: '#2D5A27' }}>
          <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(45, 90, 39, 0.2)', color: '#2D5A27' }}>
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="text-[10px] font-bold uppercase">HOME</span>
        </button>
        <button onClick={() => navigate('/child/progress')} className="flex flex-col items-center gap-1 group text-slate-500">
          <div className="size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">monitoring</span>
          </div>
          <span className="text-[10px] font-bold uppercase">PROGRESS</span>
        </button>
        <button onClick={() => navigate('/child/profile')} className="flex flex-col items-center gap-1 group text-slate-500">
          <div className="size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </div>
          <span className="text-[10px] font-bold uppercase">PROFILE</span>
        </button>
      </nav>
    </div>
  );
};

export default ChildDashboard;
