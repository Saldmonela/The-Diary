
import React from 'react';
import { DiaryEntry } from '../types';
import { DiaryItem } from './DiaryItem';
import { BookOpen } from 'lucide-react';

interface DiaryListProps {
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

export const DiaryList: React.FC<DiaryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-0 animate-[fadeIn_1s_ease-out_forwards] transition-all duration-1000">
        <div className="p-5 rounded-full bg-black/5 dark:bg-white/[0.02] border border-amber-500/20 dark:border-amber-500/10 mb-6 shadow-[0_0_50px_-10px_rgba(245,158,11,0.1)]">
          <BookOpen className="w-6 h-6 text-amber-600/50 dark:text-amber-500/30" />
        </div>
        <h3 className="text-slate-400 dark:text-amber-100/30 text-xl font-serif italic mb-2">The Pages are Empty</h3>
        <p className="text-slate-400/70 dark:text-white/10 text-xs tracking-[0.2em] uppercase">Begin your legacy today</p>
        
        <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 py-2">
        {entries.map((entry, index) => (
          <DiaryItem 
              key={entry.id} 
              entry={entry} 
              index={index}
              onDelete={onDelete} 
          />
        ))}
      </div>
      
      {/* End of List Ornament */}
      <div className="flex justify-center items-center gap-2 pt-12 pb-4 opacity-20">
        <div className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400"></div>
        <div className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400"></div>
        <div className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400"></div>
      </div>
    </>
  );
};
