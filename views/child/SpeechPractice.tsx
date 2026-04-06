
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluateSpeech } from '../../services/geminiService';

const SpeechPractice: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Add CSS styles on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .mic-shadow {
        box-shadow: 0 10px 25px -5px rgba(74, 143, 227, 0.4);
      }
      .jungle-bg {
        position: relative;
        isolation: isolate;
        background-image: linear-gradient(rgba(240, 249, 241, 0.72), rgba(240, 249, 241, 0.72)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      }
      .wood-panel {
        background-color: #d2b48c;
        background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
        border: 4px solid #8b4513;
      }
      .leaf-decoration {
        pointer-events: none;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      setRecordingTime(0);
      
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        handleEvaluation();
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setFeedback(null);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleEvaluation = async () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setFeedback("Wonderful! You said 'Hello' very clearly. High five! 🖐️");
      setIsEvaluating(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="jungle-bg font-display text-[#111417] antialiased relative flex min-h-screen flex-col items-center overflow-x-hidden">
      {/* Top Navigation */}
      <header className="flex w-full items-center justify-between bg-white/70 px-6 py-4 backdrop-blur-md z-30">
        <button onClick={() => navigate('/child')} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-white/40 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-jungle-dark">Speech Practice</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-white/40 transition-colors">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center px-6 pb-24 relative">
        {/* Floating Jungle Elements */}
        <div className="absolute top-8 left-4 leaf-decoration opacity-80">
          <span className="material-symbols-outlined text-6xl text-jungle-green">eco</span>
        </div>
        <div className="absolute top-20 right-4 leaf-decoration opacity-60 rotate-45">
          <span className="material-symbols-outlined text-5xl text-jungle-green/80">nest_eco_leaf</span>
        </div>
        <div className="absolute bottom-64 left-2 leaf-decoration opacity-40 -rotate-12">
          <span className="material-symbols-outlined text-7xl text-jungle-green/40">potted_plant</span>
        </div>

        {/* Instruction Text (Wood Panel Style) */}
        <div className="mb-10 text-center relative z-10 w-full px-4">
          <div className="wood-panel rounded-2xl py-6 px-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
            <h2 className="text-2xl font-bold text-[#5d4037]">Ready to talk?</h2>
            <p className="mt-2 text-base font-semibold text-[#795548]">Tap the button and say "Hello"</p>
            <div className="absolute -bottom-2 -right-2 text-jungle-accent opacity-80">
            </div>
          </div>
        </div>

        {/* Central Large Microphone Button */}
        <div className="relative flex items-center justify-center mb-12 z-10">
          <div className={`absolute h-52 w-52 rounded-full bg-jungle-green/20 ${isRecording ? 'animate-pulse' : ''}`}></div>
          <div className="absolute h-44 w-44 rounded-full bg-white/90 shadow-inner"></div>
          <button 
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className="mic-shadow relative flex h-32 w-32 items-center justify-center rounded-full bg-jungle-green text-white transition-transform active:scale-95 border-4 border-white"
          >
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </button>
        </div>

        {/* Waveform Area */}
        <div className="mb-10 flex h-16 w-full items-center justify-center gap-2 px-8 z-10">
          <div className="h-4 w-2.5 rounded-full bg-jungle-dark/20"></div>
          <div className="h-8 w-2.5 rounded-full bg-jungle-dark/30"></div>
          <div className="h-12 w-2.5 rounded-full bg-jungle-green/50"></div>
          <div className="h-16 w-2.5 rounded-full bg-jungle-green"></div>
          <div className="h-10 w-2.5 rounded-full bg-jungle-green/70"></div>
          <div className="h-14 w-2.5 rounded-full bg-jungle-green/90"></div>
          <div className="h-6 w-2.5 rounded-full bg-jungle-dark/30"></div>
          <div className="h-10 w-2.5 rounded-full bg-jungle-dark/20"></div>
        </div>

        {/* Progress Indicator */}
        {!feedback && (
          <div className="w-full px-4 mb-10 z-10">
            <div className="h-4 w-full overflow-hidden rounded-full bg-white/70 shadow-inner border border-jungle-green/10">
              <div className="h-full w-2/3 bg-jungle-green rounded-full shadow-sm"></div>
            </div>
            <div className="mt-2 flex justify-between text-sm font-bold text-jungle-dark/70">
              <span>{formatTime(recordingTime)}</span>
              <span>0:20</span>
            </div>
          </div>
        )}

        {/* Feedback or Control Buttons */}
        {feedback ? (
          <div className="flex w-full flex-col gap-4 px-4 z-10 mt-8">
            <div className="bg-white/95 p-6 rounded-2xl shadow-lg text-center border-2 border-jungle-green/30">
              <p className="text-jungle-dark font-bold text-lg">{feedback}</p>
            </div>
            <button 
              onClick={() => setFeedback(null)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 py-4 text-base font-bold text-jungle-dark shadow-md border-2 border-jungle-green/30 transition-all hover:bg-white active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">refresh</span>
              Try Again
            </button>
          </div>
        ) : isEvaluating ? (
          <div className="flex flex-col items-center gap-3 z-10">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-8 bg-jungle-green rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
            <p className="text-jungle-dark font-medium">Listening carefully...</p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 px-4 z-10">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-105 active:scale-[0.98]">
              <span className="material-symbols-outlined">play_arrow</span>
              Play Recording
            </button>
            <button 
              onClick={() => setFeedback(null)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 py-4 text-base font-bold text-jungle-dark shadow-md border-2 border-jungle-green/30 transition-all hover:bg-white active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">refresh</span>
              Try Again
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 flex w-full max-w-md border-t border-jungle-green/20 bg-white/90 px-6 pb-6 pt-3 backdrop-blur-md z-30">
        <button onClick={() => navigate('/child/speech')} className="flex flex-1 flex-col items-center gap-1 text-jungle-green">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Practice</p>
        </button>
        <button onClick={() => navigate('/child/progress')} className="flex flex-1 flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-2xl">bar_chart</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Progress</p>
        </button>
        <button onClick={() => navigate('/child/profile')} className="flex flex-1 flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-2xl">person</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </nav>
    </div>
  );
};

export default SpeechPractice;
