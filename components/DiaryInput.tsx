
import React, { useState, useCallback } from 'react';
import { Send, Stars } from 'lucide-react';

interface DiaryInputProps {
  onSave: (content: string) => void;
}

export const DiaryInput: React.FC<DiaryInputProps> = ({ onSave }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    onSave(text);
    setText('');
  }, [text, onSave]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSave();
    }
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-700 ease-out
        bg-white/60 dark:bg-[#0f0f0f]/60 backdrop-blur-2xl shadow-2xl
        ${isFocused 
          ? 'border-amber-500/50 shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] dark:border-amber-500/30 dark:shadow-[0_0_30px_-10px_rgba(245,158,11,0.15)]' 
          : 'border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10'
        }
      `}
    >
      <style>{`
        @keyframes breathe-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-breathe-glow {
          animation: breathe-glow 4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>

      {/* Subtle inner glow/noise (Static) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.4] to-transparent dark:from-white/[0.02] pointer-events-none"></div>

      {/* Active Pulse Gradient (Dynamic) */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-700
          bg-gradient-to-tr from-amber-400/40 via-transparent to-purple-400/40
          dark:from-amber-500/10 dark:via-transparent dark:to-purple-500/10
          ${isFocused ? 'opacity-100 animate-breathe-glow' : 'opacity-0'}
        `}
      ></div>

      <div className="p-1 relative z-10">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="What is on your mind, King?"
          className="w-full h-36 bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-white/20 p-5 resize-none focus:outline-none text-lg leading-relaxed font-light tracking-wide rounded-lg font-sans"
          spellCheck={false}
        />
      </div>
      
      <div className="relative z-10 flex justify-between items-center px-5 pb-5 pt-2">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-amber-700/50 dark:text-amber-500/40 font-semibold">
          <Stars className={`w-3 h-3 transition-colors duration-500 ${isFocused ? 'text-amber-500 animate-spin-slow' : ''}`} />
          <span className={`transition-colors duration-500 hidden sm:inline ${isFocused ? 'text-amber-600/70 dark:text-amber-400/60' : ''}`}>Eternalize this moment</span>
        </div>
        
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className={`
            group flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-500
            ${text.trim() 
              ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-700 dark:via-yellow-600 dark:to-amber-700 bg-[length:200%_auto] hover:bg-right text-white shadow-lg shadow-amber-900/20 cursor-pointer transform hover:-translate-y-0.5' 
              : 'bg-black/5 dark:bg-white/5 text-black/20 dark:text-white/10 cursor-not-allowed border border-black/5 dark:border-white/5'
            }
          `}
        >
          <span className={text.trim() ? 'text-amber-50' : ''}>Save Entry</span>
          <Send className={`w-3.5 h-3.5 transition-transform duration-300 ${text.trim() ? 'group-hover:translate-x-1 text-amber-100' : ''}`} />
        </button>
      </div>
    </div>
  );
};
