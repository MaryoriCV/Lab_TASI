import React from 'react';
import { 
  Home, 
  ArrowLeftRight, 
  Percent, 
  User, 
  Menu, 
  HelpCircle, 
  Bell, 
  ChevronLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { AppScreen } from '../types';

export const Header: React.FC<{ 
  title?: string; 
  onBack?: () => void; 
  showActions?: boolean;
  variant?: 'default' | 'centered' | 'minimal';
}> = ({ title, onBack, showActions = true, variant = 'default' }) => {
  if (variant === 'centered') {
    return (
      <header className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-40">
        <button onClick={onBack} className="p-2 -ml-2 text-neo-orange">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold text-neo-orange">{title}</h1>
        <div className="w-10"></div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {onBack ? (
          <button onClick={onBack} className="p-2 -ml-2 text-neo-orange">
            <ChevronLeft size={28} />
          </button>
        ) : (
          <button className="p-2 -ml-2 text-neo-orange">
            <Menu size={24} />
          </button>
        )}
        {!onBack && <h1 className="text-xl font-bold text-neo-orange">NeoBank</h1>}
      </div>
      
      {showActions && (
        <div className="flex items-center gap-3">
          <button className="p-2 text-neo-orange">
            <HelpCircle size={24} />
          </button>
          <button className="p-2 text-neo-orange relative">
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      )}
    </header>
  );
};

export const BottomNav: React.FC<{ activeScreen: AppScreen; onNavigate: (screen: AppScreen) => void }> = ({ activeScreen, onNavigate }) => {
  const tabs = [
    { id: 'HOME', label: 'Inicio', icon: Home },
    { id: 'OPERACIONES', label: 'Operaciones', icon: ArrowLeftRight },
    { id: 'BENEFICIOS', label: 'Beneficios', icon: Percent },
    { id: 'PARA_TI', label: 'Para ti', icon: User },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2 flex justify-around items-center z-40 pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id || (tab.id === 'HOME' && ['ACCOUNT_DETAIL'].includes(activeScreen));
        
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as AppScreen)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              isActive ? 'text-neo-orange' : 'text-slate-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
