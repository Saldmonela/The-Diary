
import React, { useState, useEffect, useCallback } from 'react';
import { DiaryEntry } from './types';
import { DiaryInput } from './components/DiaryInput';
import { DiaryList } from './components/DiaryList';
import { Feather, Moon, Sun, Quote } from 'lucide-react';

const STORAGE_KEY = 'glass_diary_entries';
const THEME_KEY = 'glass_diary_theme';

const QUOTES = [
  "The palest ink is better than the best memory.",
  "Keep some room in your heart for the unimaginable.",
  "What is a diary but a truce with time?",
  "Memory is the scribe of the soul.",
  "We write to taste life twice, in the moment and in retrospect.",
  "Preserve your memories, keep them well, what you forget you can never retell.",
  "Every moment is a golden one for him who has the vision to recognize it as such."
];

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load entries from local storage", e);
      return [];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      // Default to dark if no preference
      return savedTheme ? savedTheme === 'dark' : true;
    } catch {
      return true;
    }
  });

  // Random quote state (stable per session)
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const [today] = useState(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save entries to local storage", e);
    }
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSaveEntry = useCallback((content: string) => {
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = !isDarkMode;

    // @ts-ignore - Check for View Transitions API support
    if (!document.startViewTransition) {
      setIsDarkMode(isDark);
      return;
    }

    // Get click coordinates for ripple origin
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate the distance to the furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setIsDarkMode(isDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full transition-colors duration-700`}>
      <div className="min-h-screen w-full bg-[#f4f4f0] dark:bg-[#050505] relative text-slate-800 dark:text-slate-200 selection:bg-amber-500/30 flex flex-col transition-colors duration-700 overflow-x-hidden">
        
        {/* Luxury Background Atmosphere */}
        <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
          {/* Gradients */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0f0f0f]"></div>
          <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-1000 bg-gradient-to-b from-[#f4f4f0] via-[#fafafa] to-[#ecece8]"></div>
          
          {/* Breathing Orbs */}
          <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] rounded-full bg-amber-400/20 dark:bg-amber-900/10 blur-[120px] animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-300/20 dark:bg-purple-900/10 blur-[150px] animate-pulse duration-[10000ms] delay-1000"></div>
          
          {/* Floating Particles / Fireflies */}
          <div className="absolute inset-0 overflow-hidden">
             {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-amber-500/40 dark:bg-amber-200/20 blur-[1px]"
                  style={{
                    width: Math.random() * 3 + 1 + 'px',
                    height: Math.random() * 3 + 1 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animation: `float ${20 + Math.random() * 20}s infinite linear`,
                    animationDelay: `-${Math.random() * 20}s`
                  }}
                />
             ))}
          </div>

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        <style>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translateY(-60px) translateX(20px); opacity: 0; }
          }
        `}</style>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col min-h-screen">
          
          {/* Theme Toggle */}
          <div className="absolute top-6 right-6 z-50">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 text-amber-600 dark:text-amber-200 shadow-lg hover:scale-110 transition-all duration-300 overflow-hidden relative group"
              aria-label="Toggle Theme"
            >
              <div className="relative z-10">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
              <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Header Section */}
          <div className="flex flex-col gap-6 pt-24 md:pt-32 pb-2">
              <header className="flex flex-col items-center justify-center gap-5">
                
                {/* Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-white/40 to-white/20 dark:from-white/10 dark:to-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl shadow-amber-900/10 dark:shadow-amber-900/20">
                      <Feather className="w-6 h-6 text-amber-600 dark:text-amber-200" />
                  </div>
                </div>

                {/* Titles */}
                <div className="text-center space-y-2">
                  <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 dark:from-amber-100 dark:via-amber-200 dark:to-amber-500 drop-shadow-sm">
                      The Legacy
                  </h1>
                  <div className="flex items-center justify-center gap-3 text-amber-800/40 dark:text-amber-500/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                    <span>{today}</span>
                  </div>
                </div>

                {/* Entry Counter Badge */}
                <div className="px-3 py-1 rounded-full bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-sm text-[10px] font-semibold tracking-widest uppercase text-amber-800/50 dark:text-amber-200/50 shadow-sm">
                  {entries.length} {entries.length === 1 ? 'Chronicle' : 'Chronicles'} Recorded
                </div>

                {/* Inspirational Quote */}
                <div className="max-w-md mx-auto text-center mt-2 mb-4 relative group cursor-default">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 opacity-10">
                    <Quote className="w-full h-full text-amber-500" />
                  </div>
                  <p className="font-serif italic text-lg text-slate-600/70 dark:text-slate-300/70 leading-relaxed px-6 relative z-10">
                    "{quote}"
                  </p>
                </div>
              </header>

              <DiaryInput onSave={handleSaveEntry} />
              
              {/* Decorative Divider */}
              <div className="flex items-center justify-center py-4 opacity-60">
                 <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
                 <div className="mx-3 text-amber-600/30 dark:text-amber-400/30 text-[10px] font-serif">♦</div>
                 <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
              </div>
          </div>

          {/* Feed Section */}
          <div className="flex-1 w-full pb-20">
               <DiaryList entries={entries} onDelete={handleDeleteEntry} />
          </div>
          
          {/* Footer */}
          <footer className="py-8 text-center text-black/20 dark:text-white/20 text-[10px] uppercase tracking-widest font-medium">
            <p>Encrypted Locally • Est. 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
