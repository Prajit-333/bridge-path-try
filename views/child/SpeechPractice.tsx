
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluateSpeech } from '../../services/geminiService';

const SpeechPractice: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        handleEvaluation();
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setFeedback(null);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleEvaluation = async () => {
    setIsEvaluating(true);
    // Simulate Gemini evaluating speech
    setTimeout(() => {
      setFeedback("Wonderful! You said 'Hello' very clearly. High five! 🖐️");
      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col items-center">
      <header className="flex w-full items-center justify-between bg-white/80 dark:bg-slate-900 px-6 py-4 backdrop-blur-md">
        <button onClick={() => navigate('/child')} className="size-10 flex items-center justify-center rounded-full text-slate-500">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Speech Practice</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 w-full max-w-md flex-col items-center justify-center px-6 pb-20">
        <div className="mb-12 text-center mt-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Ready to talk?</h2>
          <p className="mt-2 text-base font-medium text-slate-500">Tap the button and say "Hello"</p>
        </div>

        <div className="relative flex items-center justify-center mb-16">
          {isRecording && <div className="absolute h-44 w-44 rounded-full bg-primary/20 animate-ping"></div>}
          <div className="absolute h-36 w-36 rounded-full bg-primary/10"></div>
          <button 
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform active:scale-90 ${isRecording ? 'scale-110' : ''}`}
          >
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isRecording ? 'stop' : 'mic'}
            </span>
          </button>
        </div>

        {feedback ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-primary/20 text-center animate-in slide-in-from-bottom duration-500">
            <p className="text-slate-800 dark:text-slate-100 font-bold text-lg">{feedback}</p>
            <button 
              onClick={() => setFeedback(null)}
              className="mt-4 text-primary font-bold uppercase text-sm"
            >
              Try Another Word
            </button>
          </div>
        ) : isEvaluating ? (
          <div className="flex flex-col items-center gap-3">
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-8 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
             </div>
             <p className="text-slate-400 font-medium">Listening carefully...</p>
          </div>
        ) : (
          <div className="mb-12 flex h-16 w-full items-center justify-center gap-1.5 px-8">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 rounded-full transition-all duration-300 ${
                  isRecording ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                }`} 
                style={{ 
                  height: isRecording ? `${Math.random() * 40 + 20}px` : '10px' 
                }}
              ></div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 flex w-full max-w-md bg-white/90 dark:bg-slate-900 px-6 pb-6 pt-3 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate('/child')} className="flex flex-1 flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-2xl">home</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Home</p>
        </button>
        <button onClick={() => navigate('/child/progress')} className="flex flex-1 flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Progress</p>
        </button>
      </nav>
    </div>
  );
};

export default SpeechPractice;
