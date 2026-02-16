
import React, { useState, useEffect } from 'react';

const SplashView: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-between p-8 bg-primary dark:bg-background-dark overflow-hidden">
      <div className="flex-1"></div>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24 bg-white/10 rounded-xl">
          <div className="relative">
            <span className="material-symbols-outlined text-white text-[64px] leading-none opacity-90">diversity_2</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight leading-none mb-2">BridgePath</h1>
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Special Education & Therapy</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end w-full max-w-xs pb-12">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Initializing</span>
            <span className="text-white text-xs font-bold">{progress}%</span>
          </div>
          <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-white/50 text-[10px] text-center mt-2 font-normal">Creating a calm space for learning...</p>
        </div>
      </div>
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SplashView;
