
import React, { useState } from 'react';
import { DiaryEntry } from '../types';
import { Trash2, Clock } from 'lucide-react';

interface DiaryItemProps {
  entry: DiaryEntry;
  index: number;
  onDelete: (id: string) => void;
}

export const DiaryItem: React.FC<DiaryItemProps> = ({ entry, index, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const date = new Date(entry.timestamp);
  const dayNum = date.getDate();
  const monthStr = date.toLocaleDateString('en-US', { month: 'long' });
  const yearStr = date.getFullYear();
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleDeleteClick = () => {
    setIsExiting(true);
    // Wait for animation to finish before actual delete
    setTimeout(() => {
      onDelete(entry.id);
    }, 600); // Match CSS animation duration
  };

  return (
    <div 
      className={`
        group relative 
        ${isExiting ? 'animate-[slideOut_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards] overflow-hidden' : 'animate-[slideUp_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0'}
      `}
      style={{ animationDelay: isExiting ? '0s' : `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left accent line - Subtle indicator on hover */}
      <div className="absolute -left-3 top-6 bottom-6 w-[1px] bg-gradient-to-b from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="
        relative rounded-xl 
        bg-white/30 dark:bg-black/20 
        backdrop-blur-xl 
        border border-white/20 dark:border-white/5 
        p-6 sm:p-7 
        transition-all duration-500 ease-out
        hover:bg-white/50 dark:hover:bg-black/40 
        hover:border-amber-500/20 dark:hover:border-amber-500/10 
        hover:shadow-2xl hover:shadow-amber-900/5 dark:hover:shadow-black/60
        hover:scale-[1.005]
        hover:backdrop-blur-2xl
      ">
        
        {/* Header: Metadata */}
        <div className="flex items-start justify-between mb-5 pb-4 border-b border-black/5 dark:border-white/[0.03]">
          <div className="flex flex-col gap-1">
             <div className="flex items-baseline gap-2 font-serif text-slate-700 dark:text-amber-50">
                <span className="text-2xl italic font-medium">{dayNum}</span>
                <span className="text-xs tracking-widest uppercase opacity-60">{monthStr}</span>
                <span className="text-xs opacity-30 font-sans font-light">{yearStr}</span>
             </div>
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/30 font-medium">
                <Clock className="w-3 h-3" />
                <span>{timeStr}</span>
             </div>
          </div>
          
          <button
            onClick={handleDeleteClick}
            className={`
              p-2.5 rounded-full 
              text-slate-400 dark:text-white/10 
              hover:text-red-500 dark:hover:text-red-400 
              hover:bg-red-500/5 transition-all duration-300
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none sm:pointer-events-auto sm:opacity-100 sm:translate-x-0'}
            `}
            aria-label="Delete entry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-800 dark:text-slate-200/90 whitespace-pre-wrap leading-loose font-light text-base tracking-wide selection:bg-amber-500/30">
            {entry.content}
          </p>
        </div>
      </div>
      
      {/* Styles injection for animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
