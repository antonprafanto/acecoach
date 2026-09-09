import React from 'react';
import { BookOpen, Activity, Timer, Brain, ClipboardList } from 'lucide-react';

export type ActiveTab = 'curriculum' | 'biomechanics' | 'drills' | 'mental' | 'diagnostics';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'curriculum',
      label: 'Kurikulum',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'biomechanics',
      label: 'Biomekanik',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'drills',
      label: 'Drill Audio',
      icon: <Timer className="w-5 h-5" />
    },
    {
      id: 'mental',
      label: 'Match & Mental',
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 'diagnostics',
      label: 'Log & Diagnosa',
      icon: <ClipboardList className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-tennis-navy/95 backdrop-blur border-t border-slate-800 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-h-[52px] transition-all relative ${
                isActive
                  ? 'text-tennis-yellow font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-tennis-yellow rounded-full court-glow-yellow" />
              )}
              <div className={`p-1 rounded-lg ${isActive ? 'bg-tennis-yellow/10' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
